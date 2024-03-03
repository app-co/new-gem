import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Alert, View } from 'react-native';

import { Header } from '../../../components/Header';
import { IUserDtos } from '../../../dtos';
import { api } from '../../../services/api';
import { Container } from './styles';

export function DeletUser() {
  const [respnse, setResponse] = useState<IUserDtos[]>([]);
  const { goBack } = useNavigation();

  const listAllUser = React.useCallback(async () => {
    await api
      .get('user/list-all-user')
      .then(h => {
        setResponse(h.data);
      })
      .catch(h => {
        console.log('erro ao lstar users na tela de deleteUser', h);
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      listAllUser();
    }, []),
  );

  const handleDelete = useCallback(
    async (id: string) => {
      Alert.alert('Aviso', 'você está preste a excluir um membro', [
        {
          text: 'Ok',
          onPress: async () => {
            await api
              .delete(`user/delete/${id}`)
              .then(h => { })
              .catch(h => {
                console.log('err ao deletar usuario', h);
                Alert.alert('Erro', h.response.data.message);
              })
              .finally(() => listAllUser());
          },
        },

        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ]);
    },
    [goBack],
  );

  return (
    <Container>
      <Header />
      <View>

      </View>
    </Container>
  );
}
