/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import { useFocusEffect } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import { Header } from '../../../components/Header';
import { Loading } from '../../../components/Loading';
import { useRelation } from '../../../contexts/relation';
import { useData } from '../../../contexts/useData';
import {
  IPresensaRelation
} from '../../../dtos';
import { api } from '../../../services/api';
import * as S from './styles';

export interface ProsPresenca {
  createdAt: string;
  id: string;
  presenca: boolean;
  user_id: string;
  nome: string;
  avatar: string;
  data: string;
}

export function ListPresenca() {
  const { users } = useData();
  const [presenca, setPresenca] = useState<any[]>([]);
  const [load, setLoad] = React.useState(true);
  const { listAllRelation } = useRelation();

  const presendaData = (listAllRelation.data as IPresensaRelation[]) || [];

  const listAll = presendaData.filter(h => {
    if (h.situation === false && h.type === 'PRESENCA') {
      return h;
    }
  }) as IPresensaRelation[];

  const list = React.useMemo(() => {
    return listAll.map(respo => {
      return {
        ...respo,
        data: format(new Date(respo.created_at), 'dd/MM/yy'),
      };
    });
  }, [listAll]);

  useFocusEffect(
    useCallback(() => {
      listAllRelation.refetch();
    }, []),
  );

  const handleValidatePresensa = useCallback(async (id: string) => {
    setLoad('');

    const dados = {
      id,
      situation: true,
    };

    await api
      .put('/relation-update', dados)
      .then(() => {
        listAllRelation.refetch();
      })
      .catch(h => Alert.alert('Erro', h.response.data));
  }, []);

  const handleDescartar = useCallback(
    async (id: string) => {
      await api
        .delete(`/relation-delete/${id}`)
        .then(h => {
          Alert.alert('', 'presensa cancelada');
          listAllRelation.refetch();
        })
        .catch(h => {
          console.log(h);
        });
    },
    [listAllRelation],
  );

  if (listAllRelation.isLoading) {
    return <Loading />;
  }

  return (
    <S.Container>
      <Header />
      {/* <FlatList
        contentContainerStyle={{
          paddingBottom: 200,
        }}
        data={list}
        keyExtractor={h => h.id!}
        renderItem={({ item: h }) => (
          <ListMembro
            descartar={() => {
              handleDescartar(h.id!);
            }}
            confirmar="Confirmar"
            nome={h.objto.user_name}
            data={h.data}
            avatar={h.objto.avatar}
            pres={() => handleValidatePresensa(h.id!)}
          />
        )}
      /> */}
    </S.Container>
  );
}
