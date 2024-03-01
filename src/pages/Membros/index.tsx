/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
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
import { IProfileDto, IUserDtos } from '../../dtos';
import { useAuth } from '../../hooks/useAuth';
import { useAllUsers } from '../../hooks/user';
import { Box } from '../FindMembro/styles';
import { Container } from './styles';

interface PropsUser {
  user: IUserDtos;
  profile: IProfileDto;
}

export function Membros() {
  const { navigate } = useNavigation();
  const { user } = useAuth();
  const { data, refetch, isLoading } = useAllUsers(user.hub);

  const [load, setLoad] = useState(true);
  const [search, setSearch] = React.useState('');

  const hanldeTransaction = useCallback(
    (user: IUserDtos) => {
      navigate('Transaction', { prestador: user });
    },
    [navigate],
  );

  const membros = data || [];

  const users =
    search.length > 0
      ? membros.filter(h => {
        const up = h.nome.toLocaleUpperCase();

        if (up.includes(search.toLocaleUpperCase()) && h.id !== user.id) {
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Header title="Consumo" />

      <Center>
        <Form>
          <Box>
            <Input
              autoCapitalize="characters"
              name="find"
              icon="search"
              onChangeText={setSearch}
            />
          </Box>
        </Form>
      </Center>

      <View>
        <FlatList
          contentContainerStyle={{ paddingBottom: 570 }}
          data={users}
          keyExtractor={h => h.id}
          renderItem={({ item: h }) => (
            <MembrosComponents
              star={h.media}
              icon="necociar"
              pres={() => hanldeTransaction(h)}
              userName={h.nome}
              user_avatar={h.profile.avatar}
              oficio={h.profile.workName}
              imageOfice={h.profile.logo}
            // inativoPres={h..inativo}
            // inativo={h.inativo}
            />
          )}
        />
      </View>
    </Container>
  );
}
