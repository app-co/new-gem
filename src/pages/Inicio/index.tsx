/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import * as Contants from 'expo-constants';
import {
  Avatar,
  Box,
  Center,
  Circle,
  HStack,
  Text,
  VStack,
  useToast,
} from 'native-base';
import React, { useCallback, useRef } from 'react';
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
import { useMetric } from '../../hooks/relations';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import { IsActiveFingerTokenStorage } from '../../storage/acitve-finger-token';
import { LocalAuthData } from '../../storage/local-auth-data';
import { _subTitle } from '../../utils/size';
import * as S from './styles';

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
  const ref = useRef<FormHandles>(null);
  const toast = useToast();
  const metric = useMetric();
  const { getSelfMetric, getGlobalMetric } = useMetricas()

  const { user, updateUser } = useAuth();
  const { navigate } = useNavigation();
  const { indRank } = useData();
  const { mytoken } = useToken();

  const [permissionFingerprint, setPermissionFingerprinte] =
    React.useState(false);

  const [handshak, setHandshak] = React.useState(0)

  const [showModalSolicitations, setModalSolicitations] = React.useState(false);
  const [modalPresenca, setModalPresenca] = React.useState(false);
  const [modalAtenction, setModalAtenction] = React.useState<boolean>(false)

  const version = Contants.default.expoConfig?.version;

  React.useEffect(() => {
    if (user.token !== mytoken) {
      api
        .patch('/user/update-membro', {
          token: user.membro,
          id: user.id,
        })
        .then(h => {
          updateUser();
        });
    }
  }, []);


  useFocusEffect(
    useCallback(() => {
      getSelfMetric.fetch()

      setHandshak(getSelfMetric.data?.handshak || 0)

    }, [handshak, getSelfMetric.data?.handshak]),
  );

  React.useEffect(() => {
    console.log(handshak)
    if (handshak > 0) {
      setModalSolicitations(true)
    } else {
      setModalSolicitations(false)
    }
  }, [handshak])


  // const handleSavePass = React.useCallback(
  //   async ({ pass }: { pass: string }) => {
  //     setLoad(true);
  //     const auth = {
  //       membro: user.membro,
  //       senha: pass,
  //     };

  //     try {
  //       await api.post('/user/session', auth);
  //       await isActiveFigerToken.setStorage({
  //         isActive: true,
  //       });

  //       await localAuthData.setStorage(auth);

  //       setLoad(false);
  //       setModalAuth(false);
  //     } catch (error) {
  //       setLoad(false);
  //       const erro = error instanceof AppError;

  //       if (erro) {
  //         Alert.alert('Erro ao validar sua senha', error.message);
  //       }
  //     }
  //   },
  //   [user.membro],
  // );


  if (getSelfMetric.isLoading) {
    return <Loading />;
  }

  return (
    <S.Container>
      <Modal transparent visible={false}>
        <Center flex={1}>
          <VStack
            p="8"
            borderRadius={4}
            space={4}
          >
            <S.title style={{ color: '#fff' }}>
              Sua presença está baixa : (
            </S.title>
            <S.subTitle style={{ color: '#fff' }}>
              Total de eventos do geb:
            </S.subTitle>

            <S.subTitle style={{ color: '#fff' }}>
              Suas presenças até o momento:
            </S.subTitle>
          </VStack>
        </Center>
      </Modal>

      <Modal visible={modalAtenction} >
        <Box justifyContent={'space-between'} py='10' flex='1' bg={theme.colors.bg_color[1]}>
          <VStack p='8' >
            <S.title style={{ fontFamily: 'bold', textAlign: 'center', color: theme.colors.focus[1], fontSize: RFValue(25) }} >Fique atento aos seus resultados</S.title>

            <Box mt='12' bg={theme.colors.bg_color[3]} p='3' rounded={8} >
              <S.title style={{ textAlign: 'center' }} >Presença</S.title>
              <HStack alignItems={'center'} justifyContent={'space-between'} >
                <Box>
                  <HStack w='150px' justifyContent={'space-between'} alignItems={'center'} >
                    <S.text>Suas presenças:</S.text>
                    <S.text style={{ color: theme.colors.focus[1] }} >{getSelfMetric.data?.totalPresence}</S.text>
                  </HStack>
                  <HStack w='154px' justifyContent={'space-between'} alignItems={'center'} >
                    <S.text>Total de encontros:</S.text>
                    <S.text style={{ color: theme.colors.focus[1] }} >{getSelfMetric.data?.IdealPresence} </S.text>
                  </HStack>
                </Box>

                <Circle size={'md'} bg='gray.600' >
                  <S.title style={{ fontSize: RFValue(16) }} >
                    {getSelfMetric.data?.satisfiedPresence}%
                  </S.title>
                </Circle>

              </HStack>
            </Box>

            <Box mt='12' bg={theme.colors.bg_color[3]} p='3' rounded={8} >
              <S.title style={{ textAlign: 'center' }} >Seus lançamentos</S.title>
              <HStack mt={4} justifyContent={'space-between'} >
                <Box>
                  <S.text>Geral:</S.text>
                  <S.text>Vendas:</S.text>
                  <S.text>Compensação:</S.text>
                </Box>

                <Box>
                  <S.text style={{ color: theme.colors.focus[1] }} >{getSelfMetric.data?.totalVendas}</S.text>
                  <S.text style={{ color: theme.colors.focus[1] }} >
                    {getSelfMetric.data?.currencyVendas}
                  </S.text>
                  <S.text style={{ color: theme.colors.focus[1] }} >
                    {getSelfMetric.data?.satisfiedPorcentege} %
                  </S.text>

                </Box>
              </HStack>
            </Box>
          </VStack>

          <Center>
            <Button pres={() => setModalAtenction(false)} title='FECHAR' />

          </Center>
        </Box>
      </Modal>
      {/* 
      <Modal visible={false}>
        <Center flex="1">
          <Text style={{ marginBottom: 20 }}>
            Deseja ativar acesso com sua biometria?
          </Text>

          <HStack space={8}>
            <TouchableOpacity
              onPress={() => setModalAuth(false)}
              style={{
                width: 130,
                alignItems: 'center',
                padding: 10,
                borderRadius: 10,
                backgroundColor: theme.colors.bg_button[1],
              }}
            >
              <Text style={{ color: '#fff', fontFamily: theme.fonts.bold }}>
                MAIS TARDE
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setPermissionFingerprinte(true)}
              style={{
                width: 130,
                alignItems: 'center',
                padding: 10,
                borderRadius: 10,
                backgroundColor: theme.colors.bg_button[1],
              }}
            >
              <Text style={{ color: '#fff', fontFamily: theme.fonts.bold }}>
                SIM
              </Text>
            </TouchableOpacity>
          </HStack>

          {permissionFingerprint && (
            <Form ref={ref} onSubmit={handleSavePass}>
              <Center mt="16">
                <Input icon="lock" placeholder="Digite sua senha" name="pass" />

                <TouchableOpacity
                  onPress={() => ref.current?.submitForm()}
                  style={{
                    width: 130,
                    alignItems: 'center',
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: theme.colors.bg_button[1],
                  }}
                >
                  {load ? (
                    <ActivityIndicator />
                  ) : (
                    <Text
                      style={{ color: '#fff', fontFamily: theme.fonts.bold }}
                    >
                      SALVAR
                    </Text>
                  )}
                </TouchableOpacity>
              </Center>
            </Form>
          )}
        </Center>
      </Modal> */}

      <Box flex={1}>
        <Header
          openMail={() => {
            navigate('SOLICITAÇÕES');
          }}
          openAtenction={() => setModalAtenction(true)}
          title="Home"
          orders={getSelfMetric.data?.handshak}
        />

        <Modal
          animationType="fade"
          visible={showModalSolicitations}
          transparent
        >
          <Center flex={1}>
            <Box p="16" bg={theme.colors.bg_color[3]} borderRadius={8}>
              <S.title style={{ textAlign: 'center' }}>
                Voce tem negócios para aprovar
              </S.title>
              <HStack space={8} mt="4">
                <TouchableOpacity
                  onPress={() => setModalSolicitations(false)}
                  style={{
                    padding: 8,
                    backgroundColor: theme.colors.button.bg.reproved,
                    borderRadius: 8,
                  }}
                >
                  <S.text style={{ color: theme.colors.color_text.dark }}>
                    APROVAR DEPOIS
                  </S.text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalSolicitations(false);
                    setHandshak(0)
                    navigate('SOLICITAÇÕES');
                  }}
                  style={{
                    padding: 8,
                    backgroundColor: theme.colors.button.bg.approved,
                    borderRadius: 8,
                  }}
                >
                  <S.text style={{ color: theme.colors.color_text.dark }}>
                    APROVAR AGORA
                  </S.text>
                </TouchableOpacity>
              </HStack>
            </Box>
          </Center>
        </Modal>

        <Center>
          <S.text style={{ fontFamily: 'medium', fontSize: _subTitle }}>
            {user.nome}
          </S.text>
          <S.text>{user.profile.workName}</S.text>
        </Center>

        <HStack space={10} justifyContent="center" my="4" alignItems="center">
          <Avatar size="xl" source={{ uri: user?.profile.avatar }} />

          <Box w="1" bg="#bebebe" h="full" />

          <Box alignItems="flex-end">
            <S.text>Vendas este ano:</S.text>
            <S.text style={{ fontSize: _subTitle, fontFamily: 'medium' }}>
              {getSelfMetric.data?.currencyVendas}
            </S.text>

            <S.text>Meus pontos:</S.text>
            <S.text style={{ fontSize: _subTitle, fontFamily: 'medium' }}>
              {getSelfMetric.data?.totalPonts}
            </S.text>
          </Box>
        </HStack>

        <Center>
          <HStack space={2} alignItems="center">
            <S.text style={{ fontSize: _subTitle }}>Total geral:</S.text>
            <S.text style={{ fontSize: _subTitle, fontFamily: 'medium' }}>
              {getGlobalMetric.data?.consumoTotal}
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
