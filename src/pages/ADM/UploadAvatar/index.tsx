import { Feather } from '@expo/vector-icons';
import storage from '@react-native-firebase/storage';
import * as ImagePiker from 'expo-image-picker';
import { Avatar, Box, Center, HStack, VStack, useToast } from 'native-base';
import React, { useCallback } from 'react';
import {
  FlatList,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { Header } from '../../../components/Header';
import { Loading } from '../../../components/Loading';
import { useData } from '../../../contexts/useData';
import { IUserDtos } from '../../../dtos';
import { api } from '../../../services/api';
import * as S from './styles';

export function UploadAvatar() {
  const { users } = useData();
  const { show } = useToast();
  const [modal, setModal] = React.useState(false);
  const [image, setImage] = React.useState('');
  const [load, setLoad] = React.useState(false);

  const [url, setUrl] = React.useState('');

  const [item, setItem] = React.useState({ id: '', nome: '' });

  const data = (users?.data as IUserDtos[]) || [];

  const handleImagePiker = useCallback(async () => {
    const result = await ImagePiker.launchImageLibraryAsync({
      mediaTypes: ImagePiker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (result.cancelled) {
      setLoad(false);
    }

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  }, []);

  const submit = React.useCallback(async () => {
    setLoad(true);

    const reference = storage().ref(`/avatar/${item.id}.png`);
    try {
      await reference.delete();
    } catch (error) {
      // console.log(error);
    }

    await reference.putFile(image);
    const photoUrl = await reference.getDownloadURL();

    try {
      await api.put('user/update-profile', {
        fk_id_user: item.id,
        avatar: photoUrl,
      });

      setLoad(false);
      show({
        title: 'Sucesso!',
        description: 'Avatar trocado com sucesso.',
        placement: 'bottom',
        bgColor: 'green.500',
      });
    } catch (error) {
      setLoad(false);
    }
  }, [item.id, image]);

  if (users.isLoading) {
    return <Loading />;
  }

  return (
    <S.Container>
      <Header />
      <Modal visible={modal}>
        <Box p="8" flex="1">
          <Box alignItems="flex-end">
            <TouchableOpacity onPress={() => setModal(false)}>
              <Feather name="x-circle" size={40} color="red" />
            </TouchableOpacity>
          </Box>
          <VStack space={4}>
            <FlatList
              contentContainerStyle={{ paddingBottom: 100 }}
              data={data}
              keyExtractor={h => h.id}
              renderItem={({ item: h }) => (
                <TouchableOpacity
                  onPress={() => {
                    setItem({ id: h.id, nome: h.nome });
                    setModal(false);
                  }}
                >
                  <HStack mt="4" alignItems="center" space={8}>
                    <Avatar source={{ uri: h.profile.avatar }} />
                    <S.title>{h.nome}</S.title>
                  </HStack>
                </TouchableOpacity>
              )}
            />
          </VStack>
        </Box>
      </Modal>

      <Modal transparent visible={load}>
        <Center flex="1">
          <ActivityIndicator size={40} />
        </Center>
      </Modal>

      <S.title style={{ margin: 20 }}>Salvar avatar para o membro</S.title>

      <S.boxSelectUser onPress={() => setModal(true)}>
        <S.title style={{ color: '#fff' }}>Selecione um membro</S.title>
      </S.boxSelectUser>

      <S.content onPress={handleImagePiker}>
        <S.title style={{ margin: 20 }}>{item?.nome}</S.title>
        <S.Image
          resizeMode="cover"
          source={{
            uri:
              image ||
              'https://th.bing.com/th/id/OIP.ab2vkbrWYtSzGzV8krrcrwHaHa?pid=ImgDet&rs=1',
          }}
        />

        <S.title style={{ marginTop: 30 }}>
          Click aqui para selecionar uma imagem
        </S.title>
      </S.content>
      <S.button onPress={submit}>
        <S.title>SALVAR</S.title>
      </S.button>
    </S.Container>
  );
}
