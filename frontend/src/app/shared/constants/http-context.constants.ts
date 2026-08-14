import { HttpContextToken } from '@angular/common/http';

/**
 * Set to true on a request whose component already shows its own inline
 * error message, so the global error interceptor doesn't duplicate it.
 */
export const SKIP_ERROR_TOAST = new HttpContextToken<boolean>(() => false);
