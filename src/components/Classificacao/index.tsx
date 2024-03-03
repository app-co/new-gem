/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { usePontos } from '../../contexts/pontos';
import { ISelfPonts } from '../../dtos';
import {
  BoxContainer,
  BoxEventos,
  BoxPosition,
  Container,
  Title,
} from './styles';

export function Classificacao() {
  const { pontosListMe } = usePontos();

  const item = pontosListMe.data as ISelfPonts;

  useFocusEffect(
    useCallback(() => {
      pontosListMe.refetch();
    }, []),
  );

  if (pontosListMe.isLoading) {
    return <ActivityIndicator size={30} />;
  }

  return (
    <Container>
      <BoxEventos>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',

          }}
        >
          <BoxContainer>
            <Title>COMPRAS</Title>
            <Title>{item?.compras?.pontos} pts</Title>
          </BoxContainer>

          <BoxPosition>
            <Title>{item?.compras?.rank}</Title>
          </BoxPosition>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',

          }}
        >
          <BoxContainer>
            <Title>VENDAS</Title>
            <Title>{item?.vendas?.pontos} pts</Title>
          </BoxContainer>

          <BoxPosition>
            <Title>{item?.vendas?.rank}</Title>
          </BoxPosition>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',

          }}
        >
          <BoxContainer>
            <Title>INDICAÇÕES</Title>
            <Title>{item?.indication?.pontos} pts</Title>
          </BoxContainer>

          <BoxPosition>
            <Title>{item?.indication?.rank}</Title>
          </BoxPosition>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',

          }}
        >
          <BoxContainer>
            <Title>PRESENÇA</Title>
            <Title>{item?.presenca?.pontos} pts</Title>
          </BoxContainer>

          <BoxPosition>
            <Title>{item?.presenca?.rank}</Title>
          </BoxPosition>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',

          }}
        >
          <BoxContainer>
            <Title>PADRINHO</Title>
            <Title>{item?.padrinho?.pontos}pts</Title>
          </BoxContainer>

          <BoxPosition>
            <Title>{item?.padrinho?.rank}</Title>
          </BoxPosition>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',

          }}
        >
          <BoxContainer>
            <Title>B2B</Title>
            <Title>{item?.b2b?.pontos}pts</Title>
          </BoxContainer>

          <BoxPosition>
            <Title>{item?.b2b?.rank}</Title>
          </BoxPosition>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <BoxContainer>
            <Title>CONVIDADOS</Title>
            <Title>{item?.convidado?.pontos}pts</Title>
          </BoxContainer>

          <BoxPosition>
            <Title>{item?.convidado?.rank}</Title>
          </BoxPosition>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',

          }}
        >
          <BoxContainer>
            <Title>DONATIVOS</Title>
            <Title>{item?.donates?.pontos}pts</Title>
          </BoxContainer>

          <BoxPosition>
            <Title>{item?.donates?.rank}</Title>
          </BoxPosition>
        </View>
      </BoxEventos>
    </Container>
  );
}
