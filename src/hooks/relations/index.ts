import { useQuery } from 'react-query';

import { IRelashionship } from '../../dtos';
import { api } from '../../services/api';
import { routesScheme } from '../../services/schemeRoutes';

interface I {
  relation: IRelashionship[];
  totalValor: string;
}

type TMetric = {
  usersUp: number;
  metricValidByYear: number;
  metricValidByMonth: number;
  padding_media_transaction: number;
  valid_media_transaction: number;
  amount_accumulated: number;
};

export async function solitations(): Promise<I> {
  const response = await api.get(routesScheme.relationShip.list_by_provider);
  const orders = response.data as I;

  const l = orders.totalValor;

  const fil = orders.relation.filter(
    h =>
      h.situation === false &&
      h.type !== 'PRESENCA' &&
      h.type !== 'DONATE' &&
      h.type !== 'INVIT',
  );

  const rs = {
    relation: fil,
    totalValor: l,
  };

  return rs;
}

export async function getAlRelation(): Promise<IRelashionship[]> {
  const { data } = await api.get('/relation');
  const response = data as IRelashionship[];
  const relation = response.filter(
    h => h.situation === true,
  ) as IRelashionship[];
  return relation;
}

export async function getMetric() {
  const { data } = await api.get('/relation/metric');

  return data as TMetric;
}

export function useOrderRelation() {
  return useQuery('relation-orders', solitations);
}

export function useAllRelation() {
  return useQuery('all-relation', getAlRelation);
}

export function useMetric() {
  return useQuery('get-metric', getMetric);
}
