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
import React, { useCallback } from 'react';
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

export function Inicio() {

  const { user, updateUser } = useAuth();
  const { navigate } = useNavigation();
  const { indRank } = useData();

  const [permissionFingerprint, setPermissionFingerprinte] =
    React.useState(false);

  const [handshak, setHandshak] = React.useState(0)

  const [showModalSolicitations, setModalSolicitations] = React.useState(false);
  const [modalAtenction, setModalAtenction] = React.useState<boolean>(false)

  const version = Contants.default.expoConfig?.version;



  return (
    <S.Container>

      <ModalInfoPresenca openModal={false} />
      <ModalSolicitations openModal={true} />
      <ModalAtention openModal={false} />

      <Box flex={1}>
        <Header
          openMail={() => {
            navigate('SOLICITAÇÕES');
          }}
          openAtenction={() => setModalAtenction(true)}
          title="Home"
          orders={0}
        />

        <Center>
          <S.text style={{ fontFamily: 'medium', fontSize: _subTitle }}>
            {user.nome}
          </S.text>
          <S.text>{'empresa'}</S.text>
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

        {indRank.isLoading ? (
          <ActivityIndicator size={36} />
        ) : (
          <Classificacao />
        )}
      </Box>

      <Text>version: {version}</Text>
    </S.Container>
  );
}
