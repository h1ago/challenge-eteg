import i18n from '@/translations';
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

export const validateCPF = (value: string) => {
  const cleanCPF = value.replace(/\D/g, '');
  if (cleanCPF.length !== 11) {
    return i18n.t('form.validation.invalidSocialNumber');
  }
  return true;
};
