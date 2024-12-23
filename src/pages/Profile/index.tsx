/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-alert */
/* eslint-disable camelcase */
import { AntDesign } from '@expo/vector-icons';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as ImagePiker from 'expo-image-picker';
import React, { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import { Header } from '../../components/Header';
import { Input } from '../../components/Inputs';
import { ToglleEnquadramento } from '../../components/ToglleEnquadramento';
import { ToglleRamo } from '../../components/ToglleRamo';
import theme from '../../global/styles/club-mentoria';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import {
  Box,
  BoxCamera,
  BoxFormularios,
  BoxLogo,
  BoxTogle,
  Camera,
  Container,
  LogoImage,
  TextTogle,
  TitleButton,
  TitleHeader,
} from './styles';
import { useForm } from 'react-hook-form';
import { FormInput } from '../../components/forms/FormInput';
import { TProfile, TUser } from '../../hooks/dto/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { validation } from '../../hooks/dto/validations';
import { make } from '../../hooks';
import { InputForm } from '../../components/forms/InputForm';
import { Button } from '../../components/forms/Button';
import { TextStyle } from '../../components/forms/topograph';
import { Avatar, HStack } from 'native-base';

const { mutations } = make()

export function Profile() {
  const { user, updateUser } = useAuth();
  const { profile } = user
  const { navigate, goBack } = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const modalizeRefRamo = useRef<Modalize>(null);
  const modalizeRefEnquadramento = useRef<Modalize>(null);

  const [logo, setLogo] = React.useState('')
  const [avatar, setAvatar] = React.useState('')

  const { mutateAsync: updateProfile, isLoading: loadProfile } = mutations.updateProfile()
  const { mutateAsync: upeUser, isLoading: loadUser } = mutations.updateUser()

  const userControl = useForm<TUser>({
    resolver: zodResolver(validation.user),
    defaultValues: {
      nome: user.nome,
      apelido: user.apelido,
      adm: user.adm,
      apadrinhado: user.apadrinhado,
      hub: user.hub,
      id: user.id,
    }
  })

  const profileControl = useForm<TProfile>({
    resolver: zodResolver(validation.profile),
    defaultValues: {
      id: profile?.id,
      whats: profile?.whats,
      logotipo: profile?.logotipo,
      avatar: profile?.avatar,
      workName: profile?.workName,
      CNPJ: profile?.CNPJ,
      CPF: profile?.CPF,
      ramo: profile?.ramo,
      enquadramento: profile?.enquadramento,
      email: profile?.email,
      avatarPath: profile?.avatarPath,
      logoPath: profile?.logoPath,
      userId: user.id,
    }
  })

  // TODO MODAL
  const [ramo, setRamo] = useState(user?.profile?.ramo);
  const [enquadramento, setEnquadramento] = useState(
    user?.profile?.enquadramento,
  );
  const [modal, setModal] = useState(false);

  const handleModalOpenRamo = useCallback(() => {
    modalizeRefRamo.current?.open();
    setModal(!modal);
  }, [modal]);

  const handleModalOpenEnquadramento = useCallback(() => {
    modalizeRefEnquadramento.current?.open();
  }, []);



  const handleImagePiker = useCallback(async () => {

    const result = await ImagePiker.launchImageLibraryAsync({
      mediaTypes: ImagePiker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });


    if (!result.canceled) {
      setAvatar(result.assets[0].uri);

      try {
        const ref = storage().ref(`image/avatar/${user.id}.png`);
        await ref.delete();
      } catch (error) {
        console.log(error);
      }

      const reference = storage().ref(`/image/avatar/${user.id}.png`);

      await reference.putFile(result.assets[0].uri);
      const photoUrl = await reference.getDownloadURL();
      setAvatar(photoUrl);
    }
  }, [user]);

  const handleLogo = useCallback(async () => {
    const { status } = await ImagePiker.requestMediaLibraryPermissionsAsync();

    if (status === 'granted') {
      const result = await ImagePiker.launchImageLibraryAsync({
        mediaTypes: ImagePiker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.canceled) {
        setLogo(result.assets[0].uri);

        try {
          const ref = storage().ref(`image/logo/${user.id}.png`);
          await ref.delete();
        } catch (error) {
          console.log(error);
        }
        const reference = storage().ref(`/image/logo/${user.id}.png`);

        await reference.putFile(result.assets[0].uri);
        const photoUrl = await reference.getDownloadURL();
        setLogo(photoUrl);
      }
    }

  }, [user]);

  async function handleSaveUser(obj: TUser) {
    try {
      await upeUser(obj)
      updateUser()
    } catch (error) {

    }
  }

  async function handleSaveProfile(obj: TProfile) {
    try {
      await updateProfile(obj)
      updateUser()

    } catch (error) {

    }
  }

  return (
    <Container>
      <Modalize ref={modalizeRefRamo} snapPoint={530}>
        <InputForm
          control={profileControl.control}
          name='ramo'
          error={profileControl.formState.errors.ramo}
          render={({ value, onChange }) => (
            <ToglleRamo selectItem={(item: string) => {
              onChange(item)
              modalizeRefRamo.current?.close();

            }} />
          )}
        />
      </Modalize>

      <Modalize ref={modalizeRefEnquadramento} snapPoint={530}>
        <InputForm
          control={profileControl.control}
          name='enquadramento'
          error={profileControl.formState.errors.enquadramento}
          render={({ value, onChange }) => (
            <ToglleEnquadramento
              selectItem={(item: string) => {
                onChange(item)
                modalizeRefEnquadramento.current?.close()
              }
              }
            />
          )}
        />
      </Modalize>
      <Header />

      <View>
        <ScrollView
          contentContainerStyle={{
            paddingTop: RFValue(10),
            paddingBottom: RFValue(80),
          }}
        >
          <Box>
            <Avatar
              size={'2xl'}
              source={{
                uri: user?.profile?.avatar,
              }}
            />
            <BoxCamera onPress={handleImagePiker}>
              <Camera name="camera" />
            </BoxCamera>
          </Box>
          <BoxFormularios>
            <TextStyle type='subtitle' >Dados da conta</TextStyle>

            <FormInput
              name='nome'
              control={userControl.control}
              error={userControl.formState.errors.nome}
              placeholder='Nome'
            />

            <FormInput
              name='apelido'
              control={userControl.control}
              error={userControl.formState.errors.apelido}
            />

            <FormInput
              name='senha'
              control={userControl.control}
              error={userControl.formState.errors.senha}
              autoCapitalize='none'
              secureTextEntry
            />

            <Button pres={userControl.handleSubmit(handleSaveUser)} loading={loadUser} title='SALVAR USUÁRIO' />


          </BoxFormularios>

          <BoxFormularios>
            <TextStyle type='subtitle' >Dados da sua empresa</TextStyle>
            <FormInput
              name='workName'
              control={profileControl.control}
              error={profileControl.formState.errors.workName}
              placeholder='Nome fantasia'
            />

            <FormInput
              name='email'
              control={profileControl.control}
              error={profileControl.formState.errors.email}
              placeholder='E-mail'
              keyboardType='email-address'
            />

            <FormInput
              name='CPF'
              control={profileControl.control}
              error={profileControl.formState.errors.CPF}
              placeholder='CPF'
              mask='cpf'
              keyboardType='numeric'
            />

            <FormInput
              name='CNPJ'
              control={profileControl.control}
              keyboardType='numeric'
              error={profileControl.formState.errors.CNPJ}
              mask='cpf'
              placeholder='CNPJ'
            />

            <FormInput
              name='whats'
              control={profileControl.control}
              error={profileControl.formState.errors.whats}
              placeholder='Contato'
              mask='cell-phone'
              maxLength={17}
              keyboardType='numeric'
            />


            <HStack alignItems={'center'} space={2} w={'full'} >

              <View style={{ flex: 1 }} >
                <TextStyle>RAMO DE ATIVIDADE</TextStyle>
                <BoxTogle onPress={handleModalOpenRamo}>
                  <TextTogle>{profileControl.watch('ramo')}</TextTogle>
                  <AntDesign
                    name="caretdown"
                    size={25}
                    color={theme.colors.focus[1]}
                  />
                </BoxTogle>
              </View>

              <View style={{ flex: 1 }} >
                <TextStyle>ENQUADRAMENTO</TextStyle>
                <BoxTogle onPress={handleModalOpenEnquadramento}>
                  <TextTogle>{profileControl.watch('enquadramento')}</TextTogle>
                  <AntDesign
                    name="caretdown"
                    size={25}
                    color={theme.colors.focus[1]}
                  />
                </BoxTogle>
              </View>

            </HStack>


            <Button loading={loadProfile} pres={profileControl.handleSubmit(handleSaveProfile)} title='SALVAR PERFIL' />
          </BoxFormularios>

          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <BoxLogo>
              <TitleButton style={{ textAlign: 'center' }}>
                LOGO EMPRESA
              </TitleButton>
              <LogoImage source={{ uri: logo }} />
            </BoxLogo>
            <TouchableOpacity
              onPress={handleLogo}
              style={{ top: RFPercentage(10), marginLeft: 20 }}
            >
              <TitleHeader>ALTERAR LOGO</TitleHeader>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

    </Container>
  );
}
