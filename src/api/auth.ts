import { ACCESS_TOKEN } from 'src/constants';
import { AuthData } from 'src/entities/Auth';

const storage = localStorage;
export class Auth {
  static get token(): string | null {
    return storage.getItem(ACCESS_TOKEN);
  }

  static set setToken(token: string | null) {
    storage.setItem(ACCESS_TOKEN, token || '');
  }

  static clear = (): void => {
    storage.removeItem(ACCESS_TOKEN);
  };

  static setAuthData(data: AuthData): void {
    Auth.setToken = data.access_token;
  }

  static authorize = (): void => {
    // window.location.href = `${process.env.APP_AUTH_URL}${process.env.APP_CALLBACK_URL}`;
    console.log('Auth.authorize()');
    window.location.pathname = `/api/login`;
  };

  static logOut = (): void => {
    window.location.href = String(process.env.APP_LOGOUT_URL);
  };

  static checkToken(token: string | null, exp: number | null): boolean {
    if (!token || !exp) {
      return false;
    }

    const currentTimestamp = new Date().getTime();
    const tokenIsNotExpired = exp > currentTimestamp;

    return tokenIsNotExpired;
  }
}
