/* eslint-disable camelcase */
import { useFocusEffect } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { format } from 'date-fns';
import { Box, Center, FlatList, HStack } from 'native-base';
import React, { useCallback } from 'react';
import { ActivityIndicator, Alert, Modal } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Inputs';
import { useRelation } from '../../contexts/relation';
import { useToken } from '../../contexts/Token';
import { IInviteRelation } from '../../dtos';
import theme from '../../global/styles/club-mentoria';
import { useAuth } from '../../hooks/useAuth';
import { useAllUsers } from '../../hooks/user';
import { api } from '../../services/api';
import { routesScheme } from '../../services/schemeRoutes';
import * as S from './styles';

export function Visitante() {
  const { user } = useAuth();
  const { mytoken, sendMessage } = useToken();
  const { listAllRelation } = useRelation();
  const { data, isLoading, refetch } = useAllUsers(user.hub);
  const adms = data || [];
  const [selected, setSelected] = React.useState('approveded');
  const [showModal, setShowModa] = React.useState(false);
  const [name_convidado, setNameConvidado] = React.useState('');


  const relation = (listAllRelation.data as IInviteRelation[]) || [];
  const invitPending = relation.filter(
    h =>
      h.type === 'INVIT' && h.situation === false && h.fk_user_id === user.id,
  );

  const invitAproved = relation.filter(
    h => h.type === 'INVIT' && h.situation === true && h.fk_user_id === user.id,
  );

  const handleSave = React.useCallback(async () => {
    const adm = adms.filter(h => h.adm === true).map(h => h.token);

    try {
      await api
        .post(routesScheme.relationShip.create, {
          objto: {
            name_convidado,
            token: mytoken,
          },
          type: 'INVIT',
          token: '',
        })
        .then(h => {
          console.log(h.data);
          adm.forEach(async h => {
            console.log(h);
            await sendMessage({
              text: 'convidado',
              title: 'Novo convidado',
              token: h,
            });
          });

          Alert.alert(
            'Show!',
            'Convidados são importantes para aumentar as relações de negócios',
          );
          setShowModa(false);
          listAllRelation.refetch();
        });
    } catch (err: any) {
      console.log(err?.response.data);
    }
  }, [adms, listAllRelation, name_convidado, sendMessage]);

  useFocusEffect(
    useCallback(() => {
      listAllRelation.refetch();
      refetch();
    }, []),
  );

  if (listAllRelation.isLoading) {
    return (
      <Center flex="1">
        <ActivityIndicator size={40} />
      </Center>
    );
  }

  return (
    <S.Container>
      <Header />
      <Modal visible={showModal}>
        <Center bg={theme.colors.bg_color[1]} flex="1">
          <Form>
            <Input
              onChangeText={setNameConvidado}
              placeholder="Nome do convidado"
              name="name"
              value={name_convidado}
            />

            <Button pres={handleSave} title="SALVAR" />
          </Form>
        </Center>
      </Modal>

      <Box flex="1">
        <HStack mt={8} w="full" justifyContent="space-evenly">
          <Center>
            <S.buttonType
              onPress={() => setSelected('approveded')}
              selected={selected === 'approveded'}
            >
              <S.textButon>Confirmados</S.textButon>
            </S.buttonType>
          </Center>

          <Center>
            <S.buttonType
              onPress={() => setSelected('pendent')}
              selected={selected === 'pendent'}
            >
              <S.textButon>Pendente</S.textButon>
            </S.buttonType>
          </Center>
        </HStack>

        {selected === 'approveded' && (
          <FlatList
            data={invitAproved}
            renderItem={({ item: h }) => (
              <Box
                bg={
                  selected === 'approveded' ? theme.colors.focus[1] : 'gray.300'
                }
                mt={2}
                p={5}
              >
                <S.title
                  style={{
                    fontFamily: theme.fonts.bold,
                    fontSize: RFValue(16),
                  }}
                >
                  Nome do convidado
                </S.title>
                <S.text>{h.objto.name_convidado}</S.text>

                <S.title
                  style={{
                    fontFamily: theme.fonts.bold,
                    fontSize: RFValue(16),
                    marginTop: 8,
                  }}
                >
                  Data de aprovação
                </S.title>
                <S.text>
                  {format(new Date(h.updated_at), 'dd/MM/yy - HH:mm')}
                </S.text>
              </Box>
            )}
          />
        )}

        {selected === 'pendent' && (
          <FlatList
            mt="3"
            data={invitPending}
            renderItem={({ item: h }) => (
              <Box bg="gray.300" mt={2} p={3}>
                <S.title
                  style={{
                    fontFamily: theme.fonts.regular,
                    fontSize: RFValue(16),
                  }}
                >
                  Nome do convidado
                </S.title>
                <S.text>{h.objto.name_convidado}</S.text>
                <S.title
                  style={{
                    fontFamily: theme.fonts.Regular,
                    fontSize: RFValue(16),
                    marginTop: 8,
                  }}
                >
                  Dia que foi convidado
                </S.title>
                <S.text>{format(new Date(h.created_at), 'dd/MM/yy')} </S.text>
              </Box>
            )}
          />
        )}

        {invitAproved.length === 0 && selected === 'approveded' && (
          <Center flex="1">
            <S.title>Você ainda não tem convidados</S.title>
          </Center>
        )}

        {invitPending.length === 0 && selected === 'pendent' && (
          <Center flex="1">
            <S.title>Você ainda não tem convidados</S.title>
          </Center>
        )}
      </Box>

      <Box pb={5}>
        <Center>
          <Button pres={() => setShowModa(true)} title="ADICIONAR CONVIDADO" />
        </Center>
      </Box>
    </S.Container>
  );
}
