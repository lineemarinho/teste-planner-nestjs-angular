import {
  HttpContext,
  HttpErrorResponse,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { firstValueFrom, of, throwError } from 'rxjs';
import { SKIP_ERROR_TOAST } from '../constants';
import { AuthService } from './auth.service';
import { ErrorInterceptor } from './error-interceptor.service';

describe('ErrorInterceptor', () => {
  function createInterceptor() {
    const snackBar = { open: vi.fn() } as unknown as MatSnackBar;
    const authService = { logout: vi.fn() } as unknown as AuthService;
    const router = { navigate: vi.fn() } as unknown as Router;

    const interceptor = new ErrorInterceptor(snackBar, authService, router);

    return { interceptor, snackBar, authService, router };
  }

  function handlerThatErrors(error: HttpErrorResponse): HttpHandler {
    return { handle: () => throwError(() => error) } as HttpHandler;
  }

  it('shows a snackbar with the backend message for an unhandled error', async () => {
    const { interceptor, snackBar } = createInterceptor();
    const req = new HttpRequest('GET', '/recipes');
    const error = new HttpErrorResponse({
      status: 404,
      error: { message: 'Recipe with id 1 not found' },
    });

    await expect(
      firstValueFrom(interceptor.intercept(req, handlerThatErrors(error))),
    ).rejects.toBe(error);

    expect(snackBar.open).toHaveBeenCalledWith(
      'Recipe with id 1 not found',
      'Fechar',
      expect.objectContaining({ duration: 5000 }),
    );
  });

  it('joins array validation messages into a single string', async () => {
    const { interceptor, snackBar } = createInterceptor();
    const req = new HttpRequest('POST', '/recipes', {});
    const error = new HttpErrorResponse({
      status: 400,
      error: { message: ['title should not be empty', 'ingredients required'] },
    });

    await expect(
      firstValueFrom(interceptor.intercept(req, handlerThatErrors(error))),
    ).rejects.toBe(error);

    expect(snackBar.open).toHaveBeenCalledWith(
      'title should not be empty ingredients required',
      'Fechar',
      expect.anything(),
    );
  });

  it('does not show a snackbar when the request opts out', async () => {
    const { interceptor, snackBar } = createInterceptor();
    const req = new HttpRequest('POST', '/auth/login', {}, {
      context: new HttpContext().set(SKIP_ERROR_TOAST, true),
    });
    const error = new HttpErrorResponse({ status: 401 });

    await expect(
      firstValueFrom(interceptor.intercept(req, handlerThatErrors(error))),
    ).rejects.toBe(error);

    expect(snackBar.open).not.toHaveBeenCalled();
  });

  it('logs out and redirects to /login on a 401', async () => {
    const { interceptor, authService, router } = createInterceptor();
    const req = new HttpRequest('GET', '/admin/recipes');
    const error = new HttpErrorResponse({ status: 401 });

    await expect(
      firstValueFrom(interceptor.intercept(req, handlerThatErrors(error))),
    ).rejects.toBe(error);

    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('passes through successful responses untouched', async () => {
    const { interceptor, snackBar } = createInterceptor();
    const req = new HttpRequest('GET', '/recipes');
    const handler = {
      handle: () => of('ok'),
    } as unknown as HttpHandler;

    await expect(
      firstValueFrom(interceptor.intercept(req, handler)),
    ).resolves.toBe('ok');
    expect(snackBar.open).not.toHaveBeenCalled();
  });
});
