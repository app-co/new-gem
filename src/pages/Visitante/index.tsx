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
import theme from '../../global/styles/club-mentoria';
import { useAuth } from '../../hooks/useAuth';
import * as S from './styles';
import { make } from '../../hooks';
import { Loading } from '../../components/Loading';
import { colors } from '../../global/hub-colors';

const { querys, mutations } = make()

export function Visitante() {
  const { user } = useAuth();
  const [selected, setSelected] = React.useState('approveded');
  const [showModal, setShowModa] = React.useState(false);
  const [name_convidado, setNameConvidado] = React.useState('');

  const { data, isLoading } = querys.useRelationsMetricasUser()
  const { mutateAsync, isLoading: load } = mutations.registerRelation()

  const aprovados = data?.aprovaded.CONVITES
  const pendentes = data?.notAprovaded.CONVITES

  async function handleAdd() {
    try {
      await mutateAsync({
        user_id: user.id,
        hub: user.hub[0],
        type: 7,
        objeto: {
          nomeConvidado: name_convidado,
          nome: user.nome
        },
      })
      setShowModa(false)
    } catch (error) {

    }
  }

  if (isLoading) return <Loading />


  return (
    <S.Container>
      <Header />
      <Modal onRequestClose={() => setShowModa(false)} visible={showModal} transparent >

        <Center mt={'70%'}>
          <Box rounded={8} p={4} bg={colors.bg_color[1]}>

            <Form>
              <Input
                onChangeText={setNameConvidado}
                placeholder="Nome do convidado"
                name="name"
                value={name_convidado}
              />

              <Center mt='8' >
                <Button pres={handleAdd} loading={load} title="SALVAR" />

              </Center>

            </Form>
          </Box>
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
            data={aprovados}
            renderItem={({ item: h }) => (
              <Box
                bg={
                  selected === 'approveded' ? theme.colors.bg_color[3] : 'gray.300'
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
                <S.text>{h.objeto.nomeConvidado}</S.text>

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
            data={pendentes}
            renderItem={({ item: h }) => (
              <Box bg="gray.500" mt={2} p={3}>
                <S.title
                  style={{
                    fontFamily: theme.fonts.regular,
                    fontSize: RFValue(16),
                  }}
                >
                  Nome do convidado
                </S.title>
                <S.text>{h.objeto.nomeConvidado}</S.text>
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


      </Box>

      <Box pb={5}>
        <Center>
          <Button pres={() => setShowModa(true)} title="ADICIONAR CONVIDADO" />
        </Center>
      </Box>
    </S.Container>
  );
}
