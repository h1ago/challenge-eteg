/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Customer } from '@/types';
import React from 'react';
import * as S from './styles';
import InputMask from 'react-input-mask';
import {
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '@/services/customerServices';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import i18n from 'i18next';
import { showToast, validateCPF } from './helpers';

interface Props {
  onClose: () => void;
  record?: Customer;
}

const Form = ({ record, onClose }: Props) => {
  const isNewRecord = record === undefined;
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: record ?? {
      name: '',
      cpf: '',
      email: '',
      favoriteColor: '',
      notes: '',
    },
  });

  const onSubmit = async (data: Customer) => {
    const customer: Customer = { ...data, cpf: data.cpf.replace(/\D/g, '') };
    const toastId = toast.loading(i18n.t('form.loading'));

    try {
      setIsLoading(true);

      if (isNewRecord) {
        await createCustomer(customer);
        showToast(toastId, i18n.t('form.messages.registerSuccess'));
      } else {
        await updateCustomer(customer);
        showToast(toastId, i18n.t('form.messages.updateSuccess'));
      }

      onClose();
    } catch (error) {
      if (error instanceof Error) {
        showToast(
          toastId,
          i18n.t(`form.validation.${error?.message}`),
          'error',
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (record?.id) {
        const toastId = toast.loading(i18n.t('form.loading'));
        setIsLoading(true);
        await deleteCustomer(record.id);
        showToast(toastId, i18n.t('form.messages.deleteSuccess'));
        onClose();
      }
    } catch (error) {
      toast.error(i18n.t('form.messages.deleteError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Container>
      <S.Title>
        {isNewRecord
          ? i18n.t('form.registerCustomer')
          : i18n.t('form.editCustomer')}
      </S.Title>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Label htmlFor="name">{i18n.t('form.fullName')}</S.Label>
        <S.Input
          id="name"
          data-testid="name"
          {...register('name', {
            required: i18n.t('form.validation.fullnameRequired'),
          })}
        />
        {errors.name && <S.Message>{errors.name.message}</S.Message>}

        <S.Label htmlFor="cpf">{i18n.t('form.socialNumber')}</S.Label>
        <Controller
          name="cpf"
          control={control}
          rules={{
            required: i18n.t('form.validation.socialNumberRequired'),
            validate: validateCPF,
          }}
          render={({ field }) => (
            <InputMask
              mask="999.999.999-99"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            >
              {(inputProps) => (
                <S.Input
                  {...inputProps}
                  id="cpf"
                  data-testid="cpf"
                  ref={field.ref}
                />
              )}
            </InputMask>
          )}
        />
        {errors.cpf && <S.Message>{errors.cpf.message}</S.Message>}

        <S.Label htmlFor="email">{i18n.t('form.email')}</S.Label>
        <S.Input
          id="email"
          type="email"
          data-testid="email"
          {...register('email', {
            required: i18n.t('form.validation.emailRequired'),
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: i18n.t('form.validation.invalidEmail'),
            },
          })}
        />
        {errors.email && <S.Message>{errors.email.message}</S.Message>}

        <S.Label htmlFor="favoriteColor">
          {i18n.t('form.favoriteColor')}
        </S.Label>
        <S.Select
          id="favoriteColor"
          data-testid="favoriteColor"
          {...register('favoriteColor')}
        >
          <option value="">{i18n.t('form.selectColor')}</option>
          <option value="red">{i18n.t('form.colors.red')}</option>
          <option value="orange">{i18n.t('form.colors.orange')}</option>
          <option value="yellow">{i18n.t('form.colors.yellow')}</option>
          <option value="green">{i18n.t('form.colors.green')}</option>
          <option value="blue">{i18n.t('form.colors.blue')}</option>
          <option value="indigo">{i18n.t('form.colors.indigo')}</option>
          <option value="violet">{i18n.t('form.colors.violet')}</option>
        </S.Select>
        {errors.favoriteColor && (
          <S.Message>{errors.favoriteColor.message}</S.Message>
        )}

        <S.Label htmlFor="notes">{i18n.t('form.notes')}</S.Label>
        <S.Textarea
          id="notes"
          data-testid="notes"
          rows={4}
          {...register('notes')}
        />

        <S.Wrapper>
          {!isNewRecord && (
            <S.DeleteButton
              type="button"
              disabled={isLoading}
              onClick={handleDelete}
            >
              {i18n.t('form.buttons.delete')}
            </S.DeleteButton>
          )}
          <S.CancelButton type="button" onClick={onClose}>
            {i18n.t('form.buttons.cancel')}
          </S.CancelButton>
          <S.SubmitButton
            type="submit"
            disabled={isLoading}
            data-testid="submit"
          >
            {isNewRecord
              ? i18n.t('form.buttons.create')
              : i18n.t('form.buttons.save')}
          </S.SubmitButton>
        </S.Wrapper>
      </S.Form>
    </S.Container>
  );
};

export default Form;
