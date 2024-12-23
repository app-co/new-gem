import React, { memo } from 'react';

import { format } from 'date-fns';
import { RFValue } from 'react-native-responsive-fontsize';
import * as S from './styles';
import { IRelationship } from '../../hooks/dto/interfaces';
import { TextStyle } from '../forms/topograph';
import { Box } from 'native-base';
import { colors } from '../../global/hub-colors';

interface I {
  day: number;
  item: IRelationship[];
}

function ExtratoCompMemo({ item = [], day }: I) {
  console.log(item)
  return (
    <S.content>
      <S.circle>
        <S.title>{day}</S.title>
      </S.circle>

      {item.length > 0 ? (
        <Box>
          {item.map(h => (
            <S.Container key={h.id}>
              <S.box>
                {h?.objeto?.apadrinhado_name ? (
                  <TextStyle>{h?.objeto?.apadrinhado_name}</TextStyle>
                ) : (
                  <TextStyle>{h?.objeto?.descricao || h?.objeto?.assunto}</TextStyle>
                )}
              </S.box>

              <Box >
                {h?.type <= 2 && (
                  <TextStyle style={{ fontFamily: 'bold', fontSize: RFValue(16) }}>
                    {h.valor}
                  </TextStyle>
                )}

                {h.type === 3 && (
                  <TextStyle>{format(new Date(h.updated_at), 'dd/MM - HH:mm')}</TextStyle>
                )}

                {h.type === 4 && (
                  <TextStyle>{format(new Date(h.updated_at), 'dd/MM - HH:mm')}</TextStyle>
                )}


                {h.type === 6 && (
                  <TextStyle>{format(new Date(h.updated_at), 'dd/MM - HH:mm')}</TextStyle>
                )}
              </Box>


            </S.Container>
          ))}

        </Box>
      ) : (

        <Box opacity={0.4} >
          <TextStyle colorText={colors.alert[0]} >Não há negócios neste dia</TextStyle>
        </Box>
      )}

    </S.content>
  );
}

export const ExtratoComp = memo(ExtratoCompMemo);
