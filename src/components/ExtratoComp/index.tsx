import React, { memo } from 'react';

import { format } from 'date-fns';
import { RFValue } from 'react-native-responsive-fontsize';
import { IRelashionship } from '../../dtos';
import * as S from './styles';

interface I {
  day: number;
  item: IRelashionship[];
}

function ExtratoCompMemo({ item = [], day }: I) {
  console.log({ item: item.map(h => h.objto) })
  return (
    <S.content>
      <S.circle>
        <S.title>{day}</S.title>
      </S.circle>

      {item.map(h => (
        <S.Container key={h.id}>
          <S.box>
            {h.objto?.apadrinhado_name ? (
              <S.text>{h.objto?.apadrinhado_name}</S.text>
            ) : (
              <S.text>{h.objto.description}</S.text>
            )}
          </S.box>

          {h.type === 'PRESENCA' && (
            <S.text>{format(new Date(h.updated_at), 'dd/MM - HH:mm')}</S.text>
          )}

          {h.type === 'DONATE' && (
            <S.text>{format(new Date(h.updated_at), 'dd/MM - HH:mm')}</S.text>
          )}

          {h?.type === 'CONSUMO_OUT' && (
            <S.text style={{ fontFamily: 'bold', fontSize: RFValue(16) }}>
              {h.objto.currency}
            </S.text>
          )}
        </S.Container>
      ))}
    </S.content>
  );
}

export const ExtratoComp = memo(ExtratoCompMemo);
