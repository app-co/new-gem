/* eslint-disable react/no-unstable-nested-components */
import { Feather, FontAwesome } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { DrawerContent } from '../components/DrawerComponent';
import theme from '../global/styles/club-mentoria';
import { useAuth } from '../hooks/useAuth';
import { rotas, rotasAdm } from '../utils/rotas';

const { Navigator, Screen } = createDrawerNavigator();

export function DrawerApp() {
  const { user } = useAuth();

  // const { adm } = user.user;
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
            drawerActiveBackgroundColor: theme.colors.bg_color[1],
            drawerActiveTintColor: theme.colors.focus[1],
            drawerInactiveTintColor: theme.colors.color_text.ligh,
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
              drawerActiveTintColor: theme.colors.focus[1],
              drawerInactiveTintColor: theme.colors.color_text.ligh,
              drawerIcon: ({ focused, size }) => (
                <Feather name={h.icon} size={size} color={focused} />
              ),
            }}
            name={h.name}
            component={h.component}
          />
        ))}
    </Navigator>
  );
}
