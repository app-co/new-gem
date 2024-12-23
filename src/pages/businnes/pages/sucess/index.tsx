/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Modal } from 'react-native';

import logo from '../../../../assets/logo.png';
import { StarModal } from '../../../../components/StarModal';
import { IUserDtos } from '../../../../dtos';
import { useAuth } from '../../../../hooks/useAuth';
import { api } from '../../../../services/api';
import { Button, Container, Image, Message, Title } from './styles';

interface RouteParams {
  workName: string;
}

export function Sucess() {
  const route = useRoute();
  const { user } = useAuth();
  const [star, setStar] = React.useState(1);
  const [modal, setModal] = React.useState(false);
  const { workName } = route.params as RouteParams;

  const { reset } = useNavigation();

  const navigateToHome = useCallback(async () => {
    setModal(false);

    try {
      await api
        .post('/star/assest', {
          star,
          fk_id_user: prestador,
        })
        .then(() => {
          sendPushNotification();
          setModal(false);
          reset({
            routes: [{ name: 'INÍCIO' }],
          });
        });

    } catch (error) {
      console.log({ error })
    }
  }, [reset, star]);

  return (
    <Container>
      <Modal visible={modal} animationType="fade" transparent>
        <StarModal
          setStars={h => setStar(h)}
          star={star}
          submit={navigateToHome}
        />
      </Modal>
      <Message style={{ textAlign: 'center', fontSize: 28 }}>
        OPERAÇAO REALIZADA!!
      </Message>

      <Message style={{ textAlign: 'center' }}>
        Aguarde a confimação da {workName}
      </Message>

      <Button onPress={() => setModal(true)}>
        <Title>Ok</Title>
      </Button>
      <Image source={logo} />
    </Container>
  );
}
