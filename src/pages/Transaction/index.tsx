/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import { useNavigation, useRoute } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { Avatar, Box, Center, HStack, TextArea } from 'native-base';
import React, { useCallback, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Header } from '../../components/Header';
import { Input } from '../../components/Inputs';
import { useToken } from '../../contexts/Token';
import { IUserDtos } from '../../dtos';
import theme from '../../global/styles/geb';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import { routesScheme } from '../../services/schemeRoutes';
import { _currency, _number } from '../../utils/mask';
import * as S from './styles';

interface IRoute {
  prestador: IUserDtos;
}

export function Transaction() {
  const { navigate } = useNavigation();
  const { mytoken } = useToken();
  const { user } = useAuth();
  const route = useRoute();
  const { prestador } = route.params as IRoute;

  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');

  const valor =
    value.length < 6 ? Number(_number(`${value},00`)) : Number(_number(value));

  const navigateToOk = useCallback(async () => {
    if (value === '') {
      Alert.alert('Transação', 'informe o valor que foi consumido');
      return;
    }

    if (!description) {
      Alert.alert('Transação', 'informe uma descrição ');
      return;
    }

    const dt = {
      prestador_id: prestador.id,
      client_id: user.id,
      token: prestador.token,
      objto: {
        token: mytoken,
        consumidor_name: user.nome,
        avatar: user.profile.avatar,
        description,
        valor,
      },
      type: 'CONSUMO_OUT',
    };

    await api
      .post(`${routesScheme.relationShip.create}`, dt)
      .then(() => {
        Alert.alert('Sucesso!', 'Continue a incentivar os membros do GEB');
        navigate('sucess', { prestador, description });
      })
      .catch(err => {
        const mess = err?.response?.data?.messege;
        if (mess) {
          Alert.alert('Ops!', mess);
        } else {
          Alert.alert(
            'Estamos com instabilidade no servidor',
            'Tente novamente mais tarde',
          );
        }
      });
  }, [value, description, prestador, user, mytoken, valor, navigate]);

  return (
    <S.Container>
      <Header type="goback" />

      <Box>
        <S.Title style={{ marginBottom: 30, textAlign: 'center' }}>
          Vocẽ está consumindo de: {prestador.nome}
        </S.Title>

        <S.box>
          <HStack alignItems="center" justifyContent="space-between" w="full">
            <Avatar
              alignSelf="center"
              size="xl"
              source={{ uri: user?.profile?.avatar }}
            />

            <HStack
              alignItems="center"
              justifyContent="space-between"
              space={1}
              flex="1"
            >
              <S.Caretright name="caretright" size={RFValue(18)} />

              <Center>
                <S.Title>{_currency(String(valor))}</S.Title>
              </Center>

              <S.Caretright name="caretright" size={RFValue(18)} />
            </HStack>

            <Avatar
              alignSelf="center"
              size="xl"
              source={{ uri: prestador.profile?.avatar }}
            />
          </HStack>
        </S.box>
      </Box>

      <ScrollView>
        <View style={{ paddingBottom: 50 }}>
          <S.BoxInput
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.57,
              shadowRadius: 4.65,

              elevation: 6,
            }}
          >
            <View>
              <Text style={{ alignSelf: 'flex-end', color: '#f2f2f2' }}>
                {description.length}/100
              </Text>
              <TextArea
                h="50%"
                w="80%"
                borderRadius={10}
                maxLength={100}
                value={description}
                onChangeText={h => setDescription(h)}
                fontFamily={theme.fonts.regular}
                fontSize={16}
                color="gray.100"
              />
            </View>

            <Form>
              <Input
                name="value"
                keyboardType="numeric"
                onChangeText={text => setValue(_currency(text))}
                multiline
                value={value}
                placeholder="Valor consumido R$"
              />
            </Form>
          </S.BoxInput>

          <S.Buton onPress={navigateToOk}>
            <S.Title style={{ color: theme.colors.color_text.dark }}>
              Enviar
            </S.Title>
          </S.Buton>
        </View>
      </ScrollView>
    </S.Container>
  );
}
