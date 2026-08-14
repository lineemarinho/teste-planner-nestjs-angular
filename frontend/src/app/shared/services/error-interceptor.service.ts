import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { SKIP_ERROR_TOAST } from '../constants';
import { AuthService } from './auth.service';

interface ApiErrorBody {
  message?: string | string[];
  error?: string;
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: unknown) => {
        if (
          error instanceof HttpErrorResponse &&
          !req.context.get(SKIP_ERROR_TOAST)
        ) {
          this.snackBar.open(this.resolveMessage(error), 'Fechar', {
            duration: 5000,
          });

          if (error.status === 401) {
            this.authService.logout();
            this.router.navigate(['/login']);
          }
        }

        return throwError(() => error);
      }),
    );
  }

  private resolveMessage(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Não foi possível conectar ao servidor. Verifique sua conexão.';
    }

    const body = error.error as ApiErrorBody | undefined;
    const message = body?.message;

    if (Array.isArray(message)) {
      return message.join(' ');
    }

    return message || 'Ocorreu um erro inesperado. Tente novamente.';
  }
}
