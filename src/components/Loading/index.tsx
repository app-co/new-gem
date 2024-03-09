import React from 'react';
import { ActivityIndicator } from 'react-native';

import img from '../../assets/capa.png';
import * as S from './styles';

export function Loading() {
  return (
    <S.Container>
      <S.bg source={img} />
      <ActivityIndicator size={30} color="#fff" />
    </S.Container>
  );
}
