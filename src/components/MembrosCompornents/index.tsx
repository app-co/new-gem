/* eslint-disable react/require-default-props */
/* eslint-disable camelcase */
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { CurrencyCircleDollar } from 'phosphor-react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import icone from '../../assets/circulos.png';
import theme from '../../global/styles/club-mentoria';
import * as S from './styles';
import { colors } from '../../global/hub-colors';
import { TextStyle } from '../forms/topograph';

interface Props {
  userName: string;
  user_avatar: string;
  oficio: string;
  imageOfice: string;
  pres: () => void;
  icon?: 'necociar' | 'indicar' | 'b2b';
  inativo?: boolean;
  inativoPres?: boolean;
  star: number;
}

export function MembrosComponents({
  userName,
  user_avatar,
  oficio,
  imageOfice,
  pres,
  icon,
  inativo,
  inativoPres,
  star = 1,
}: Props) {
  return (
    <S.Container>
      <S.Box
        inativo={inativo}
        onPress={pres}
        disabled={inativoPres}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,

          elevation: 6,
        }}
      >
        <S.BoxAvatar>
          <S.Avatar
            source={{
              uri:
                user_avatar ||
                'https://www.seekpng.com/png/detail/73-730482_existing-user-default-avatar.png',
            }}
          />
          <S.ImageOfice source={{ uri: imageOfice }} />
        </S.BoxAvatar>

        <S.BoxText>
          <TextStyle type='defaultSemiBold' >{userName}</TextStyle>
          <TextStyle
            style={{
              fontFamily: theme.fonts.regular,
              textAlign: 'left',
            }}
          >
            {' '}
            {oficio}{' '}
          </TextStyle>

          <S.boxH>
            <S.star name={star >= 1 ? 'star' : 'star-o'} />

            <S.star name={star >= 2 ? 'star' : 'star-o'} />

            <S.star name={star >= 3 ? 'star' : 'star-o'} />

            <S.star name={star >= 4 ? 'star' : 'star-o'} />

            <S.star name={star >= 5 ? 'star' : 'star-o'} />
          </S.boxH>
        </S.BoxText>

        <S.ContainerIcon>
          {icon === 'necociar' && (
            <CurrencyCircleDollar color={colors.focus[0]} size={45} />
          )}
          {icon === 'indicar' && (
            <AntDesign size={40} name="swap" color={colors.focus[0]} />
          )}

          {icon === 'b2b' && (
            <FontAwesome5
              name="users"
              size={40}
              color={colors.focus[0]}
            />
          )}
        </S.ContainerIcon>
      </S.Box>
    </S.Container>
  );
}
