import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Sucess } from '../pages/businnes/pages/sucess';
import { Businnes } from '../pages/businnes/pages/users';
import { Segments } from '../pages/businnes/pages/segmentos';

const Stak = createNativeStackNavigator();
export function StacKMembros() {
  return (
    <Stak.Navigator screenOptions={{ headerShown: false }}>

      <Stak.Screen name="businnes" component={Businnes} />
      <Stak.Screen name="segments" component={Segments} />
      <Stak.Screen name="sucess" component={Sucess} />
    </Stak.Navigator>
  );
}
