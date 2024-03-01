/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useFocusEffect } from '@react-navigation/native';
import { format } from 'date-fns';
import { Box, Center, FlatList, HStack } from 'native-base';
import React, { useCallback } from 'react';
import { ActivityIndicator } from 'react-native';

import { Header } from '../../../components/Header';
import { useRelation } from '../../../contexts/relation';
import { useData } from '../../../contexts/useData';
import { IInviteRelation, IRelashionship, IUserDtos } from '../../../dtos';
import theme from '../../../global/styles/club-mentoria';
import { api } from '../../../services/api';
import * as S from './styles';

export function ValidateGuest() {
  const { users } = useData();
  const { listAllRelation } = useRelation();
  const [load, setLoad] = React.useState('');

  const list = React.useMemo(() => {
    const guestL = (listAllRelation.data as IRelashionship[]) || [];
    const gues = guestL.filter(
      h => h.type === 'INVIT' && h.situation === false,
    );

    console.log(gues)
    const usersL = (users.data as IUserDtos[]) || [];
    const li: IInviteRelation[] = [];

    gues.forEach(dn => {
      const us = usersL.find(h => h.id === dn.fk_user_id);

      if (us) {
        const dt = {
          ...dn,
          date: format(new Date(dn.created_at!), 'dd/MM/yy'),
          nome: us.nome,
        };
        li.push(dt);
      }
    });

    return li;
  }, [listAllRelation.data, users.data]);

  const handleAproved = React.useCallback(async (id: string) => {
    try {
      setLoad(id);
      await api.put('/relation-update', {
        id,
        situation: true,
      });
      setLoad('');
    } catch (error) {
      setLoad('');
      console.log(error);
    }
  }, []);

  const handleReprove = React.useCallback(async (id: string) => {
    try {
      setLoad(id);

      await api.delete(`/relation-delete/${id}`);
      setLoad('');
    } catch (error) {
      setLoad('');
      console.log(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      listAllRelation.refetch();
    }, [listAllRelation]),
  );

  if (listAllRelation.isLoading) {
    <Center bg="gray.700" flex="1">
      <ActivityIndicator size={40} color={theme.colors.focus[1]} />
    </Center>;
  }

  return (
    <S.Container>
      <Header />

      {list.length === 0 && (
        <Center flex="1">
          <S.title style={{ color: theme.colors.focus[1] }}>
            Lista de convidados vazia
          </S.title>
        </Center>
      )}

      <FlatList
        data={list}
        keyExtractor={h => String(h.id)}
        renderItem={({ item: h }) => (
          <Box px="4" mt="1" bg={theme.colors.focus[2]} borderRadius="8" py="4">
            <HStack mb="2" justifyContent="space-between" alignItems="center">
              <S.title>{h.nome}</S.title>
              <S.title>{h.data}</S.title>
            </HStack>

            <Box m="4">
              <S.text>Convidado</S.text>
              <S.title>{h.objto.name_convidado}</S.title>
            </Box>

            <Center mt="4">
              <HStack space={20}>
                <S.reprovedButon onPress={() => handleReprove(h.id!)}>
                  {load === h.id ? (
                    <ActivityIndicator />
                  ) : (
                    <S.text>RECUSAR</S.text>
                  )}
                </S.reprovedButon>

                <S.approvedButon onPress={() => handleAproved(h.id!)}>
                  {load === h.id ? (
                    <ActivityIndicator />
                  ) : (
                    <S.text>APROVAR</S.text>
                  )}
                </S.approvedButon>
              </HStack>
            </Center>
          </Box>
        )}
      />
    </S.Container>
  );
}
