import Toast from 'src/components/Toast';
import { SigningErrors } from 'src/entities/Errors';

export interface SignError {
  error: string;
  message: string;
}

export const signError = (error: SignError) => {
  if (error.message === SigningErrors.INCORRECT_PASSWORD) {
    Toast('Неверный пароль, попробуйте снова', {
      type: 'error',
    });
  } else if (error.message === SigningErrors.CANCELED_BY_USER) {
    Toast('Отменено пользователем', {
      type: 'error',
    });
  } else {
    Toast(error.message, {
      type: 'error',
    });
  }
};
