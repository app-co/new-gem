import { format } from 'date-fns';
import { Avatar, Box, Center, HStack, Radio } from 'native-base';
import React, { ReactNode } from 'react';
import { ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { IRelashionship } from '../../dtos';
import theme from '../../global/styles/geb';
import { _text } from '../../utils/size';
import * as S from './styles';

type TTypeValue = 'not-yeat' | 'not' | 'handshak';

interface IProps {
  item: IRelashionship;
  reject: () => void;
  confirmation: () => void;
  valueType: (item: TTypeValue) => void;
  children: ReactNode;
  load: boolean;
}

const title = {
  INDICATION: 'INDICAÇÃO',
  CONSUMO_OUT: 'CONSUMO',
  B2B: 'B2B',
};

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
      <S.title>{title[item.type]}</S.title>
      {item.type === 'INDICATION' && (
        <Box>
          <S.title>
            {item?.objto?.quemIndicaou_name} indicou você para fazer negócios
            com...
          </S.title>
          <S.flex style={{ marginTop: 20 }}>
            <S.title>Nome do cliente: </S.title>
            <S.text>{item?.objto?.client_name}</S.text>
          </S.flex>
          <S.flex>
            <S.title>Contato: </S.title>
            <S.text>{item?.objto?.phone_number}</S.text>
          </S.flex>
          <S.flex>
            <S.title>Descrição: </S.title>
            <S.text>{item?.objto?.description}</S.text>
          </S.flex>
          <S.flex>
            <S.title>Data que foi indicado: </S.title>
            <S.text>{format(new Date(item?.created_at), 'dd/MM/yy')}</S.text>
          </S.flex>

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

      {item.type === 'CONSUMO_OUT' && (
        <HStack space={6}>
          <Center mt="4">
            <Avatar size="lg" source={{ uri: item.objto.avatar }} />
            <S.text>{item.objto.consumidor_name}</S.text>
          </Center>

          <S.boxDescription>
            <S.title>Descrição do cunsumo</S.title>
            <S.text>{item?.objto.description}</S.text>
            <S.textfocus>{item?.objto?.valor}</S.textfocus>
          </S.boxDescription>
        </HStack>
      )}

      {item.type === 'B2B' && (
        <HStack space={6}>
          <Center mt="4">
            <Avatar size="lg" source={{ uri: item.objto?.avatar }} />
            <S.text>{item.objto.send_name}</S.text>
          </Center>

          <S.boxDescription>
            <S.title>Descrição do cunsumo</S.title>
            <S.text>{item?.objto.description}</S.text>
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
