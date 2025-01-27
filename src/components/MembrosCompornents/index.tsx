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
import { Box, HStack, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native';
import * as Linkin from 'expo-linking'
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
  whats: string;
  google: string
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
  star = 5,
  whats,
  google
}: Props) {
  const phone = whats.replace(/\D/g, '')
  const whatsApp = `https://api.whatsapp.com/send?phone=55${phone}&text=Olá, gostaria de saber mais sobre o seu trabalho.`

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

        <S.BoxText>
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

          <VStack justifyContent={'space-between'} >
            <Box>
              <TextStyle type='defaultSemiBold' >{userName}</TextStyle>
              <TextStyle
                style={{
                  fontFamily: theme.fonts.regular,
                }}
              >
                {oficio}
              </TextStyle>
              <S.boxH>
                <S.star name={star >= 1 ? 'star' : 'star-o'} />

                <S.star name={star >= 2 ? 'star' : 'star-o'} />

                <S.star name={star >= 3 ? 'star' : 'star-o'} />

                <S.star name={star >= 4 ? 'star' : 'star-o'} />

                <S.star name={star >= 5 ? 'star' : 'star-o'} />
              </S.boxH>

            </Box>

            <TouchableOpacity onPress={() => Linkin.openURL(google)} >
              <HStack bg={colors.focus[0]} alignItems={'center'} space={2} p={1} rounded={4} >
                <FontAwesome5 name="google" size={15} color={colors.text[2]} />
                <TextStyle colorText={colors.text[2]} type='defaultSemiBold' >Google Empresa</TextStyle>
              </HStack>
            </TouchableOpacity>



          </VStack>

          <Box flex={1} justifyContent={'flex-end'} alignItems={'flex-end'} >
            <TouchableOpacity onPress={() => Linkin.openURL(whatsApp)} >
              <FontAwesome5 name="whatsapp" size={35} color={colors.focus[0]} />
            </TouchableOpacity>
          </Box>


        </S.BoxText>

        {/* <S.ContainerIcon>
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
        </S.ContainerIcon> */}
      </S.Box>
    </S.Container>
  );
}
