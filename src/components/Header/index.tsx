/* eslint-disable no-unused-expressions */
/* eslint-disable react/require-default-props */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Box, HStack } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import theme from '../../global/styles/club-mentoria';
import { CartaMessagem } from '../CartaMessagem';
import * as S from './styles';

interface IProps {
  type?: 'menu' | 'goback';
  title?: string;
  orders?: number;
  openMail?: () => void;
}

export function Header({ title, orders = 0, openMail, type = 'menu' }: IProps) {
  const { dispatch, goBack } = useNavigation();
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top;
  return (
    <S.Container style={{ paddingTop }}>
      <Box w="100%">
        <HStack alignItems="center" space="70%">
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => {
              type === 'menu' ? dispatch(DrawerActions.openDrawer()) : goBack();
            }}
          >
            {type === 'menu' ? (
              <MaterialCommunityIcons
                name="menu"
                size={40}
                color={theme.colors.color_text.ligh}
              />
            ) : (
              <MaterialCommunityIcons
                name="arrow-left-thick"
                size={40}
                color={theme.colors.focus[1]}
              />
            )}
          </TouchableOpacity>

          {orders > 0 && <CartaMessagem pres={openMail} quantity={orders} />}
        </HStack>
      </Box>
    </S.Container>
  );
}
