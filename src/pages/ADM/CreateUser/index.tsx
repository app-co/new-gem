/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable no-multi-assign */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { Box, Center, HStack, VStack } from 'native-base';
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
import { useData } from '../../../contexts/useData';
import { IUserDtos } from '../../../dtos';
import { useAuth } from '../../../hooks/useAuth';
import { api } from '../../../services/api';
import getValidationErrors from '../../../utils/getValidationsErrors';
import * as S from './styles';
import { InputForm } from '../../../components/forms/InputForm';
import { useForm } from 'react-hook-form';
import { TUser } from '../../../hooks/dto/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { validation } from '../../../hooks/dto/validations';
import { FormInput } from '../../../components/forms/FormInput';
import { TextStyle } from '../../../components/forms/topograph';
import { InputSelect } from '../../../components/forms/input-select';
import { make } from '../../../hooks';
import { Loading } from '../../../components/Loading';
import Toast from '../../../components/toast/handler';

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

const { querys, mutations } = make()

export function SingUp() {
  const { navigate, goBack } = useNavigation();

  const [userSelected, setUserSelected] = React.useState()

  const { data, isLoading, fetchNextPage } = querys.useUserByHub({
    nome: '',
    hub: '0,1'
  })

  const { mutateAsync, isLoading: loadSaveUser } = mutations.registerUser()

  const users = data?.pages.flatMap(h => h.records) ?? []

  const { control, formState: { errors }, setValue, handleSubmit: submit } = useForm<TUser>({
    resolver: zodResolver(validation.user.omit({ id: true })),
    mode: 'onChange',
  })

  console.log(errors)

  const handleSubmit = useCallback(
    async (obj: Omit<TUser, 'id'>) => {
      try {
        await mutateAsync(obj)
        Toast.show({
          description: 'Usuário cadastrado com sucesso',
          title: "Cadastro",
          tipo: 'success'
        })
        goBack()
      } catch (error) {

      }
    },
    [],
  );

  React.useEffect(() => {
    if (userSelected) {
      setValue('apadrinhado', true)
    }

    if (!userSelected) {
      setValue('apadrinhado', false)
    }
  }, [])


  if (isLoading) return <Loading />


  return (
    <S.Container>
      <Header />


      <S.boxForm>
        <TextStyle type='title' style={{ marginBottom: 30 }} >Castro de Membro</TextStyle>

        <FormInput
          name='nome'
          placeholder='Nome do membro'
          control={control}
          error={errors.nome}
        />


        <FormInput
          name='apelido'
          placeholder='Apelido para o acesso'
          control={control}
          error={errors.apelido}
        />


        <FormInput
          name='senha'
          placeholder='senha'
          control={control}
          error={errors.senha}
        />

        <HStack alignItems={'center'} justifyContent={'space-between'} space={3} >

          <Box flex={1} >
            <InputForm
              name='hub'
              control={control}
              error={errors.hub}
              render={({ value, onChange }) => (
                <InputSelect
                  options={[{ value: '0', label: 'GEB Networking' }, { value: '1', label: 'CLUB da Mentoria' }]}
                  isMultiple
                  onChange={h => onChange(h.map(h => Number(h.value)))}
                  value={value ?? []}
                  label='Selecione um Hub'
                />

              )}
            />
          </Box>

          <Box flex={1} >
            <InputForm
              name='apadrinhado'
              control={control}
              error={errors.apadrinhado}
              render={({ value, onChange }) => (
                <InputSelect
                  options={users.map(h => ({ value: h.id, label: h.nome }))}
                  onChange={h => setUserSelected(h)}
                  nexPage={fetchNextPage}
                  value={userSelected}
                  label='Selecione um Padrinho'
                />

              )}
            />
          </Box>
        </HStack>


        <Center mt={8}>
          <Button loading={isLoading} title='Salvar' pres={submit(handleSubmit)} />
        </Center>


      </S.boxForm>
    </S.Container>
  );
}
