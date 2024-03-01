/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */

import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { Box, Center, Text, TextArea } from 'native-base';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import { Header } from '../../components/Header';
import { Input } from '../../components/Inputs';
import { Loading } from '../../components/Loading';
import { MembrosComponents } from '../../components/MembrosCompornents';
import { useToken } from '../../contexts/Token';
import theme from '../../global/styles/geb';
import { useAuth } from '../../hooks/useAuth';
import { useAllUsers } from '../../hooks/user';
import { api } from '../../services/api';
import { routesScheme } from '../../services/schemeRoutes';
import {
  BoxButton,
  BoxInput,
  BoxModal,
  Container,
  Input as In,
  TextButon,
  Title,
} from './styles';

export function Indicacoes() {
  const { user } = useAuth();
  const { data, isLoading } = useAllUsers(user.hub);
  const { mytoken } = useToken();

  const { navigate } = useNavigation();
  const [modal, setModal] = useState(false);

  // const [users, setUsers] = useState<IUserDto[]>([]);
  const [descricao, setDescricao] = useState('');
  const [userId, setUserId] = useState('');
  const [indicadoName, setIndicadoName] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [telefoneCliente, setTelefoneCliente] = useState('');
  const [value, setValue] = useState('');
  const [expoToken, setExpoToken] = React.useState('');

  const membros = data || [];

  const users =
    value.length > 0
      ? membros.filter(h => {
        const up = h.nome.toLocaleUpperCase();

        if (up.includes(value.toLocaleUpperCase()) && h.id !== user.id) {
          return h;
        }
        return null;
      })
      : membros.filter(h => h.id !== user.id);

  const OpenModal = useCallback(
    (user_id: string, nome: string, token: string) => {
      setUserId(user_id);
      setIndicadoName(nome);
      setExpoToken(token);
      setModal(true);
    },
    [],
  );

  const handleOrderIndicaçao = useCallback(async () => {
    setModal(false);

    const dt = {
      prestador_id: userId,
      objto: {
        quemIndicaou_name: user.nome,
        client_name: nomeCliente,
        phone_number: telefoneCliente,
        description: descricao,
        token: mytoken,
      },
      type: 'INDICATION',
      token: expoToken,
    };

    console.log(mytoken, expoToken);

    await api.post(routesScheme.relationShip.create, dt).then(() => {
      Alert.alert('Indicação', `Aguarde a validação de ${indicadoName}`, [
        {
          text: 'Ok',
          onPress: () => {
            navigate('INÍCIO');
          },
        },
      ]);
    });
  }, [
    userId,
    indicadoName,
    nomeCliente,
    descricao,
    telefoneCliente,
    expoToken,
    user,
    navigate,
  ]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Header />

      <Form>
        <Center>
          <Input
            name="find"
            icon="search"
            onChangeText={text => setValue(text)}
            value={value}
          />
        </Center>
      </Form>

      <FlatList
        data={users}
        keyExtractor={h => h.id}
        renderItem={({ item: h }) => (
          <MembrosComponents
            star={h.media}
            imageOfice={h.profile.logo}
            oficio={h.profile.workName}
            user_avatar={h.profile.avatar}
            icon="indicar"
            userName={h.nome}
            pres={() => OpenModal(h.id, h.nome, h.token)}
          />
        )}
      />

      <Modal
        onRequestClose={() => setModal(false)}
        visible={modal}
        animationType="slide"
      >
        <BoxModal>
          <ScrollView>
            <Box>
              <TouchableOpacity
                onPress={() => setModal(false)}
                style={{
                  backgroundColor: theme.colors.focus[2],
                  borderRadius: 10,
                  padding: 10,
                  width: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: '#fff' }}>FECHAR</Text>
              </TouchableOpacity>
            </Box>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}
            >
              <Title>Descriçao</Title>
              <Title>{descricao.length}/100</Title>
            </View>
            <TextArea
              borderRadius={10}
              maxLength={100}
              value={descricao}
              onChangeText={h => setDescricao(h)}
              fontFamily={theme.fonts.regular}
              fontSize={14}
            />

            <BoxInput>
              <In
                placeholder="Nome do cliente"
                onChangeText={setNomeCliente}
                value={nomeCliente}
              />
            </BoxInput>

            <BoxInput>
              <In
                keyboardType="numeric"
                placeholder="Telefone do cliente"
                onChangeText={setTelefoneCliente}
                value={telefoneCliente}
              />
            </BoxInput>

            <BoxButton onPress={handleOrderIndicaçao}>
              <TextButon>enviar</TextButon>
            </BoxButton>
          </ScrollView>
        </BoxModal>
      </Modal>
    </Container>
  );
}
