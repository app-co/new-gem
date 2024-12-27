import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { Teste } from '../pages/teste';

const { Navigator, Screen } = createDrawerNavigator();
export function Route() {
  return (
    <Navigator>
      <Screen name="teste" component={Teste} />
    </Navigator>
  );
}
