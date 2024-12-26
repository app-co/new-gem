/* eslint-disable camelcase */
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import * as Location from 'expo-location';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';

import { Header } from '../../components/Header';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import { routesScheme } from '../../services/schemeRoutes';
import {
  Box,
  ButtonValidar,
  Container,
  TextButtonValidar,
  Title,
} from './styles';
import { TextStyle } from '../../components/forms/topograph';
import { colors } from '../../global/hub-colors';
import { make } from '../../hooks';
import Toast from '../../components/toast/handler';

interface I {
  lat: number;
  log: number;
}

const local = {
  lat: -22.8893341,
  log: -48.4448072,
};

const { querys, mutations } = make()

export function Valide() {
  const { user } = useAuth();


  const { nome, id } = user;
  const { navigate } = useNavigation();

  const { data, isLoading } = querys.useRelationsMetricasUser()
  const { mutateAsync, isLoading: load } = mutations.registerRelation()

  const [currentDate, setData] = useState(format(new Date(Date.now()), 'dd/MM/yy'));
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

  useFocusEffect(useCallback(() => {
    geoLocation()
  }, []))

  const hanldeValidar = useCallback(async () => {
    const lat = Number(location.lat);
    const log = Number(location.log);

    if (local.lat !== lat && local.log !== log) {
      return Toast.show({
        title: 'Atenção',
        description: 'Você precisa estar no local para validar sua presença',
        tipo: 'alert',
      })
    }

    const preNotValid = data?.notAprovaded.PRESENÇA.find(h => {
      const date = format(new Date(h.updated_at), 'dd/MM/yy')
      if (date === currentDate) return h
    })

    const preValid = data?.aprovaded.PRESENÇA.find(h => {
      const date = format(new Date(h.updated_at), 'dd/MM/yy')
      if (date === currentDate) return h
    })

    if (preNotValid) return Toast.show({
      title: 'Atenção',
      description: 'Você já possui uma solicitação de presença pendente.',
      tipo: 'alert',
    })

    if (preValid) return Toast.show({
      title: 'Atenção',
      description: 'Sua precença já foi validada para este dia.',
      tipo: 'alert',
    })

    const dados = {
      user_id: id,
      type: 5,
      objeto: {
        nome
      },
    };

    await mutateAsync(dados)
  }, [
    id,
    location.lat,
    location.log,
    nome,
  ]);

  return (
    <Container>
      <Header title="Valide sua presença" />

      <Box>
        <Title>{currentDate}</Title>
      </Box>

      <ButtonValidar onPress={hanldeValidar}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <TextStyle type='subtitle' colorText={colors.text[2]} >Marcar Presença</TextStyle>
        )}
      </ButtonValidar>
    </Container>
  );
}
