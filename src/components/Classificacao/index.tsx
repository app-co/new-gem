/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';

import { Center, FlatList, HStack } from 'native-base';
import { useMetricas } from '../../contexts/metricas';
import { usePontos } from '../../contexts/pontos';
import { Loading } from '../Loading';
import * as S from './styles';
import { make } from '../../hooks';
import { Island } from 'phosphor-react-native';
import { ActivityIndicator } from 'react-native';

const { querys } = make()

export function Classificacao() {
  const { data: metrica, isLoading } = querys.useRelationsMetricasUser()

  const positions = metrica?.position ?? []

  if (isLoading) {

    return (
      <Center flex={1} >
        <ActivityIndicator />
      </Center>
    )
  }

  return (
    <S.Container>
      <S.BoxEventos>
        <FlatList
          data={positions}
          keyExtractor={(h, i) => String(i)}
          renderItem={({ item: h, index }) => (

            <HStack key={index} my='3px' justifyContent={'space-between'} >
              <S.BoxContainer>
                <S.Title>{h?.type_str}</S.Title>
                <S.Title>{h?.pontos} pts</S.Title>
              </S.BoxContainer>

              <S.BoxPosition>
                <S.Title>{h?.rank}</S.Title>
                <S.text>rank</S.text>
              </S.BoxPosition>
            </HStack>
          )}
        />

      </S.BoxEventos>
    </S.Container>
  );
}
