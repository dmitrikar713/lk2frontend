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
    window.location.href = `${process.env.APP_AUTH_URL}${process.env.APP_CALLBACK_URL}`;
  };

  static logOut = (url: string): void => {
    window.location.href = url;
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
