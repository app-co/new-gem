/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from 'react-query';

import { IStars, IUserDtos } from '../../dtos';
import { api } from '../../services/api';

export async function getUsers(hub: string) {
  const { data } = await api.get(`/user/list-all-user/${hub}`);


  const list = data as IUserDtos[];

  const users = list
    .filter(h => h.situation.inativo !== true)
    .map(h => {
      const total = h.Stars.length === 0 ? 1 : h.Stars.length;
      let star = 0;

      h.Stars.forEach((h: IStars) => {
        star += h.star;
      });
      const md = star / total;
      const value = Number(md.toFixed(0)) === 0 ? 1 : Number(md.toFixed(0));

      const data = {
        ...h,
        media: value,
      };

      return data;
    });

  return users;
}

export function useAllUsers(hub: string) {
  return useQuery('all-users', () => getUsers(hub));
}
