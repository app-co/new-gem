/* eslint-disable camelcase */
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import {
  NativeBaseProvider,
  Text,
  Box,
  Center,
  HStack,
  Avatar,
} from 'native-base';
import React, { useCallback } from 'react';
import { ActivityIndicator, Alert, FlatList } from 'react-native';

import { Header } from '../../components/Header';
import { Input } from '../../components/Inputs';
import { useData } from '../../contexts/useData';
import { IUserDtos } from '../../dtos';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import * as S from './styles';

export function Padrinho() {
  const { user } = useAuth();
  const { navigate } = useNavigation();
  const [load, setLoad] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const { users } = useData();

  const userData = (users.data as IUserDtos[]) || [];

  const listUsers = userData.filter(
    h => h.id !== user.id && h.situation.apadrinhado === false,
  );

  const list =
    search !== ''
      ? listUsers.filter(h => {
          const uper = h.nome.toUpperCase();
          if (uper.includes(search.toUpperCase())) {
            return h;
          }
        })
      : listUsers;

  const handleApadrinhar = useCallback(
    async ({ id, nome }: IUserDtos) => {
      const data = {
        objto: {
          apadrinhado_name: nome,
          apadrinhado_id: id,
        },
        type: 'PADRINHO',
        situation: true,
      };

      await api
        .post('/relation-create', data)
        .then(h => {
          Alert.alert('Sucesso!', `membro ${nome} foi apadrinhado`);
          users.refetch();
        })
        .catch(h => {
          const mess = h.response.data.status;
          if (mess) {
            return Alert.alert('Atenção', mess);
          }
          return Alert.alert(
            'Estamos em manutenção',
            'tente novamente mais tarde',
          );
        });
    },
    [users],
  );

  console.log(list);

  if (users.isLoading) {
    return <ActivityIndicator size={30} />;
  }

  return (
    <NativeBaseProvider>
      <Header />

      <Form>
        <Center mt="8">
          <Input
            autoCapitalize="characters"
            icon="search"
            name="search"
            onChangeText={setSearch}
          />
        </Center>
      </Form>

      <FlatList
        data={list}
        keyExtractor={h => h.id}
        renderItem={({ item: h }) => (
          <S.button
            afiliado={h.situation.apadrinhado}
            onPress={() => handleApadrinhar(h)}
          >
            <HStack space={4} alignItems="center">
              <Avatar source={{ uri: h.profile.avatar }} />
              <S.text afiliado={h.situation.apadrinhado}>{h.nome}</S.text>
            </HStack>
          </S.button>
        )}
      />
    </NativeBaseProvider>
  );
}
