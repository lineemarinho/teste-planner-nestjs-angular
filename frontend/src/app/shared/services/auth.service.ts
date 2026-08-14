import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_ENDPOINTS, AUTH_TOKEN_KEY, SKIP_ERROR_TOAST } from '../constants';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(API_ENDPOINTS.login, payload, {
        context: new HttpContext().set(SKIP_ERROR_TOAST, true),
      })
      .pipe(tap((response) => this.setToken(response.accessToken)));
  }

  logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private setToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }
}
