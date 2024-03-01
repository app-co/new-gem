import { useFocusEffect } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { Center, TextArea } from 'native-base';
import React, { useCallback } from 'react';
import { Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Header } from '../../components/Header';
import { Input } from '../../components/Inputs';
import { OrderIndicationComp } from '../../components/OrderIndicationComp';
import { IRelashionship } from '../../dtos';
import theme from '../../global/styles/geb';
import { useOrderRelation } from '../../hooks/relations';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import { paramsRoutesScheme, routesScheme } from '../../services/schemeRoutes';
import { _currency, _number } from '../../utils/mask';
import * as S from './styles';

type TSubmit = {
  item: IRelashionship;
};

type TTypeValue = 'not-yeat' | 'not' | 'handshak';

export function Solicitaions() {
  const { user } = useAuth();
  const { data, refetch } = useOrderRelation();

  const [orders, setOrders] = React.useState<IRelashionship[] | undefined>([]);

  const [itemId, setItemId] = React.useState('');
  const [descripton, setDescription] = React.useState('');

  const [typeIndication, setTypeIndication] =
    React.useState<TTypeValue>('not-yeat');
  const [value, setValue] = React.useState('');

  const currency = _currency(value);

  const handleAproved = React.useCallback(
    async ({ item }: TSubmit) => {
      try {
        setItemId(item.id);

        if (item.type === 'INDICATION') {
          const it = item;
          switch (typeIndication) {
            case 'handshak':
              {
                const valor =
                  value.length < 6
                    ? Number(_number(`${value},00`))
                    : Number(_number(value));

                const dt = {
                  prestador_id: user.id,
                  ponts: 10,
                  token: '',
                  objto: {
                    consumidor_name: it.objto.client_name,
                    descripton,
                    valor,
                  },
                  situation: true,
                  type: 'CONSUMO_OUT',
                };

                await api.post(routesScheme.relationShip.create, dt);

                await api.put(routesScheme.relationShip.update, {
                  id: item.id,
                  situation: true,
                });

                setOrders(orders?.filter(h => h.id !== item.id));
                setItemId('');
              }

              break;

            case 'not-yeat':
              setItemId('');

              setOrders(orders?.filter(h => h.id !== item.id));

              break;

            case 'not':
              {
                await api.put(routesScheme.relationShip.update, {
                  id: item.id,
                  situation: true,
                });

                const fil = orders?.filter(h => h.id !== item.id);
                setOrders(fil);
              }
              break;

            default:
              break;
          }
        } else {
          await api
            .put(routesScheme.relationShip.update, {
              id: item.id,
              situation: true,
            })
            .then(h => {
              setItemId('');
              setOrders(orders?.filter(h => h.id !== item.id));
            });
        }
      } catch (err: any) {
        setItemId('');

        const message = err?.response?.data?.message;
        if (message) {
          return Alert.alert('Algo não está certo!', message);
        }
      }
    },
    [descripton, orders, typeIndication, user.id, value],
  );

  const handleRecused = React.useCallback(
    async ({ item }: TSubmit) => {
      try {
        await api
          .delete(paramsRoutesScheme(item.id).relationShip.delete)
          .then(h => {
            setOrders(orders?.filter(h => h.id !== item.id));
            setItemId('');
          });
      } catch (err) {
        setItemId('');
      }
    },
    [orders],
  );

  React.useEffect(() => {
    if (orders?.length === 0) {
      refetch();
    }
  }, [orders]);

  useFocusEffect(
    useCallback(() => {
      setOrders(data?.relation);
    }, [data]),
  );

  return (
    <S.Container>
      <Header type="goback" />

      {orders?.length === 0 && <S.title>Não há negócios para validar</S.title>}

      <S.box>
        <FlatList
          contentContainerStyle={{
            paddingBottom: 150,
          }}
          data={orders}
          keyExtractor={h => h.id}
          renderItem={({ item: h }) => (
            <OrderIndicationComp
              confirmation={() => handleAproved({ item: h })}
              reject={() => handleRecused({ item: h })}
              item={h}
              valueType={h => setTypeIndication(h)}
              load={itemId === h.id}
            >
              <Form onSubmit={() => { }}>
                <Center m={10}>
                  <Input
                    placeholderTextColor="#b6b6b6"
                    name="name"
                    placeholder="Digite o valor que foi negociado"
                    onChangeText={setValue}
                    value={currency}
                    keyboardType="numeric"
                  />

                  <TextArea
                    w="64"
                    mt="2"
                    _focus={{
                      backgroundColor: theme.colors.bg_color[2],
                      fontFamily: theme.fonts.regular,
                    }}
                    color="#fff"
                    placeholder="Descricão"
                    onChangeText={setDescription}
                    value={descripton}
                  />
                </Center>
              </Form>
            </OrderIndicationComp>
          )}
        />
      </S.box>
    </S.Container>
  );
}
