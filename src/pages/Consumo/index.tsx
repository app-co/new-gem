/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import { useFocusEffect } from '@react-navigation/native';
import { addMonths, format, getMonth, subMonths } from 'date-fns';
import { Box, Center, HStack } from 'native-base';
import React, { useCallback, useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { useQuery } from 'react-query';

import { ExtratoComp } from '../../components/ExtratoComp';
import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { IRelashionship } from '../../dtos';
import theme from '../../global/styles/club-mentoria';
import { api } from '../../services/api';
import { months } from '../../utils/month';
import * as S from './styles';

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
  | 'entrada'
  | 'saida'
  | 'presenca'
  | 'padrinho'
  | 'b2b'
  | 'guest'
  | 'donate'
  | 'indication';

const types = [
  { type: 'entrada', name: 'Entrada', id: '1' },
  { type: 'saida', name: 'Saida', id: '2' },
  { type: 'indication', name: 'Indicações', id: '8' },
  { type: 'presenca', name: 'Presença', id: '3' },
  { type: 'b2b', name: 'B2B', id: '5' },
  { type: 'guest', name: 'Convidados', id: '6' },
  { type: 'donate', name: 'Donativos', id: '7' },
  { type: 'padrinho', name: 'Padrinho', id: '4' },
];

interface IResponse {
  consumo: IRelashionship[];
  venda: IRelashionship[];
  b2b: IRelashionship[];
  donate: IRelashionship[];
  indication: IRelashionship[];
  padrinho: IRelashionship[];
  presenca: IRelashionship[];
  totalConsumo: string;
  totalVenda: string;
  invit: IRelashionship[];
}

interface IExtrato {
  day: number;
  item: IRelashionship[];
  id: number;
}

type T = 'valid' | 'peding';
const byDay = Array.from({ length: 31 }, (_, index) => index + 1);

export function Consumo() {
  const [type, setType] = useState<TType>('entrada');
  const [date, setDate] = React.useState(new Date());
  const [typeExtrato, setTypeExtrato] = React.useState<T>('valid');

  const validated = useQuery('valid-consumo', async () => {
    const rs = await api.get('/relation/extrato-valid');

    return rs.data as IResponse;
  });

  const peding = useQuery('peding-consumo', async () => {
    const rs = await api.get('/relation/extrato-peding');

    return rs.data as IResponse;
  });

  const reloaded = React.useCallback(async () => {
    setDate(new Date());
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

  const extratoValidated = React.useMemo(() => {
    const currencyConsumo = validated.data?.totalConsumo;
    const currenyVenda = validated.data?.totalVenda;

    const vendaByDay: IExtrato[] = [];
    const consumoByDay: IExtrato[] = [];
    const indByDay: IExtrato[] = [];
    const b2bByDay: IExtrato[] = [];
    const presByDay: IExtrato[] = [];
    const danateByDay: IExtrato[] = [];
    const invitByDay: IExtrato[] = [];
    const padrinhoByDay: IExtrato[] = [];

    const venda = validated?.data?.venda.filter(h => {
      const updated = format(new Date(h.updated_at), 'MM/yy');

      if (updated === currencyDateFormated) {
        return h;
      }
    });

    const consumo = validated?.data?.consumo.filter(h => {
      const updated = format(new Date(h.updated_at), 'MM/yy');

      if (updated === currencyDateFormated) {
        return h;
      }
    });

    const b2b = validated?.data?.b2b.filter(h => {
      const updated = format(new Date(h.updated_at), 'MM/yy');

      if (updated === currencyDateFormated) {
        return h;
      }
    });

    const indication = validated?.data?.indication.filter(h => {
      const updated = format(new Date(h.updated_at), 'MM/yy');

      if (updated === currencyDateFormated) {
        return h;
      }
    });

    const invit = validated?.data?.invit.filter(h => {
      const updated = format(new Date(h.updated_at), 'MM/yy');

      if (updated === currencyDateFormated) {
        return h;
      }
    });

    const donate = validated?.data?.donate.filter(h => {
      const updated = format(new Date(h.updated_at), 'MM/yy');

      if (updated === currencyDateFormated) {
        return h;
      }
    });

    const presenca = validated?.data?.presenca.filter(h => {
      const updated = format(new Date(h.updated_at), 'MM/yy');

      if (updated === currencyDateFormated) {
        return h;
      }
    });

    const padrinho = validated?.data?.padrinho.filter(h => {
      const updated = format(new Date(h.updated_at), 'MM/yy');

      if (updated === currencyDateFormated) {
        return h;
      }
    });

    byDay.forEach(day => {
      const item: IRelashionship[] = [];

      venda?.forEach(venda => {
        const dayVenda = Number(format(new Date(venda.updated_at), 'dd'));

        if (day === dayVenda) {
          item.push(venda);
        }
      });

      const dt = {
        id: day + Math.random(),
        day,
        item,
      };

      vendaByDay.push(dt);
    });

    byDay.forEach(day => {
      const item: IRelashionship[] = [];

      consumo?.forEach(venda => {
        const dayVenda = Number(format(new Date(venda.updated_at), 'dd'));

        if (day === dayVenda) {
          item.push(venda);
        }
      });

      const dt = {
        id: day + Math.random(),
        day,
        item,
      };

      consumoByDay.push(dt);
    });

    byDay.forEach(day => {
      const item: IRelashionship[] = [];

      indication?.forEach(venda => {
        const dayVenda = Number(format(new Date(venda.updated_at), 'dd'));

        if (day === dayVenda) {
          item.push(venda);
        }
      });

      const dt = {
        id: day + Math.random(),
        day,
        item,
      };

      indByDay.push(dt);
    });

    byDay.forEach(day => {
      const item: IRelashionship[] = [];

      b2b?.forEach(venda => {
        const dayVenda = Number(format(new Date(venda.updated_at), 'dd'));

        if (day === dayVenda) {
          item.push(venda);
        }
      });

      const dt = {
        id: day + Math.random(),
        day,
        item,
      };

      b2bByDay.push(dt);
    });

    byDay.forEach(day => {
      const item: IRelashionship[] = [];

      presenca?.forEach(venda => {
        const dayVenda = Number(format(new Date(venda.updated_at), 'dd'));

        if (day === dayVenda) {
          item.push(venda);
        }
      });

      const dt = {
        id: day + Math.random(),
        day,
        item,
      };

      presByDay.push(dt);
    });

    byDay.forEach(day => {
      const item: IRelashionship[] = [];

      donate?.forEach(venda => {
        const dayVenda = Number(format(new Date(venda.updated_at), 'dd'));

        if (day === dayVenda) {
          item.push(venda);
        }
      });

      const dt = {
        id: day + Math.random(),
        day,
        item,
      };

      danateByDay.push(dt);
    });

    byDay.forEach(day => {
      const item: IRelashionship[] = [];

      invit?.forEach(venda => {
        const dayVenda = Number(format(new Date(venda.updated_at), 'dd'));

        if (day === dayVenda) {
          item.push(venda);
        }
      });

      const dt = {
        id: day + Math.random(),
        day,
        item,
      };

      invitByDay.push(dt);
    });

    byDay.forEach(day => {
      const item: IRelashionship[] = [];

      padrinho?.forEach(venda => {
        const dayVenda = Number(format(new Date(venda.updated_at), 'dd'));

        if (day === dayVenda) {
          item.push(venda);
        }
      });

      const dt = {
        id: day + Math.random(),
        day,
        item,
      };

      padrinhoByDay.push(dt);
    });

    return {
      totalC: currencyConsumo,
      totalP: currenyVenda,
      venda: vendaByDay,
      consumo: consumoByDay,
      invit: invitByDay,
      donate: danateByDay,
      padrinho: padrinhoByDay,
      presenca: presByDay,
      indication: indByDay,
      b2b: b2bByDay,
    };
  }, [currencyDateFormated, validated.data]);

  const extratoPending = React.useMemo(() => {
    const currencyConsumo = peding.data?.totalConsumo;
    const currenyVenda = peding.data?.totalVenda;

    const vendaByDay: IExtrato[] = [];
    const consumoByDay: IExtrato[] = [];
    const indByDay: IExtrato[] = [];
    const b2bByDay: IExtrato[] = [];
    const presByDay: IExtrato[] = [];
    const danateByDay: IExtrato[] = [];
    const invitByDay: IExtrato[] = [];
    const padrinhoByDay: IExtrato[] = [];

    const venda = peding?.data?.venda.filter(h => {
      const updated = format(new Date(h.updated_at), 'MM/yy');

      if (updated === currencyDateFormated) {
        return h;
      }
    });

    const consumo = peding?.data?.consumo.filter(h => {
      const updated = format(new Date(h.updated_at), 'MM/yy');

      if (updated === currencyDateFormated) {
        return h;
      }
    });

    const b2b = peding?.data?.b2b.filter(h => {
      const updated = format(new Date(h.updated_at), 'MM/yy');

      if (updated === currencyDateFormated) {
        return h;
      }
    });

    const indication = peding?.data?.indication.filter(h => {
      const updated = format(new Date(h.updated_at), 'MM/yy');

      if (updated === currencyDateFormated) {
        return h;
      }
    });

    const invit = peding?.data?.invit.filter(h => {
      const updated = format(new Date(h.updated_at), 'MM/yy');

      if (updated === currencyDateFormated) {
        return h;
      }
    });

    const donate = peding?.data?.donate.filter(h => {
      const updated = format(new Date(h.updated_at), 'MM/yy');

      if (updated === currencyDateFormated) {
        return h;
      }
    });

    const presenca = peding?.data?.presenca.filter(h => {
      const updated = format(new Date(h.updated_at), 'MM/yy');

      if (updated === currencyDateFormated) {
        return h;
      }
    });

    const padrinho = peding?.data?.padrinho.filter(h => {
      const updated = format(new Date(h.updated_at), 'MM/yy');

      if (updated === currencyDateFormated) {
        return h;
      }
    });

    byDay.forEach(day => {
      const item: IRelashionship[] = [];

      venda?.forEach(venda => {
        const dayVenda = Number(format(new Date(venda.updated_at), 'dd'));

        if (day === dayVenda) {
          item.push(venda);
        }
      });

      const dt = {
        id: day + Math.random(),
        day,
        item,
      };

      vendaByDay.push(dt);
    });

    byDay.forEach(day => {
      const item: IRelashionship[] = [];

      consumo?.forEach(venda => {
        const dayVenda = Number(format(new Date(venda.updated_at), 'dd'));

        if (day === dayVenda) {
          item.push(venda);
        }
      });

      const dt = {
        id: day + Math.random(),
        day,
        item,
      };

      consumoByDay.push(dt);
    });

    byDay.forEach(day => {
      const item: IRelashionship[] = [];

      indication?.forEach(venda => {
        const dayVenda = Number(format(new Date(venda.updated_at), 'dd'));

        if (day === dayVenda) {
          item.push(venda);
        }
      });

      const dt = {
        id: day + Math.random(),
        day,
        item,
      };

      indByDay.push(dt);
    });

    byDay.forEach(day => {
      const item: IRelashionship[] = [];

      b2b?.forEach(venda => {
        const dayVenda = Number(format(new Date(venda.updated_at), 'dd'));

        if (day === dayVenda) {
          item.push(venda);
        }
      });

      const dt = {
        id: day + Math.random(),
        day,
        item,
      };

      b2bByDay.push(dt);
    });

    byDay.forEach(day => {
      const item: IRelashionship[] = [];

      presenca?.forEach(venda => {
        const dayVenda = Number(format(new Date(venda.updated_at), 'dd'));

        if (day === dayVenda) {
          item.push(venda);
        }
      });

      const dt = {
        id: day + Math.random(),
        day,
        item,
      };

      presByDay.push(dt);
    });

    byDay.forEach(day => {
      const item: IRelashionship[] = [];

      donate?.forEach(venda => {
        const dayVenda = Number(format(new Date(venda.updated_at), 'dd'));

        if (day === dayVenda) {
          item.push(venda);
        }
      });

      const dt = {
        id: day + Math.random(),
        day,
        item,
      };

      danateByDay.push(dt);
    });

    byDay.forEach(day => {
      const item: IRelashionship[] = [];

      invit?.forEach(venda => {
        const dayVenda = Number(format(new Date(venda.updated_at), 'dd'));

        if (day === dayVenda) {
          item.push(venda);
        }
      });

      const dt = {
        id: day + Math.random(),
        day,
        item,
      };

      invitByDay.push(dt);
    });

    byDay.forEach(day => {
      const item: IRelashionship[] = [];

      padrinho?.forEach(venda => {
        const dayVenda = Number(format(new Date(venda.updated_at), 'dd'));

        if (day === dayVenda) {
          item.push(venda);
        }
      });

      const dt = {
        id: day + Math.random(),
        day,
        item,
      };

      padrinhoByDay.push(dt);
    });

    return {
      totalC: currencyConsumo,
      totalP: currenyVenda,
      venda: vendaByDay,
      consumo: consumoByDay,
      invit: invitByDay,
      donate: danateByDay,
      padrinho: padrinhoByDay,
      presenca: presByDay,
      indication: indByDay,
      b2b: b2bByDay,
    };
  }, [currencyDateFormated, peding.data]);

  const handleDeleteOrder = React.useCallback(async (id: string) => {
    await api.delete(`/relation-delete${id}`);
  }, []);

  //* *..........................................................................

  useFocusEffect(
    useCallback(() => {
      validated.refetch();
      peding.refetch();
    }, []),
  );

  const month = getMonth(date);

  if (validated.isLoading) {
    return <Loading />;
  }

  return (
    <S.Container>
      <Header />

      <HStack w="full" justifyContent="space-between" p="3">
        <S.toch
          onPress={() => setTypeExtrato('valid')}
          type={typeExtrato === 'valid'}
        >
          <S.titleToch type={typeExtrato === 'valid'}>
            Relações validadas
          </S.titleToch>
        </S.toch>

        <S.toch
          onPress={() => setTypeExtrato('peding')}
          type={typeExtrato === 'peding'}
        >
          <S.titleToch type={typeExtrato === 'peding'}>
            Relações pendentes
          </S.titleToch>
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
                type={h.type === type}
                onPress={() => setType(h.type)}
                key={h.id}
              >
                <S.TextTypeTransaction type={h.type === type}>
                  {h.name}
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
          <S.text style={{ color: theme.colors.color_text.ligh }} >{currencyDateFormated}</S.text>
          <S.title>{months[month]}</S.title>

          <S.reloaded onPress={reloaded}>
            <S.titleReload>ATUALIZAR</S.titleReload>
          </S.reloaded>
        </Center>

        <TouchableOpacity style={{ padding: 3 }} onPress={handlePlus}>
          <S.arrowIcon name="arrow-forward-ios" size={34} />
        </TouchableOpacity>
      </HStack>

      <S.BoxTotal>
        {type === 'saida' && (
          <S.title>Total de consumo no ano</S.title>
        )}
        {type === 'entrada' && (
          <S.title>Total de venda no ano</S.title>
        )}
        {type === 'entrada' && (
          <S.Text>
            {typeExtrato === 'valid'
              ? extratoValidated.totalP
              : extratoPending.totalP}
          </S.Text>
        )}
        {type === 'saida' && (
          <S.Text>
            {typeExtrato === 'valid'
              ? extratoValidated.totalC
              : extratoPending.totalC}
          </S.Text>
        )}
        {type === 'indication' && <S.Text>Suas inidicações</S.Text>}
        {type === 'presenca' && <S.Text>Suas presenças</S.Text>}
        {type === 'padrinho' && <S.Text>Seus afilhiados</S.Text>}
        {type === 'b2b' && <S.Text>Seus B2Bs</S.Text>}
        {type === 'donate' && <S.Text>Seus donativos</S.Text>}
        {type === 'guest' && <S.Text>Seus convidados</S.Text>}
      </S.BoxTotal>

      {typeExtrato === 'valid' && (
        <Box>
          {type === 'entrada' && (
            <FlatList
              contentContainerStyle={{
                paddingBottom: 400,
              }}
              data={extratoValidated.venda}
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
              data={extratoValidated.consumo}
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
              data={extratoValidated.indication}
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
              data={extratoValidated.presenca}
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
              data={extratoValidated.b2b}
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
              data={extratoValidated.invit}
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
              data={extratoValidated.padrinho}
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
              data={extratoValidated.donate}
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
              data={extratoPending.venda}
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
              data={extratoPending.consumo}
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
              data={extratoPending.indication}
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
              data={extratoPending.presenca}
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
              data={extratoPending.b2b}
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
              data={extratoPending.invit}
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
              data={extratoPending.padrinho}
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
              data={extratoPending.donate}
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
