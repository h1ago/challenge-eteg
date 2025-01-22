import React from 'react';
import * as S from './styles';
import UserIcon from '@/assets/images/user.svg';
import EmailIcon from '@/assets/images/email.svg';
import CpfIcon from '@/assets/images/cpf.svg';

interface Props {
  name: string;
  email: string;
  cpf: string;
  onClick: () => void;
}

const ListItem = ({ name, email, cpf, onClick }: Props) => {
  return (
    <S.Container onClick={onClick}>
      <S.VerticalBar />

      <S.Wrapper>
        <S.IconTextWrapper>
          <UserIcon />
          <S.Text>{name}</S.Text>
        </S.IconTextWrapper>

        <S.IconTextWrapper>
          <EmailIcon />
          <S.Text>{email}</S.Text>
        </S.IconTextWrapper>

        <S.IconTextWrapper>
          <CpfIcon />
          <S.Text>{cpf}</S.Text>
        </S.IconTextWrapper>
      </S.Wrapper>
    </S.Container>
  );
};

export default ListItem;
