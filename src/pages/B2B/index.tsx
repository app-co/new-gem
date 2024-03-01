/* eslint-disable camelcase */
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { Center } from 'native-base';
import React, { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';

import { Header } from '../../components/Header';
import { Input } from '../../components/Inputs';
import { Loading } from '../../components/Loading';
import { MembrosComponents } from '../../components/MembrosCompornents';
import { IUserDtos } from '../../dtos';
import { useAuth } from '../../hooks/useAuth';
import { useAllUsers } from '../../hooks/user';
import { Box } from '../FindMembro/styles';
import { Container } from './styles';

export function B2B() {
  const { navigate } = useNavigation();
  const { user } = useAuth();
  const { data, refetch, isLoading } = useAllUsers(user.hub);

  const [value, setValue] = useState('');

  const membros = data || [];

  const users =
    value.length > 0
      ? membros.filter(h => {
        const up = h.nome.toLocaleUpperCase();

        if (up.includes(value.toLocaleUpperCase()) && h.id !== user.id) {
          return h;
        }
        return null;
      })
      : membros.filter(h => h.id !== user.id);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const hanldeTransaction = useCallback(
    (prestador: IUserDtos) => {
      navigate('orderB2b', { prestador });
    },
    [navigate],
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Header />

      <Center>
        <Form>
          <Box>
            <Input
              name="find"
              icon="search"
              onChangeText={text => setValue(text)}
              value={value}
            />
          </Box>
        </Form>
      </Center>

      <View style={{ paddingBottom: 350 }}>
        <FlatList
          data={users}
          keyExtractor={h => h.id}
          renderItem={({ item: h }) => (
            <MembrosComponents
              star={h.media}
              icon="b2b"
              pres={() => hanldeTransaction(h)}
              userName={h.nome}
              user_avatar={h.profile.avatar}
              oficio={h.profile.workName}
              imageOfice={h.profile.logo}
            // inativoPres={h.profile.inativo}
            // inativo={h.profile.inativo}
            />
          )}
        />
      </View>
    </Container>
  );
}
