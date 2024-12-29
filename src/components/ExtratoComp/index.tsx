import React, { memo } from 'react';

import { format } from 'date-fns';
import { RFValue } from 'react-native-responsive-fontsize';
import * as S from './styles';
import { IRelationship } from '../../hooks/dto/interfaces';
import { TextStyle } from '../forms/topograph';
import { Box, HStack, Wrap } from 'native-base';
import { colors } from '../../global/hub-colors';
import { Calendar, Clock } from 'phosphor-react-native';
import { locale } from '../../utils/LocalStrigMoney';

interface I {
  day: number;
  item: IRelationship[];
}

function ExtratoCompMemo({ item = [], day }: I) {
  return (
    <S.content>
      <HStack alignItems={'center'} justifyContent={'space-between'} pr={4} >
        <HStack alignItems={'center'} space={2} >
          <Calendar color={colors.focus[1]} />
          <S.circle>
            <S.title>{day}</S.title>
          </S.circle>

        </HStack>

        <Clock color={colors.focus[1]} />
      </HStack>


      {item.length > 0 ? (
        <Box mt={4} >
          {item.map(h => (
            <S.Container key={h.id}>
              <HStack w='full' alignItems={'center'} justifyContent={'space-between'} >
                {h?.type <= 2 && (
                  <Box>
                    <TextStyle>{h.objeto.descricao}</TextStyle>
                    <TextStyle>
                      {locale(h?.valor)}
                    </TextStyle>
                  </Box>
                )}

                {h?.type === 3 && (
                  <TextStyle>
                    {h?.objeto?.descricao}
                  </TextStyle>
                )}
                {h?.type === 5 && (
                  <TextStyle>...</TextStyle>
                )}


                {h?.type === 6 && (
                  <Wrap flex={1} flexDir={'row'} >

                    {h?.objeto?.donate.map(p => (
                      <TextStyle style={{ paddingHorizontal: 2 }} key={p.item}>{p?.item}; </TextStyle>
                    ))}
                  </Wrap>
                )}

                {h?.type === 7 && (
                  <TextStyle>
                    {h?.objeto?.nomeConvidado}
                  </TextStyle>
                )}

                {h?.type === 8 && (
                  <TextStyle>
                    {h?.objeto?.descricao}
                  </TextStyle>
                )}

                <TextStyle>{format(new Date(h.updated_at), 'dd/MM - HH:mm')}</TextStyle>
              </HStack>


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
