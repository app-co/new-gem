/* eslint-disable @typescript-eslint/no-explicit-any */

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { Text } from 'native-base';
import React, { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';

// import { Input } from "../../components/Inputs";
import logo from '../../assets/logo.png';
import { Button } from '../../components/Button';
import { Input } from '../../components/Inputs';
import { useAuth } from '../../hooks/useAuth';
import { IsActiveFingerTokenStorage } from '../../storage/acitve-finger-token';
import { LocalAuthData } from '../../storage/local-auth-data';
import { version } from '../../utils/updates';
import { BoxInput, BoxLogo, Container, Logo } from './styles';

const authStorage = new LocalAuthData();
const isActiveFingerToken = new IsActiveFingerTokenStorage();

export function SingIn() {
  const { login, loading } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const [load, setLoad] = React.useState<boolean>(false)

  const [membro, setMembro] = useState('');
  const [pass, setPass] = useState('');
  const [authencationStatus, setAuthenticationStatus] = React.useState<
    boolean | null
  >(null);

  const handleSubmit = useCallback(async () => {
    setLoad(true)
    await login({
      membro,
      senha: pass,
    });
    setLoad(false)
    console.log('error');

  }, [membro, pass, login]);

  // React.useEffect(() => {
  //   async function Auth() {
  //     const isActive = await isActiveFingerToken.getStorage();

  //     const credentials = await authStorage.getStorage();

  //     if (isActive.isActive) {
  //       const isAuth = await localAuth();
  //       console.log(isAuth, 'auth')
  //       if (credentials) {
  //         if (isAuth) {
  //           setLoad(true);
  //           login(credentials);
  //         } else {
  //           setAuthenticationStatus(isAuth);
  //         }
  //       } else {
  //         await isActiveFingerToken.setStorage({ isActive: false });
  //       }
  //     }
  //   }

  //   Auth();
  // }, [login]);



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

      <Form ref={formRef} onSubmit={handleSubmit}>
        <BoxInput>
          <Input
            name="membro"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={h => setMembro(h)}
            placeholder="MEMBRO"
            value={membro}
          />
          <Input
            name="membro"
            value={pass}
            // selectionColor={theme.colors.color_text.dark}
            secureTextEntry
            placeholder="SENHA"
            onChangeText={setPass}
          />

          <View style={{ marginTop: 32 }}>
            <Button loading={load} disabled={load} pres={() => formRef.current?.submitForm()} title="ENTRAR" />
          </View>
        </BoxInput>
      </Form>
    </Container>
  );
}
