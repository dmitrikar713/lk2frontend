import { ToastContainerProps as CustomContainerProps } from '../ToastProps';
import React from 'react';
import { ToastContainerProps, ToastContainer as TC } from 'react-toastify';

// eslint-disable-next-line react/display-name
const ToastContainer = React.forwardRef<HTMLDivElement, CustomContainerProps>(
  (props: CustomContainerProps, ref) => (
    <TC {...(props as ToastContainerProps)} />
  )
);

export default ToastContainer;
