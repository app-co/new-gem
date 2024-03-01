/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line no-underscore-dangle

interface I {
  params?: string;
}

export const routesScheme = {
  relationShip: {
    create: `/relation-create`,
    list_by_provider: 'relation/prestador',
    update: `/relation-update`,
  },

  users: {
    list_all_users: '/user/list-all-user',
    self_ponts: '/user/global-rank-ind',
    login: '/user/session',
  },
};

export function paramsRoutesScheme(params: string) {
  const routes = {
    relationShip: {
      create: `/relation-create`,
      list_by_provider: 'relation/prestador',
      delete: `/relation-delete/${params}`,
    },
  };

  return routes;
}
