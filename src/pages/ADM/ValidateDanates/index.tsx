/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useFocusEffect } from '@react-navigation/native';
import { format } from 'date-fns';
import { Box, Center, FlatList, HStack } from 'native-base';
import React, { useCallback } from 'react';
import { ActivityIndicator } from 'react-native';

import { Header } from '../../../components/Header';
import { useRelation } from '../../../contexts/relation';
import { useData } from '../../../contexts/useData';
import { IRelashionship, IUserDtos } from '../../../dtos';
import theme from '../../../global/styles/club-mentoria';
import { api } from '../../../services/api';
import * as S from './styles';

export function ValidateDanates() {
  const { listAllRelation } = useRelation();
  const { users } = useData();
  const [load, setLoad] = React.useState('');

  const list = React.useMemo(() => {
    const donates = (listAllRelation.data as IRelashionship[]) || [];
    const donate = donates.filter(
      h => h.situation === false && h.type === 'DONATE',
    );
    const us = (users.data as IUserDtos[]) || [];
    const li: any[] = [];

    donate.forEach(dn => {
      const nome = us.find(h => h.id === dn.fk_user_id);

      const dt = {
        ...dn,
        date: format(new Date(dn.created_at!), 'dd/MM/yy'),
        nome: nome?.nome || '',
      };
      li.push(dt);
    });

    return li;
  }, [listAllRelation.data, users.data]);

  const handleAproved = React.useCallback(async (id: string) => {
    setLoad(id);

    try {
      await api.put('/relation-update', {
        id,
        situation: true,
      });

      setLoad('');
      listAllRelation.refetch();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleReprove = React.useCallback(async (id: string) => {
    try {
      setLoad(id);
      await api.delete(`/relation-delete/${id}`);
      listAllRelation.refetch();
    } catch (err) {
      setLoad('');

      console.log(err?.response);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      listAllRelation.refetch();
      users.refetch();
    }, []),
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
        <Center>
          <S.title style={{ color: theme.colors.focus[1] }}>
            Ainda não há donativos
          </S.title>
        </Center>
      )}

      <FlatList
        data={list}
        keyExtractor={h => String(h.id)}
        renderItem={({ item: h }) => (
          <Box px="4" mt="1" bg={theme.colors.bg_color[3]} borderRadius="8" py="4">
            <HStack mb="2" justifyContent="space-between" alignItems="center">
              <S.title>{h.nome}</S.title>
              <S.title>{h.data}</S.title>
            </HStack>

            <HStack space={2} alignItems="center" m="4">
              <S.title>ITENS: </S.title>
              {h.objto.itens.map(p => (
                <S.text>{p.item}</S.text>
              ))}
            </HStack>

            <Center>
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
