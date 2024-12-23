/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import { addMonths, format, getMonth, subMonths } from 'date-fns';
import { Box, Center, HStack } from 'native-base';
import React, { useCallback, useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';

import { ExtratoComp } from '../../components/ExtratoComp';
import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { api } from '../../services/api';
import { months } from '../../utils/month';
import * as S from './styles';
import { TextStyle } from '../../components/forms/topograph';
import { colors } from '../../global/hub-colors';
import { make } from '../../hooks';
import { IRelationship } from '../../hooks/dto/interfaces';
import { _convertionType } from '../../components/OrderIndicationComp';

export interface PropTransactions {
  id: string;
  prestador_id: string;
  consumidor: string;
  descricao: string;
  type: 'entrada' | 'saida';
  valor: string;
  updated_at: string;
}

type TType =
  | 'VENDA'
  | 'COMPRA'
  | 'PRESENÇA'
  | 'PADRINHO'
  | 'B2B'
  | 'CONVITE'
  | 'DONATIVOS'
  | 'INDICAÇÃO'
  | "CORRIDA"

const types: TType[] = [
  'VENDA',
  'COMPRA',
  'PRESENÇA',
  'PADRINHO',
  'B2B',
  'CONVITE',
  'DONATIVOS',
  'INDICAÇÃO',
  'CORRIDA'
];

interface IExtrato {
  day: number;
  item: IRelationship[];
  id: number;
}

type T = 'valid' | 'peding';

const byDay = Array.from({ length: 31 }, (_, index) => index + 1);

const { querys } = make()

export function Consumo() {
  const [type, setType] = useState<TType>('VENDA');
  const [date, setDate] = React.useState(new Date());
  const [typeExtrato, setTypeExtrato] = React.useState<T>('valid');

  const { data: relations, isLoading, refetch } = querys.useRelationsMetricasUser()


  const reloaded = React.useCallback(async () => {
    setDate(new Date());
    refetch();
  }, []);

  const handlePlus = React.useCallback(async () => {
    const dt = addMonths(date, 1);

    setDate(dt);
  }, [date]);

  const handleMinus = React.useCallback(async () => {
    const dt = subMonths(date, 1);

    setDate(dt);
  }, [date]);

  //* *..........................................................................

  const currencyDateFormated = format(date, 'MM/yy');


  const handleDeleteOrder = React.useCallback(async (id: string) => {
    await api.delete(`/relation-delete${id}`);
  }, []);

  //* *..........................................................................



  const month = getMonth(date);



  const extrato = React.useMemo(() => {
    const aproveded = relations?.aprovaded
    const notAprovaded = relations?.notAprovaded

    const relationsTypes = [
      aproveded?.COMPRA ?? [],
      aproveded?.VENDA ?? [],
      aproveded?.B2B ?? [],
      aproveded?.INDICAÇÃO ?? [],
      aproveded?.PRESENÇA ?? [],
      aproveded?.DONATIVOS ?? [],
      aproveded?.CONVITES ?? [],
      aproveded?.PADRINHO ?? [],
      aproveded?.CORRIDAS ?? [],
    ]

    const relationsTypesNotAproveded = [
      notAprovaded?.COMPRA ?? [],
      notAprovaded?.VENDA ?? [],
      notAprovaded?.B2B ?? [],
      notAprovaded?.INDICAÇÃO ?? [],
      notAprovaded?.PRESENÇA ?? [],
      notAprovaded?.DONATIVOS ?? [],
      notAprovaded?.CONVITES ?? [],
      notAprovaded?.PADRINHO ?? [],
      notAprovaded?.CORRIDAS ?? [],
    ]


    const validos: { [key: string]: IExtrato[] } = {
      B2B: [] as IExtrato[],
      COMPRA: [] as IExtrato[],
      CONVITES: [] as IExtrato[],
      CORRIDAS: [] as IExtrato[],
      DONATIVOS: [] as IExtrato[],
      INDICAÇÃO: [] as IExtrato[],
      PADRINHO: [] as IExtrato[],
      PRESENÇA: [] as IExtrato[],
      VENDA: [] as IExtrato[],
    }

    const pendente: { [key: string]: IExtrato[] } = {
      B2B: [] as IExtrato[],
      COMPRA: [] as IExtrato[],
      CONVITES: [] as IExtrato[],
      CORRIDAS: [] as IExtrato[],
      DONATIVOS: [] as IExtrato[],
      INDICAÇÃO: [] as IExtrato[],
      PADRINHO: [] as IExtrato[],
      PRESENÇA: [] as IExtrato[],
      VENDA: [] as IExtrato[],
    }

    byDay.forEach(dia => {


      relationsTypes.forEach((type, i) => {
        let dt: IExtrato = {} as IExtrato

        const tp = _convertionType[i + 1]
        const itensByDay = type.filter(item => {
          const day = Number(format(new Date(item!.updated_at), 'dd'));
          if (day === dia) {
            return item
          }
        })

        if (itensByDay) {
          dt = {
            day: dia,
            id: i,
            item: itensByDay as IRelationship[],
          }
        }

        validos[tp].push(dt)
      })

      relationsTypesNotAproveded.forEach((type, i) => {
        let dt: IExtrato = {} as IExtrato

        const tp = _convertionType[i + 1]
        const itensByDay = type.filter(item => {
          const day = Number(format(new Date(item!.updated_at), 'dd'));
          if (day === dia) {
            return item
          }
        })

        if (itensByDay) {
          dt = {
            day: dia,
            id: i,
            item: itensByDay,
          }
        }

        pendente[tp].push(dt)
      })


    })

    return { validos, pendente }

  }, [])


  if (isLoading) {
    return <Loading />;
  }

  return (
    <S.Container>
      <Box my={4}>
        <Header title='Seus consumos' />

      </Box>

      <HStack w="full" justifyContent="space-between" p="3">
        <S.toch
          onPress={() => setTypeExtrato('valid')}
          type={typeExtrato === 'valid'}
        >
          <TextStyle style={{ padding: 4 }} colorText={typeExtrato === 'valid' ? colors.text[2] : colors.text[0]} type='defaultSemiBold' >
            Validados
          </TextStyle>
        </S.toch>

        <S.toch
          onPress={() => setTypeExtrato('peding')}
          type={typeExtrato === 'peding'}
        >
          <TextStyle style={{ padding: 4 }} colorText={typeExtrato === 'peding' ? colors.text[2] : colors.text[0]} type='defaultSemiBold'>
            Negócios pendentes
          </TextStyle>
        </S.toch>
      </HStack>

      <View style={{ height: 70 }}>
        <ScrollView
          horizontal
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            height: 70,
            paddingHorizontal: 20,
          }}
        >
          <S.BoxTypeTransaction>
            {types.map(h => (
              <S.BoxTypeTransactionTouch
                type={h === type}
                onPress={() => setType(h)}
                key={h}
              >
                <S.TextTypeTransaction type={h === type}>
                  {h}
                </S.TextTypeTransaction>
              </S.BoxTypeTransactionTouch>
            ))}
          </S.BoxTypeTransaction>
        </ScrollView>
      </View>

      <HStack
        w="full"
        mb="4"
        justifyContent="space-around"
        alignItems="center"
        p="2"
        px="4"
      >
        <TouchableOpacity style={{ padding: 3 }} onPress={handleMinus}>
          <S.arrowIcon name="arrow-back-ios" size={34} />
        </TouchableOpacity>

        <Center>
          <TextStyle  >{currencyDateFormated}</TextStyle>
          <TextStyle>{months[month]}</TextStyle>

          <S.reloaded onPress={reloaded}>
            <S.titleReload>ATUALIZAR</S.titleReload>
          </S.reloaded>
        </Center>

        <TouchableOpacity style={{ padding: 3 }} onPress={handlePlus}>
          <S.arrowIcon name="arrow-forward-ios" size={34} />
        </TouchableOpacity>
      </HStack>

      {/* <S.BoxTotal>
        {type === 'entrada' && (
          <TextStyle type='subtitle' colorText={colors.text[0]} >Total de vendas no ano</TextStyle>
        )}
        {type === 'saida' && (
          <TextStyle >Total de compras no ano</TextStyle>
        )}
        {type === 'entrada' && (
          <TextStyle>
            {typeExtrato === 'valid'
              ? extratoValidated.totalP
              : extratoPending.totalP}
          </TextStyle>
        )}
        {type === 'saida' && (
          <TextStyle>
            {typeExtrato === 'valid'
              ? extratoValidated.totalC
              : extratoPending.totalC}
          </TextStyle>
        )}
        {type === 'indication' && <TextStyle>Suas inidicações</TextStyle>}
        {type === 'presenca' && <TextStyle>Suas presenças</TextStyle>}
        {type === 'padrinho' && <TextStyle>Seus afilhiados</TextStyle>}
        {type === 'b2b' && <TextStyle>Seus B2Bs</TextStyle>}
        {type === 'donate' && <TextStyle>Seus donativos</TextStyle>}
        {type === 'guest' && <TextStyle>Seus convidados</TextStyle>}
      </S.BoxTotal> */}

      {typeExtrato === 'valid' && (
        <Box>
          {type === 'entrada' && (
            <FlatList
              contentContainerStyle={{
                paddingBottom: 400,
              }}
              data={extrato.validos.VENDA}
              keyExtractor={h => String(h.id)}
              renderItem={({ item: h }) => (
                <ExtratoComp day={h?.day} item={h?.item} />
              )}
            />
          )}

          {type === 'saida' && (
            <FlatList
              contentContainerStyle={{
                paddingBottom: 400,
              }}
              data={extrato.validos.COMPRA}
              keyExtractor={h => String(h.id)}
              renderItem={({ item: h }) => (
                <ExtratoComp day={h.day} item={h.item} />
              )}
            />
          )}

          {type === 'indication' && (
            <FlatList
              contentContainerStyle={{
                paddingBottom: 400,
              }}
              data={extrato.validos.INDICAÇÃO}
              keyExtractor={h => String(h.id)}
              renderItem={({ item: h }) => (
                <ExtratoComp day={h.day} item={h.item} />
              )}
            />
          )}

          {type === 'presenca' && (
            <FlatList
              contentContainerStyle={{
                paddingBottom: 400,
              }}
              data={extrato.validos.PRESENÇA}
              keyExtractor={h => String(h.id)}
              renderItem={({ item: h }) => (
                <ExtratoComp day={h.day} item={h.item} />
              )}
            />
          )}

          {type === 'b2b' && (
            <FlatList
              contentContainerStyle={{
                paddingBottom: 400,
              }}
              data={extrato.validos.B2B}
              keyExtractor={h => String(h.id)}
              renderItem={({ item: h }) => (
                <ExtratoComp day={h.day} item={h.item} />
              )}
            />
          )}

          {type === 'guest' && (
            <FlatList
              contentContainerStyle={{
                paddingBottom: 400,
              }}

              data={extrato.validos.CONVITES}
              keyExtractor={h => String(h.id)}
              renderItem={({ item: h }) => (
                <ExtratoComp day={h.day} item={h.item} />
              )}
            />
          )}

          {type === 'padrinho' && (
            <FlatList
              contentContainerStyle={{
                paddingBottom: 400,
              }}
              data={extrato.validos.PADRINHO}
              keyExtractor={h => String(h.id)}
              renderItem={({ item: h }) => (
                <ExtratoComp day={h.day} item={h.item} />
              )}
            />
          )}

          {type === 'donate' && (
            <FlatList
              contentContainerStyle={{
                paddingBottom: 400,
              }}
              data={extrato.validos.DONATIVOS}
              keyExtractor={h => String(h.id)}
              renderItem={({ item: h }) => (
                <ExtratoComp day={h.day} item={h.item} />
              )}
            />
          )}
        </Box>
      )}

      {typeExtrato === 'peding' && (
        <Box>
          {type === 'entrada' && (
            <FlatList
              contentContainerStyle={{
                paddingBottom: 400,
              }}
              data={extrato.pendente.VENDA}
              keyExtractor={h => String(h.id)}
              renderItem={({ item: h }) => (
                <ExtratoComp day={h.day} item={h.item} />
              )}
            />
          )}

          {type === 'saida' && (
            <FlatList
              contentContainerStyle={{
                paddingBottom: 400,
              }}
              data={extrato.pendente.COMPRA}
              keyExtractor={h => String(h.id)}
              renderItem={({ item: h }) => (
                <ExtratoComp day={h.day} item={h.item} />
              )}
            />
          )}

          {type === 'indication' && (
            <FlatList
              contentContainerStyle={{
                paddingBottom: 400,
              }}
              data={extrato.pendente.INDICAÇÃO}
              keyExtractor={h => String(h.id)}
              renderItem={({ item: h }) => (
                <ExtratoComp day={h.day} item={h.item} />
              )}
            />
          )}

          {type === 'presenca' && (
            <FlatList
              contentContainerStyle={{
                paddingBottom: 400,
              }}
              data={extrato.pendente.PRESENÇA}
              keyExtractor={h => String(h.id)}
              renderItem={({ item: h }) => (
                <ExtratoComp day={h.day} item={h.item} />
              )}
            />
          )}

          {type === 'b2b' && (
            <FlatList
              contentContainerStyle={{
                paddingBottom: 400,
              }}
              data={extrato.pendente.B2B}
              keyExtractor={h => String(h.id)}
              renderItem={({ item: h }) => (
                <ExtratoComp day={h.day} item={h.item} />
              )}
            />
          )}

          {type === 'guest' && (
            <FlatList
              contentContainerStyle={{
                paddingBottom: 400,
              }}
              data={extrato.pendente.CONVITE}
              keyExtractor={h => String(h.id)}
              renderItem={({ item: h }) => (
                <ExtratoComp day={h.day} item={h.item} />
              )}
            />
          )}

          {type === 'padrinho' && (
            <FlatList
              contentContainerStyle={{
                paddingBottom: 400,
              }}
              data={extrato.pendente.PADRINHO}
              keyExtractor={h => String(h.id)}
              renderItem={({ item: h }) => (
                <ExtratoComp day={h.day} item={h.item} />
              )}
            />
          )}

          {type === 'donate' && (
            <FlatList
              contentContainerStyle={{
                paddingBottom: 400,
              }}
              data={extrato.pendente.DONATIVOS}
              keyExtractor={h => String(h.id)}
              renderItem={({ item: h }) => (
                <ExtratoComp day={h.day} item={h.item} />
              )}
            />
          )}

          {type === 'donate' && (
            <FlatList
              contentContainerStyle={{
                paddingBottom: 400,
              }}
              data={extrato.pendente.DONATIVOS}
              keyExtractor={h => String(h.id)}
              renderItem={({ item: h }) => (
                <ExtratoComp day={h.day} item={h.item} />
              )}
            />
          )}
        </Box>
      )}
    </S.Container>
  );
}
