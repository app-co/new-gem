import React from 'react';
import { View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import theme from '../../global/styles/geb';
import * as S from './styles';

interface IPropsPonts {
  id: string;
  nome: string;
  pontos: number;
  valor: number;
  rank: number;
}

interface I {
  item: IPropsPonts;
}

export function BoxRank({ item }: I) {
  return (
    <S.Container>
      <View
        style={{
          paddingBottom: 20,
          marginTop: 10,
        }}
      >
        <S.BoxLista>
          <S.BoxClassificacao>
            <S.TitleList
              style={{
                fontSize: 26,
                color: theme.colors.color_text.dark,
              }}
            >
              {item.rank}
            </S.TitleList>
          </S.BoxClassificacao>
          <View
            style={{
              flex: 1,
              marginLeft: 20,
            }}
          >
            <S.TitleList
              style={{
                fontSize: RFValue(20),
                fontFamily: theme.fonts.bold,
              }}
            >
              {' '}
              {item.nome}{' '}
            </S.TitleList>
            <S.TitleList> { } </S.TitleList>
          </View>

          <View
            style={{
              alignItems: 'center',
              flex: 1,
            }}
          >
            <S.TitleList
              style={{
                fontSize: RFValue(16),
                fontFamily: theme.fonts.bold,
                textAlign: 'center',
              }}
            >
              Pontos
            </S.TitleList>
            <S.TitleList>{item.pontos} </S.TitleList>
          </View>
        </S.BoxLista>
      </View>
    </S.Container>
  );
}
