/* eslint-disable react/jsx-no-constructed-context-values */

import React, { ReactNode, createContext } from 'react';
import { QueryObserverBaseResult, useQuery } from 'react-query';

import {
  IRelashionship,
  IRelashionshipCreate,
  IRelashionshipUpdate,
} from '../../dtos';
import { api } from '../../services/api';

interface ICreateContextData {
  listAllRelation: QueryObserverBaseResult;
  listProviderRelation: QueryObserverBaseResult;

  relationCreate(item: IRelashionshipCreate): Promise<void>;
  relationUpdate(item: IRelashionshipUpdate): Promise<void>;
  relationDelete(id: string): Promise<void>;
}

type TCreation = {
  children: ReactNode;
};

export const RelationContexProvider = createContext({} as ICreateContextData);

export function RelationContex({ children }: TCreation) {
  const listAllRelation = useQuery('relation-all', async () => {
    const res = await api.get('/relation');
    return res.data;
  });

  const listProviderRelation = useQuery('relation-provider', async () => {
    const res = await api.get('/relation/prestador');
    return res.data;
  });

  const relationCreate = React.useCallback(async (item: IRelashionship) => {
    await api
      .post('/relation-upate', item)
      .then(h => console.log(h.data, 'sucess'))
      .catch(h => console.log(h.response.data, 'error'));
  }, []);

  const relationUpdate = React.useCallback(
    async (item: IRelashionshipUpdate) => {
      await api.put('/relation-update', item).then(() => {
        listProviderRelation.refetch();
      });
    },
    [listProviderRelation],
  );

  const relationDelete = React.useCallback(async (id: string) => {
    await api.delete(`/relation-delete/${id}`);
  }, []);

  return (
    <RelationContexProvider.Provider
      value={{
        listAllRelation,
        listProviderRelation,
        relationCreate,
        relationUpdate,
        relationDelete,
      }}
    >
      {children}
    </RelationContexProvider.Provider>
  );
}
