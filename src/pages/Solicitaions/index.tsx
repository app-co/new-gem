import { useFocusEffect } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { Center, TextArea, VStack } from 'native-base';
import React, { useCallback } from 'react';
import { ActivityIndicator, Alert, Modal, RefreshControl } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { useQueryClient } from 'react-query';
import { Header } from '../../components/Header';
import { Input } from '../../components/Inputs';
import { OrderIndicationComp } from '../../components/OrderIndicationComp';
import theme from '../../global/styles/geb';
import { useOrderRelation } from '../../hooks/relations';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import { paramsRoutesScheme, routesScheme } from '../../services/schemeRoutes';
import { _currency, _number } from '../../utils/mask';
import * as S from './styles';
import { make } from '../../hooks';
import { TextStyle } from '../../components/forms/topograph';
import { Loading } from '../../components/Loading';
import { IRelationship } from '../../hooks/dto/interfaces';
import { TRelationConsumo } from '../../hooks/dto/types';
import { validationConsumo } from '../../hooks/dto/validations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputForm } from '../../components/forms/InputForm';
import { showMessage } from '../../hooks/messageError';
import { colors } from '../../global/hub-colors';
import { FormInput } from '../../components/forms/FormInput';
import { _canva } from '../../utils/size';

type TSubmit = {
  item: IRelationship;
};

type TTypeValue = 'not-yeat' | 'not' | 'handshak';

const { mutations, querys } = make()

export function Solicitaions() {
  const { user } = useAuth();

  const { data: relations = [], isLoading: loadRelation, refetch } = querys.relationForAprovation()
  const { mutateAsync: aproveRelation, isLoading: load } = mutations.aproveRelation()
  const { mutateAsync, isLoading } = mutations.registerRelation()

  const [itemId, setItemId] = React.useState<number | null>(null);
  const [descripton, setDescription] = React.useState('');

  const consumo = useForm<TRelationConsumo>({
    resolver: zodResolver(validationConsumo.omit({ id: true })),
    defaultValues: {
      hub: user.hub[0],
      type: 1,
      userId: user.id,
      valor: '0'
    }
  })

  const [typeIndication, setTypeIndication] =
    React.useState<TTypeValue>('not-yeat');

  console.log(consumo.formState.errors)
  const handleAproved = React.useCallback(

    async (obj: TRelationConsumo) => {
      console.log('cof')
      try {
        if (obj.type === 4) {
          switch (typeIndication) {
            case 'handshak':
              {
                const dt = {
                  ...obj,
                  objeto: { assunto: obj.descricao }
                }

                const validate = await consumo.trigger(['valor', 'descricao'])

                if (!validate) return

                await mutateAsync(dt)
                await aproveRelation(obj.id)
              }

              break;

            case 'not-yeat':
              setItemId(null);

              break;

            case 'not':
              {
                await aproveRelation(obj.id)
              }
              break;

            default:
              break;
          }
        } else {


          await aproveRelation(obj.id)
        }
      } catch (err: any) {

        setItemId(null);
        showMessage(err)
      }
    },
    [descripton, typeIndication, user.id],
  );

  const handleRecused = React.useCallback(
    async ({ item }: TSubmit) => {
      try {
        await api
          .delete(paramsRoutesScheme(item.id).relationShip.delete)
          .then(h => {
            setItemId(null);
          });

      } catch (err) {
        console.log(err)
        setItemId(null);
      }
    },
    [],
  );

  async function submit(obj: IRelationship) {
    if (obj.type === 4) {
      const validate = await consumo.trigger(['valor', 'descricao'])


      if (validate) {
        const dt = {
          ...obj,
          ...consumo.getValues()
        }
        await handleAproved(dt)
      }
      return

    }
    await handleAproved(obj)
  }


  if (loadRelation) return <Loading />


  return (
    <S.Container>
      <Header title='Negócios para aprovar' type="goback" />
      <Modal transparent visible={load} >
        <Center bgColor={'#21211ccf'} flex={1} >
          <ActivityIndicator color={colors.focus[0]} size={_canva} />
        </Center>
      </Modal>

      <S.box>
        <FlatList
          contentContainerStyle={{
            paddingBottom: 150,
          }}
          refreshControl={
            <RefreshControl refreshing={loadRelation} onRefresh={refetch} />
          }
          data={relations}
          keyExtractor={h => String(h.id)}
          renderItem={({ item: h }) => (
            <OrderIndicationComp
              confirmation={() => handleAproved(h)}
              reject={() => handleRecused({ item: h })}
              item={h}
              valueType={h => setTypeIndication(h)}
              load={itemId === h.id}
            >
              <VStack space={3} p='4' >
                <InputForm
                  control={consumo.control}
                  name='descricao'
                  error={consumo.formState.errors.descricao}
                  render={({ value, onChange }) => (
                    <TextArea
                      borderRadius={10}
                      maxLength={100}
                      onChangeText={h => onChange(h)}
                      fontFamily={theme.fonts.regular}
                      fontSize={14}
                      color='gray.200'
                      placeholder='Descreva seu consumo'
                      placeholderTextColor={colors.text[1]}
                    />

                  )}
                />
                <FormInput
                  control={consumo.control}
                  name='valor'
                  error={consumo.formState.errors.valor}
                  mask='money'
                  keyboardType='numeric'
                  placeholder='Valor a ser consumido R$'
                />
              </VStack>
            </OrderIndicationComp>
          )}
          ListEmptyComponent={
            <Center mt={10}>

              <TextStyle colorText={colors.alert[0]} style={{ textAlign: 'center' }} >Não há negócios para validar</TextStyle>
            </Center>
          }
        />
      </S.box>
    </S.Container>
  );
}
