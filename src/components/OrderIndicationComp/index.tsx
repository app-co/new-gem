import { format } from 'date-fns';
import { Avatar, Box, Center, HStack, Radio } from 'native-base';
import React, { ReactNode } from 'react';
import { ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import theme from '../../global/styles/geb';
import { _text } from '../../utils/size';
import * as S from './styles';
import { IRelationship } from '../../hooks/dto/interfaces';
import { TextStyle } from '../forms/topograph';
import { colors } from '../../global/hub-colors';
import { _currency } from '../../utils/mask';
import { locale } from '../../utils/LocalStrigMoney';

type TTypeValue = 'not-yeat' | 'not' | 'handshak';

interface IProps {
  item: IRelationship;
  reject: () => void;
  confirmation: () => void;
  valueType: (item: TTypeValue) => void;
  children: ReactNode;
  load: boolean;
}

export const _convertionType: { [key: number]: string } = {
  1: 'COMPRA',
  2: 'VENDA',
  3: 'B2B',
  4: 'INDICAÇÃO',
  5: 'PRESENÇA',
  6: 'DONATIVOS',
  7: 'CONVITES',
  8: 'PADRINHO',
  9: 'CORRIDAS',
}
export function OrderIndicationComp({
  item,
  reject,
  valueType,
  confirmation,
  children,
  load,
}: IProps) {

  const [value, setValue] = React.useState('not-yeat');

  return (
    <S.Container>
      <TextStyle colorText={colors.focus[1]} type='title' >{_convertionType[item.type]}</TextStyle>
      {item.type === 4 && (
        <Box mt={4} >
          <TextStyle>
            {item?.objeto?.indicado_por} indicou você para fazer negócios
            com...
          </TextStyle>
          <Box bg={colors.bg_color[3]} mt={4} p={2} rounded={'xl'} >
            <S.flex>
              <TextStyle type='defaultSemiBold' >Nome do cliente: </TextStyle>
              <S.text>{item?.objeto?.nomeCliente}</S.text>
            </S.flex>
            <S.flex>
              <TextStyle type='defaultSemiBold' >Contato: </TextStyle>
              <S.text>{item?.objeto?.contatoCliente}</S.text>
            </S.flex>
            <S.flex>
              <TextStyle type='defaultSemiBold'>Descrição: </TextStyle>
              <S.text>{item?.objeto?.descricao}</S.text>
            </S.flex>
            <S.flex>
              <TextStyle type='defaultSemiBold'>Data que foi indicado: </TextStyle>
              <S.text>{format(new Date(item?.created_at), 'dd/MM/yy')}</S.text>
            </S.flex>

          </Box>

          <Center
            _text={{
              color: theme.colors.focus[2],
              fontFamily: theme.fonts.bold,
              fontWeight: 800,
              fontSize: _text,
            }}
            m={5}
          >
            Você fechou negócio?
          </Center>

          <Center>
            <Radio.Group
              flexDir="row"
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              onChange={h => {
                setValue(h);
                valueType(h);
              }}
              value={value}
            >
              <Radio
                _text={{
                  color: '#fff',
                  fontFamily: theme.fonts.medium,
                  fontSize: RFValue(12),
                }}
                value="not-yeat"
              >
                Ainda não
              </Radio>

              <Radio
                _text={{
                  color: '#fff',
                  fontFamily: theme.fonts.medium,
                  fontSize: RFValue(12),
                }}
                ml={3}
                value="not"
              >
                Não deu certo
              </Radio>

              <Radio
                _text={{
                  color: '#fff',
                  fontFamily: theme.fonts.medium,
                  fontSize: RFValue(12),
                }}
                ml={3}
                value="handshak"
              >
                Sim
              </Radio>
            </Radio.Group>
          </Center>

          {value === 'handshak' && <Box>{children}</Box>}
        </Box>
      )}

      {item.type <= 2 && (
        <HStack mt={4} space={4}>
          <Center mt="4">
            <Avatar size="lg" source={{ uri: item?.avatar }} />
            <S.text>{item?.objeto?.al}</S.text>
          </Center>

          <S.boxDescription>
            <S.title>Descrição Compra</S.title>
            <S.text>{item?.objeto.assunto}</S.text>
            <S.textfocus>{locale(item?.valor)}</S.textfocus>
          </S.boxDescription>
        </HStack>
      )}

      {item.type === 3 && (
        <HStack space={6}>
          <Center mt="4">
            <Avatar size="lg" source={{ uri: item.objeto?.avatar }} />
            <S.text>{item.objeto?.send_name}</S.text>
          </Center>

          <S.boxDescription>
            <S.title>Assunto</S.title>
            <S.text>{item?.objeto.assunto}</S.text>
          </S.boxDescription>
        </HStack>
      )}

      <S.flexButton>
        <S.buttonRe disabled={load} onPress={reject}>
          {load ? <ActivityIndicator /> : <S.textButton>REJEITAR</S.textButton>}
        </S.buttonRe>

        <S.buttonOk disabled={load} onPress={confirmation}>
          {load ? (
            <ActivityIndicator />
          ) : (
            <S.textButton>CONFIRMAR</S.textButton>
          )}
        </S.buttonOk>
      </S.flexButton>
    </S.Container>
  );
}
