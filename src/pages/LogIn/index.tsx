/* eslint-disable @typescript-eslint/no-explicit-any */

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { Text } from 'native-base';
import React, { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';

// import { Input } from "../../components/Inputs";
import logo from '../../assets/logo.png';
import { useAuth } from '../../hooks/useAuth';
import { IsActiveFingerTokenStorage } from '../../storage/acitve-finger-token';
import { LocalAuthData } from '../../storage/local-auth-data';
import { version } from '../../utils/updates';
import { BoxInput, BoxLogo, Container, Logo } from './styles';
import { FormInput } from '../../components/forms/FormInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { validation } from '../../hooks/dto/validations';
import { TSession } from '../../hooks/dto/types';
import { Button } from '../../components/forms/Button';
import { make } from '../../hooks';
const authStorage = new LocalAuthData();
const isActiveFingerToken = new IsActiveFingerTokenStorage();


export function SingIn() {
  const { mutations } = make()

  const { login, loading } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const [load, setLoad] = React.useState<boolean>(false)

  const { control, handleSubmit: submit, formState: { errors } } = useForm<TSession>({
    resolver: zodResolver(validation.session),
    mode: 'onChange'
  })

  const handleSubmit = useCallback(async (obj: TSession) => {
    await login(obj);
    setLoad(false)
    console.log('error');

  }, []);


  return (
    <Container behavior="padding">
      <Text
        style={{
          alignSelf: 'flex-end',
          // color: theme.colors.bg_color[1],
          fontSize: 12,
          marginRight: 20,
          top: 30,
        }}
      >
        version: {version}
      </Text>
      <BoxLogo>
        <Logo source={logo} />
      </BoxLogo>

      <BoxInput>
        <FormInput
          name='apelido'
          control={control}
          error={errors.apelido}
          placeholder='Usuario'
          autoCapitalize='none'
        />

        <FormInput
          name='senha'
          control={control}
          error={errors.senha}
          placeholder='Sua senha'
          secureTextEntry
        />

        <Button loading={load} disabled={load} pres={submit(handleSubmit)} title="ENTRAR" />
      </BoxInput>
    </Container>
  );
}
