import React from 'react';
import * as S from './styles';

import Logo from '@/assets/images/logo.svg';

const Header = () => {
  return (
    <S.Container>
      <Logo />

      <S.TitleLogo>Formulário</S.TitleLogo>
    </S.Container>
  );
};

export default Header;
