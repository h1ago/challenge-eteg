import React from 'react';
import * as S from './styles';
import i18n from 'i18next';

const Empty = () => {
  return <S.Container>{i18n.t('empty')}</S.Container>;
};

export default Empty;
