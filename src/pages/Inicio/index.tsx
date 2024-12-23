/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as Contants from 'expo-constants';
import {
  Avatar,
  Box,
  Center,
  Circle,
  HStack,
  Text,
  VStack
} from 'native-base';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Modal, TouchableOpacity } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import { Button } from '../../components/Button';
import { Classificacao } from '../../components/Classificacao';
import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { useToken } from '../../contexts/Token';
import { useMetricas } from '../../contexts/metricas';
import { useData } from '../../contexts/useData';
import { IRelashionship } from '../../dtos';
import theme from '../../global/styles/club-mentoria';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import { IsActiveFingerTokenStorage } from '../../storage/acitve-finger-token';
import { LocalAuthData } from '../../storage/local-auth-data';
import { _subTitle } from '../../utils/size';
import * as S from './styles';
import { ModalSolicitations } from '../../components/modals/ModalSolicitations';
import { ModalAtention } from '../../components/modals/ModalAtention';
import { ModalInfoPresenca } from '../../components/modals/InfoPresenca';
import { make } from '../../hooks';
import { TextStyle } from '../../components/forms/topograph';
import { colors } from '../../global/hub-colors';

const isActiveFigerToken = new IsActiveFingerTokenStorage();
const localAuthData = new LocalAuthData();

interface IResponse {
  presenca: IRelashionship[];
}

const variationPresensa: any = {
  5: '#f5e346',
  6: '#f5e346',
  7: '#f8973d',
  8: '#f8973d',
  9: '#f8973d',
  10: '#ee3c3c',
};

const { querys } = make()

export function Inicio() {

  const { user, updateUser } = useAuth();
  const { navigate } = useNavigation();

  const [modalAtenction, setModalAtenction] = useState(false)

  const { data: relationsReceptor = [], isLoading } = querys.relationForAprovation()

  const aprovation = relationsReceptor.length > 0

  const version = Contants.default.expoConfig?.version;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <S.Container>

      <ModalInfoPresenca openModal={false} />
      <ModalSolicitations openModal={aprovation} />
      <ModalAtention openModal={modalAtenction} />

      <Box flex={1}>
        <Header
          openMail={() => {
            navigate('SOLICITAÇÕES');
          }}
          openAtenction={() => setModalAtenction(true)}
          title="Home"
          orders={relationsReceptor.length}
        />

        <Center>
          <S.text style={{ fontFamily: 'medium', fontSize: _subTitle }}>
            {user.nome}
          </S.text>
          <TextStyle colorText={colors.alert[0]} type='defaultSemiBold' >{user?.profile?.workName}</TextStyle>
        </Center>

        <HStack space={10} justifyContent="center" my="4" alignItems="center">
          <Avatar size="xl" />

          <Box w="1" bg="#bebebe" h="full" />

          <Box alignItems="flex-end">
            <S.text>Vendas este ano:</S.text>
            <S.text style={{ fontSize: _subTitle, fontFamily: 'medium' }}>
              {0}
            </S.text>

            <S.text>Meus pontos:</S.text>
            <S.text style={{ fontSize: _subTitle, fontFamily: 'medium' }}>
              {0}
            </S.text>
          </Box>
        </HStack>

        <Center>
          <HStack space={2} alignItems="center">
            <S.text style={{ fontSize: _subTitle }}>Total geral:</S.text>
            <S.text style={{ fontSize: _subTitle, fontFamily: 'medium' }}>
              {0}
            </S.text>
          </HStack>
        </Center>

        <S.Line />

        <Classificacao />
      </Box>

      <Text>version: {version}</Text>
    </S.Container>
  );
}
