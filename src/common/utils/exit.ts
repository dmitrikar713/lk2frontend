import { Auth } from 'src/api/auth';

export const exit = () => {
  Auth.clear();
  Auth.logOut(String(process.env.APP_LOGOUT_URL));
};
