import type { Id } from 'react-toastify';
import { toast } from 'react-toastify';

export const showToast = (
  toastId: Id,
  message: string,
  type: 'success' | 'error' = 'success',
) => {
  toast.update(toastId, {
    render: message,
    type,
    isLoading: false,
    autoClose: 5000,
    closeButton: true,
  });
};
