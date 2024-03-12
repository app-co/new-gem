/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Feather } from '@expo/vector-icons';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
import {
  MediaTypeOptions,
  launchCameraAsync,
  launchImageLibraryAsync
} from 'expo-image-picker';
import { Center, Image, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Modal } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Form } from '@unform/mobile';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Inputs';
import theme from '../../global/styles/club-mentoria';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import * as S from './styled';

export function Post() {
  const { goBack } = useNavigation();
  const { user } = useAuth();

  const [img, setImage] = useState('');
  const [descricao, setDescricao] = useState('');
  const [load, setLoad] = useState(false);
  const [isOpen, setIsOpen] = useState(false)

  async function openLibrary() {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setIsOpen(false)
      setImage(result.assets[0].uri);
    }
  }

  async function openCamera() {
    const result = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setIsOpen(false)
    }
  }



  const handleSubmit = useCallback(async () => {
    if (img === 'of') {
      Alert.alert('Erro', 'Escolha uma imagem para realizar o post');
      return;
    }
    setLoad(true);

    const fileName = new Date().getTime();
    const reference = storage().ref(`/image/${fileName}.png`);

    await reference.putFile(img);
    const photoUrl = await reference.getDownloadURL();

    console.log(photoUrl)

    const dados = {
      description: descricao,
      image: photoUrl,
      fk_id_user: user.id,
      like: 0,
    };

    try {
      await api
        .post('/post', dados)
      setLoad(false);
    } catch (error) {
    }

    goBack();
  }, [descricao, goBack, img, user]);

  // if (load) {
  //    return <Loading />;
  // }

  return (
    <S.Container>
      <Header />
      <Modal visible={isOpen} >
        <Center flex='1' bg={theme.colors.bg_color[1]} >
          <VStack space={4} >
            <Button title='CAMERA' pres={() => openCamera()} />
            <Button title='GALERIA' pres={() => openLibrary()} />

          </VStack>
        </Center>
      </Modal>
      <S.Box>
        <S.BoxInput>
          <Form>
            <Input name='descripton' onChangeText={setDescricao} placeholder='Descrição do poste' />
          </Form>
        </S.BoxInput>

        <S.ButonImage onPress={() => setIsOpen(true)}>
          <S.TexBoton style={{ fontSize: RFValue(16) }}>Escolher image</S.TexBoton>
        </S.ButonImage>

        <S.BoxImage>
          {img !== '' ? (
            <Image
              w="full"
              h="full"
              alt="image poste"
              resizeMode="contain"
              source={{ uri: img }}
            />
          ) : (
            <Feather name="image" size={100} />
          )}
        </S.BoxImage>

        <S.Button enabled={!load} onPress={handleSubmit}>
          {load ? <ActivityIndicator /> : <S.TexBoton>Criar</S.TexBoton>}
        </S.Button>
      </S.Box>
    </S.Container>
  );
}
