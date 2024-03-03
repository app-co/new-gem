/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import { useFocusEffect } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useCallback, useState } from 'react';
import { Alert, FlatList, TouchableOpacity } from 'react-native';

import { Avatar, Box, Center, HStack, VStack } from 'native-base';
import { Header } from '../../../components/Header';
import { Loading } from '../../../components/Loading';
import { useRelation } from '../../../contexts/relation';
import { useData } from '../../../contexts/useData';
import {
  IPresensaRelation, IUserDtos
} from '../../../dtos';
import theme from '../../../global/styles/club-mentoria';
import { api } from '../../../services/api';
import * as S from './styles';

export interface ProsPresenca {
  createdAt: string;
  id: string;
  presenca: boolean;
  user_id: string;
  nome: string;
  avatar: string;
  data: string;
}

export function ListPresenca() {
  const { users } = useData();
  const [presenca, setPresenca] = useState<any[]>([]);
  const [load, setLoad] = React.useState(true);
  const { listAllRelation } = useRelation();

  const presendaData = (listAllRelation.data as IPresensaRelation[]) || [];

  const listAll = presendaData.filter(h => {
    if (h.situation === false && h.type === 'PRESENCA') {
      return h;
    }
  }) as IPresensaRelation[];


  const listUsers: IUserDtos[] = users.data ?? []

  const list = React.useMemo(() => {

    return listAll.map(respo => {
      const name = listUsers.find(h => h.id === respo.fk_user_id)
      console.log()
      return {
        ...respo,
        name: name?.nome ?? '',
        data: format(new Date(respo.created_at), 'dd/MM/yy'),
      };
    });
  }, [listAll]);


  useFocusEffect(
    useCallback(() => {
      listAllRelation.refetch();
    }, []),
  );

  const handleValidatePresensa = useCallback(async (id: string) => {
    setLoad('');

    const dados = {
      id,
      situation: true,
    };

    await api
      .put('/relation-update', dados)
      .then(() => {
        listAllRelation.refetch();
      })
      .catch(h => Alert.alert('Erro', h.response.data));
  }, []);

  const handleDescartar = useCallback(
    async (id: string) => {
      await api
        .delete(`/relation-delete/${id}`)
        .then(h => {
          Alert.alert('', 'presensa cancelada');
          listAllRelation.refetch();
        })
        .catch(h => {
          console.log(h);
        });
    },
    [listAllRelation],
  );


  if (listAllRelation.isLoading) {
    return <Loading />;
  }

  return (
    <S.Container>
      <Header />
      <FlatList
        contentContainerStyle={{
          paddingBottom: 200,
        }}
        data={list}
        keyExtractor={h => h.id!}
        renderItem={({ item: h }) => (
          <Box key={h.id} m={2} rounded={8} borderColor={'gray.500'} borderWidth={1} >
            <HStack alignItems={'center'} space={8} p='4'>
              <Avatar size={'lg'} />

              <VStack space={6} >
                <Center>
                  <S.Title>{h.name}</S.Title>

                </Center>

                <HStack space={8} >
                  <TouchableOpacity onPress={() => handleDescartar(h.id)} >
                    <Center>
                      <S.Title>REJEITAR</S.Title>
                    </Center>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleValidatePresensa(h.id)} >
                    <Center>
                      <S.Title style={{ color: theme.colors.focus[1], fontFamily: 'bold' }} >APROVAR</S.Title>
                    </Center>
                  </TouchableOpacity>

                </HStack>
              </VStack>

            </HStack>
          </Box>
        )}
      />
    </S.Container>
  );
}
