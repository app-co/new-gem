/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';

import { FlatList, HStack } from 'native-base';
import { useMetricas } from '../../contexts/metricas';
import { usePontos } from '../../contexts/pontos';
import { Loading } from '../Loading';
import * as S from './styles';

export function Classificacao() {
  const { pontosListMe } = usePontos();
  const { getSelfMetric } = useMetricas()

  if (getSelfMetric.isLoading) {
    return <Loading />;
  }

  return (
    <S.Container>
      <S.BoxEventos>
        <FlatList
          data={getSelfMetric.data?.classification}
          keyExtractor={(h, i) => String(i)}
          renderItem={({ item: h, index }) => (

            <HStack key={index} my='3px' justifyContent={'space-between'} >
              <S.BoxContainer>
                <S.Title>{h.segment}</S.Title>
                <S.Title>{h.ponts} pts</S.Title>
              </S.BoxContainer>

              <S.BoxPosition>
                <S.Title>{h.rank}</S.Title>
                <S.text>rank</S.text>
              </S.BoxPosition>
            </HStack>
          )}
        />

      </S.BoxEventos>
    </S.Container>
  );
}
