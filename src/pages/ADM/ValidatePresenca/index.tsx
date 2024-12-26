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



  const handleValidatePresensa = useCallback(async (id: string) => {

  }, []);

  const handleDescartar = useCallback(
    async (id: string) => {

    }, []);


  if (false) {
    return <Loading />;
  }

  return (
    <S.Container>
      <Header />
      <FlatList
        contentContainerStyle={{
          paddingBottom: 200,
        }}
        data={[]}
        keyExtractor={h => h?.id!}
        renderItem={({ item: h }) => (
          <Box key={h?.id} m={2} rounded={8} borderColor={'gray.500'} borderWidth={1} >
            <HStack alignItems={'center'} space={8} p='4'>
              <Avatar size={'lg'} />

              <VStack space={6} >
                <Center>
                  <S.Title>{h?.name}</S.Title>
                  <S.Title>{h?.data}</S.Title>

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
