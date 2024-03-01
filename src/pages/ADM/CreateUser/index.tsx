/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable no-multi-assign */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { Box, Center } from 'native-base';
import React, { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  TouchableOpacity,
  View,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import * as Yup from 'yup';

import { Button } from '../../../components/Button';
import { Header } from '../../../components/Header';
import { Input } from '../../../components/Inputs';
import { MembroLista } from '../../../components/MembroLista';
import { useData } from '../../../contexts/useData';
import { IUserDtos } from '../../../dtos';
import { useAuth } from '../../../hooks/useAuth';
import { api } from '../../../services/api';
import getValidationErrors from '../../../utils/getValidationsErrors';
import * as S from './styles';

interface FormData {
  nome: string;
  workName: string;
  membro: string;
  senha: string;
  whats: string;
  CNPJ: string;
  email: string;
  ramo: string;
  enquadramento: string;
  CPF: string;
  adm: true;
}

const hubList = ['GEB', 'CLUB_MENTORIA'];

export function SingUp() {
  const { navigate } = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const { user } = useAuth();
  const { users } = useData();

  const [loading, setLoading] = React.useState(false);

  const [adm, setAdm] = useState(false);
  const [idAdm, setIsAdm] = useState('user');

  // TODO MODAL
  const [enquadramento, setEnquadramento] = useState('');
  const [ramo, setRamo] = useState('');
  const [modalUser, setModalUser] = useState(false);
  const [idUserModal, setIdUserModal] = useState('');
  const [nomeUserModa, setNomeUserModal] = useState('');
  const modalizeRefRamo = useRef<Modalize>(null);
  const modalizeRefEnquadramento = useRef<Modalize>(null);
  const [isOpenHub, setIsOpenHub] = React.useState<boolean>(false);
  const [hub, setHub] = React.useState<string>('');

  const OpenModalUser = useCallback(() => {
    setModalUser(true);
  }, []);

  const CloseModalUser = useCallback((id: string, nome: string) => {
    setIdUserModal(id);
    setNomeUserModal(nome);
    setModalUser(false);
  }, []);

  // TODO RESTO

  const te = useCallback(() => {
    console.log('teset');
  }, []);

  const handleSubmit = useCallback(
    async (data: any) => {
      console.log(data);

      try {
        formRef.current?.setErrors({});

        if (!hub) {
          Alert.alert('Escolha um hub para cadastro');
        }

        const shema = Yup.object().shape({
          nome: Yup.string().required('Nome obrigatorio'),
          membro: Yup.string().required('membro obrigatório'),
          senha: Yup.string().min(4, 'Senha no minimo 6 digitos'),
        });

        await shema.validate(data, {
          abortEarly: false,
        });

        const dados = {
          ...data,
          hub,
          adm,
        };

        await api
          .post('/user/create-user', dados)
          .then(h => {
            Alert.alert('Usuário cadastrado');
            navigate('INÍCIO');
          })
          .catch(h => {
            console.log('erro para criar usuario', h);
            Alert.alert('Erro', h.response.data.message);
          });
      } catch (err: any) {
        console.log('erro ao criar usuario', err);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          Alert.alert('Cadastro', err.message);
        }
      }
    },
    [adm, enquadramento, idUserModal, navigate, nomeUserModa, ramo, hub],
  );

  const handleAdm = useCallback(() => {
    setAdm(true);
    setIsAdm('adm');
  }, []);

  const handleUser = useCallback(() => {
    setAdm(false);
    setIsAdm('user');
  }, []);

  const listUser = (users.data as IUserDtos[]) || [];

  useFocusEffect(
    useCallback(() => {
      users.refetch();
    }, []),
  );

  if (users.isLoading) {
    return (
      <Center flex="1">
        <ActivityIndicator />
      </Center>
    );
  }

  return (
    <S.Container>
      <Header />

      <Modal animationType="fade" visible={modalUser}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={listUser}
            keyExtractor={h => h.id}
            renderItem={({ item: h }) => (
              <MembroLista
                closeModal={() => CloseModalUser(h.id, h.nome)}
                nome={h.nome}
                avatar={h.profile.avatar}
              />
            )}
          />
        </View>
      </Modal>

      <Modal animationType="fade" visible={isOpenHub}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={hubList}
            keyExtractor={h => h}
            renderItem={({ item: h }) => (
              <TouchableOpacity
                onPress={() => {
                  setHub(h);
                  setIsOpenHub(false);
                }}
              >
                <Box mt="2" p="4" bg="gray.700">
                  <S.Title style={{ fontSize: 20 }}>{h}</S.Title>
                </Box>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          marginBottom: 10,
          marginTop: 20,
        }}
      >
        <S.Title>adm</S.Title>
        <S.BoxAdm isAdm={idAdm === 'adm'} onPress={handleAdm} />
        <S.Title style={{ marginLeft: 40 }}>usuário</S.Title>
        <S.BoxAdm isAdm={idAdm === 'user'} onPress={handleUser} />
      </View>

      <S.BxPadrinho onPress={OpenModalUser}>
        {nomeUserModa ? (
          <S.Title>padrinho: {nomeUserModa} </S.Title>
        ) : (
          <S.Title>Escolher padrinho</S.Title>
        )}
      </S.BxPadrinho>

      <S.Bxub onPress={() => setIsOpenHub(true)}>
        {hub ? <S.Title>{hub} </S.Title> : <S.Title>Escolha um HUB</S.Title>}
      </S.Bxub>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <S.Box>
          <View>
            <S.TextInpu>NOME COMPLETO</S.TextInpu>
            <Input name="nome" icon="user" />
          </View>

          <View>
            <S.TextInpu>MEMBRO</S.TextInpu>
            <Input name="membro" icon="user" />
          </View>

          <View>
            <S.TextInpu>SENHA</S.TextInpu>
            <Input name="senha" autoCapitalize="none" icon="user" />
          </View>
        </S.Box>
        <Center p="2" alignSelf="center" mt="10" w="200">
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <Button
              pres={() => formRef.current?.submitForm()}
              title="CADASTRAR"
            />
          )}
        </Center>
      </Form>
    </S.Container>
  );
}
