import { Slide, toast } from 'react-toastify';
import { ToastContent, ToastOptions as CustomToastOptions } from './ToastProps';

const Toast = (
  content: ToastContent,
  options?: CustomToastOptions | undefined
) => {
  toast(content, {
    ...(options || {}),
    hideProgressBar: true,
    transition: Slide,
  });
};

export default Toast;
