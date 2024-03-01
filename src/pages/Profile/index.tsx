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
import theme from '../../global/styles/geb';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import {
  Avatar,
  Box,
  BoxButton,
  BoxCamera,
  BoxFormularios,
  BoxInput,
  BoxLogo,
  BoxTogle,
  Camera,
  Container,
  LogoImage,
  TextTogle,
  TitleButton,
  TitleHeader,
} from './styles';

export function Profile() {
  const { user, updateUser } = useAuth();
  const { navigate, goBack } = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const modalizeRefRamo = useRef<Modalize>(null);
  const modalizeRefEnquadramento = useRef<Modalize>(null);

  const [loading, setLoading] = useState(true);
  const [load, setLoad] = React.useState(false);

  // TODO USER
  const [avatar, setAvatar] = useState('');
  const [logo, setLogo] = useState('');

  // TODO FORMULARIOS
  const [whats, setWhats] = useState(user.profile.whats);
  const [email, setEmail] = useState(user.nome);
  const [workName, setWorkName] = useState(user.profile.workName);
  const [CPF, setCpf] = useState(user.profile.CPF);
  const [cnpj, setCnpj] = useState(user.profile.CNPJ);
  const [avatarUrl, setAvatarUrl] = useState(user.profile.avatar);
  const [logoUrl, setLogorUrl] = useState(user.profile.logo);
  const [membro, setMembro] = React.useState(user.membro);
  const [senha, setSenha] = React.useState(null);

  // TODO MODAL
  const [ramo, setRamo] = useState(user.profile.ramo);
  const [enquadramento, setEnquadramento] = useState(
    user.profile.enquadramento,
  );
  const [modal, setModal] = useState(false);

  const handleModalOpenRamo = useCallback(() => {
    modalizeRefRamo.current?.open();
    setModal(!modal);
  }, [modal]);

  const handleModalOpenEnquadramento = useCallback(() => {
    modalizeRefEnquadramento.current?.open();
  }, []);

  const SelectItemRamo = useCallback(
    (item: string) => {
      setRamo(item);
      setModal(!modal);

      modalizeRefRamo.current?.close();
    },
    [modal],
  );

  const SelectItemEnquadramento = useCallback((item: string) => {
    setEnquadramento(item);
    modalizeRefEnquadramento.current?.close();
  }, []);

  const handleImagePiker = useCallback(async () => {
    setLoading(true);

    const result = await ImagePiker.launchImageLibraryAsync({
      mediaTypes: ImagePiker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0,
    });

    if (result.cancelled) {
      setLoading(false);
    }

    if (!result.cancelled) {
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
      setAvatarUrl(photoUrl);
    }
  }, [user]);

  const handleLogo = useCallback(async () => {
    setLoading(true);
    const { status } = await ImagePiker.requestMediaLibraryPermissionsAsync();

    if (status === 'granted') {
      const result = await ImagePiker.launchImageLibraryAsync({
        mediaTypes: ImagePiker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0,
      });

      if (!result.cancelled) {
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
        setLogorUrl(photoUrl);
      }
    }

    setLoading(false);
  }, [user]);

  const handleSubmit = useCallback(
    async (data: any) => {
      formRef.current?.setErrors({});
      setLoad(true);

      const dados = {
        whats,
        workName,
        CNPJ: cnpj,
        CPF,
        email,
        enquadramento,
        ramo,
        fk_id_user: user.id,
        logo: logoUrl,
        avatar: avatarUrl,
      };

      try {
        await api
          .put('user/update-profile', dados)
          .then(() => {
            Alert.alert('Seu perfil foi atualizado com sucesso!');
            const dt = {
              ...user,
              profile: dados,
            };
            updateUser(dt);
          })
          .finally(() => {
            setLoad(false);
            goBack();
          });

        let upmembro = {};

        if (senha) {
          upmembro = {
            membro,
            senha,
            id: user.id,
          };
        } else {
          upmembro = {
            membro,
            id: user.id,
          };
        }

        await api.patch('/user/update-membro', upmembro);
      } catch (err) {
        Alert.alert('Erro ao atualizar seu perfil', err.response.data.message);
      }
    },
    [
      CPF,
      avatarUrl,
      cnpj,
      email,
      enquadramento,
      goBack,
      logoUrl,
      membro,
      ramo,
      senha,
      updateUser,
      user,
      whats,
      workName,
    ],
  );

  return (
    <Container>
      <Modalize ref={modalizeRefRamo} snapPoint={530}>
        <ToglleRamo selectItem={(item: string) => SelectItemRamo(item)} />
      </Modalize>

      <Modalize ref={modalizeRefEnquadramento} snapPoint={530}>
        <ToglleEnquadramento
          selectItem={(item: string) => SelectItemEnquadramento(item)}
        />
      </Modalize>
      <Header />

      <View
        style={{
          height: RFPercentage(80),
        }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingTop: RFValue(10),
            paddingBottom: RFValue(30),
          }}
        >
          <Box>
            <Avatar
              style={{ resizeMode: 'cover' }}
              source={{
                uri: avatar !== '' ? avatar : user.profile.avatar,
              }}
            />
            <BoxCamera onPress={handleImagePiker}>
              <Camera name="camera" />
            </BoxCamera>
          </Box>

          <Form
            ref={formRef}
            initialData={{
              nome: user.nome,
              email: user.profile.email,
              workName: user.profile.workName,
              membro: user.membro,
            }}
          >
            <BoxFormularios>
              <BoxInput>
                <TitleHeader style={{ right: 10 }}>MEMBRO</TitleHeader>
                <Input
                  name="membro"
                  icon=""
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={setMembro}
                  value={membro}
                />
              </BoxInput>

              <BoxInput>
                <TitleHeader style={{ right: 10 }}>SENHA</TitleHeader>
                <Input
                  name="senha"
                  icon=""
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={setSenha}
                />
              </BoxInput>

              <BoxInput>
                <TitleHeader style={{ right: 10 }}>WHATS</TitleHeader>
                <Input
                  name="whats"
                  onChangeText={mask => {
                    setWhats(mask);
                  }}
                  value={whats!}
                />
                <BoxInput h="1" bg={theme.colors.focus[1]} />
              </BoxInput>
            </BoxFormularios>

            <BoxFormularios>
              <BoxInput>
                <TitleHeader style={{ right: 10 }}>RAZÃO SOCIAL</TitleHeader>
                <Input
                  name="workName"
                  icon=""
                  autoCapitalize="none"
                  onChangeText={h => setWorkName(h)}
                  value={workName!}
                />
              </BoxInput>
              <BoxInput>
                <TitleHeader style={{ right: 10 }}>CPF</TitleHeader>
                <Input
                  name="cpf"
                  icon=""
                  onChangeText={h => setCpf(h)}
                  value={String(CPF)}
                />
              </BoxInput>

              <BoxInput>
                <TitleHeader style={{ right: 10 }}>CNPJ</TitleHeader>
                <Input
                  name="cnpj"
                  icon=""
                  onChangeText={h => setCnpj(h)}
                  value={String(cnpj)}
                />
              </BoxInput>

              <View
                style={{
                  alignSelf: 'flex-start',
                  marginLeft: 20,
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <TitleHeader>RAMO DE ATIVIDADE</TitleHeader>
                <BoxTogle onPress={handleModalOpenRamo}>
                  <TextTogle>{ramo}</TextTogle>
                  <AntDesign
                    name="caretdown"
                    size={25}
                    color={theme.colors.focus[1]}
                  />
                </BoxTogle>
              </View>

              <View
                style={{
                  alignSelf: 'flex-start',
                  marginLeft: 20,
                  marginTop: 20,
                }}
              >
                <TitleHeader>ENQUADRAMENTO</TitleHeader>
                <BoxTogle onPress={handleModalOpenEnquadramento}>
                  <TextTogle>{enquadramento}</TextTogle>
                  <AntDesign
                    name="caretdown"
                    size={25}
                    color={theme.colors.focus[1]}
                  />
                </BoxTogle>
              </View>
            </BoxFormularios>
          </Form>

          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <BoxLogo>
              <TitleButton style={{ textAlign: 'center' }}>
                LOGO EMPRESA
              </TitleButton>
              <LogoImage source={{ uri: logoUrl }} />
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
      <BoxButton onPress={handleSubmit}>
        {load ? <ActivityIndicator /> : <TitleButton>Atualizar</TitleButton>}
      </BoxButton>
    </Container>
  );
}
