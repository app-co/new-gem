/* eslint-disable camelcase */
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import * as Location from 'expo-location';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';

import { Header } from '../../components/Header';
import { useToken } from '../../contexts/Token';
import { useRelation } from '../../contexts/relation';
import { IPresensaRelation } from '../../dtos';
import { useAuth } from '../../hooks/useAuth';
import { useAllUsers } from '../../hooks/user';
import { api } from '../../services/api';
import { routesScheme } from '../../services/schemeRoutes';
import {
  Box,
  ButtonValidar,
  Container,
  TextButtonValidar,
  Title,
} from './styles';

interface I {
  lat: number;
  log: number;
}

const local = {
  lat: -22.889,
  log: -48.442,
};

export function Valide() {
  const { user } = useAuth();
  const { listAllRelation } = useRelation();
  const { mytoken, sendMessage } = useToken();

  const adms = useAllUsers();
  const allAdm = adms.data || [];

  const { nome, id } = user;
  const { navigate } = useNavigation();
  const [data, setData] = useState(format(new Date(Date.now()), 'dd/MM/yyyy'));
  const [load, setLoad] = useState(false);

  const [location, setLocation] = useState<I>({ lat: 0, log: 0 });
  const [errorMsg, setErrorMsg] = useState(null);

  const geoLocation = React.useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLocation({
      lat: location.coords.latitude,
      log: location.coords.longitude,
    });
  }, []);

  useEffect(() => {
    geoLocation();
  }, [geoLocation]);

  const presendaData = (listAllRelation.data as IPresensaRelation[]) || [];
  const filPres = presendaData.find(h => {
    const date = format(new Date(h.created_at), 'dd/MM/yyyy');

    if (date === data && h.type === 'PRESENCA' && h.fk_user_id === user.id) {
      return h;
    }
  });

  useFocusEffect(
    useCallback(() => {
      adms.refetch();
      geoLocation();
    }, [geoLocation]),
  );

  const hanldeValidar = useCallback(async () => {
    setLoad(true)
    if (filPres) {
      return Alert.alert(
        'Você não pode validar mais de uma presença no mesmo dia',
      );
    }

    const lat = Number(location.lat.toFixed(3));
    const log = Number(location.log.toFixed(3));


    if (local.lat !== lat && local.log !== log) {
      return Alert.alert(
        'Atenção',
        'Você precisa estar no local para lançar a sua presença',
      );
    }

    const dados = {
      nome,
      user_id: id,
      objto: { user_id: id,
        avatar: user.profile.avatar,
        token: mytoken,
      },
      type: 'PRESENCA',
      situation: false,
    };

    const adm = allAdm.filter(h => h.adm === true).map(h => h.token);

    await api
      .post(routesScheme.relationShip.create, dados)
      .then(h => {
        setLoad(false);
        navigate('INÍCIO');

        adm.forEach(async h => {
          sendMessage({
            title: 'Presença',
            text: 'Um membro acabou de marcar presença',
            token: h,
          });
        });
        Alert.alert(
          'Solicitação enviada',
          'Aguarde um adm validar sua presença',
        );
      })
      .catch(h => {
        Alert.alert('Ops!', h.response.data.message);
        setLoad(false)
      });
  }, [
    allAdm,
    filPres,
    id,
    location.lat,
    location.log,
    mytoken,
    nome,
    sendMessage,
    user.profile.avatar,
  ]);

  return (
    <Container>
      <Header title="Valide sua presença" />

      <Box>
        <Title>{data}</Title>
      </Box>

      <ButtonValidar onPress={hanldeValidar}>
        {load ? (
          <ActivityIndicator />
        ) : (
          <TextButtonValidar>validar</TextButtonValidar>
        )}
      </ButtonValidar>
    </Container>
  );
}
