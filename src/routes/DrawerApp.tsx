/* eslint-disable react/no-unstable-nested-components */
import { Feather, FontAwesome } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { DrawerContent } from '../components/DrawerComponent';
import theme from '../global/styles/club-mentoria';
import { useAuth } from '../hooks/useAuth';
import { rotas, rotasAdm } from '../utils/rotas';
import { colors } from '../global/hub-colors';

const { Navigator, Screen } = createDrawerNavigator();

export function DrawerApp() {
  const { user } = useAuth();

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
