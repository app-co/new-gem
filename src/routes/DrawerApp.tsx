/* eslint-disable react/no-unstable-nested-components */
import { Feather, FontAwesome } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { DrawerContent } from '../components/DrawerComponent';
import theme from '../global/styles/club-mentoria';
import { useAuth } from '../hooks/useAuth';
import { rotas } from '../utils/rotas';
import { colors } from '../global/hub-colors';
import { Ranking } from '../pages/ADM/Classificacao';
import { DeletUser } from '../pages/ADM/DeleteUser';
import { UploadAvatar } from '../pages/ADM/UploadAvatar';
import { SingUp } from '../pages/ADM/CreateUser';
import { ValidateEventos } from '../pages/ADM/Eventos';

const { Navigator, Screen } = createDrawerNavigator();

export function DrawerApp() {
  const { user } = useAuth();

  const rotasAdm = [

    {
      color: theme.colors.bg_color[2],
      name: 'CADASTRAR MEMBRO',
      component: SingUp,
      icon: 'user-plus',
    },
    {
      color: colors.alert[0],
      name: 'VALIDAR EVENTOS',
      component: ValidateEventos,
      icon: 'life-buoy',
    },

    // {
    //   color: theme.colors.bg_color[2],
    //   name: 'ALTERAR SENHA DE UM MEMBRO',
    //   component: UpdateSenhaUser,
    //   icon: '',
    // },
    {
      color: theme.colors.bg_color[2],
      name: 'EXCLUIR MEMBROS',
      component: DeletUser,
      icon: '',
    },

    {
      color: theme.colors.bg_color[2],
      name: 'Carregar Avatar',
      component: UploadAvatar,
      icon: '',
    },
    // {
    //   color: theme.colors.bg_color[2],
    //   name: 'INATIVAR UM MEMBRO',
    //   component: Inativo,
    //   icon: '',
    // },
  ];


  if (user.adm && user.id !== 'uoOhUXoya2bNL3n3ohL5yJHC9h52') {
    rotasAdm.push(
      {
        color: theme.colors.bg_color[2],
        name: 'RANKING',
        component: Ranking,
        icon: '',
      },
    )
  }



  return (
    <Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        headerShown: false,
      }}
    >

      {rotas.map(h => (
        <Screen
          key={h.name}
          options={{
            drawerActiveBackgroundColor: colors.bg_color[3],
            drawerActiveTintColor: colors.focus[0],
            drawerInactiveTintColor: colors.text[1],
            drawerIcon: ({ focused, size }) => (
              <FontAwesome
                name={h.icon}
                size={size}
                color={focused ? h.focus : h.color}
              />
            ),
          }}
          name={h.name}
          component={h.component}
        />
      ))}

      {user.adm &&
        rotasAdm.map(h => (
          <Screen
            key={h.name}
            options={{
              drawerActiveBackgroundColor: theme.colors.bg_color[1],
              drawerActiveTintColor: colors.alert[0],
              drawerInactiveTintColor: colors.text[1],
              drawerIcon: ({ focused, size }) => (
                <Feather name={h.icon} size={size} color={focused ? h.color : colors.text[1]} />
              ),
            }}
            name={h.name}
            component={h.component}
          />
        ))}
    </Navigator>
  );
}
