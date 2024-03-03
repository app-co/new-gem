import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { ThemeProvider } from 'styled-components';

import { Center } from 'native-base';
import { LoadData } from '../contexts/LoadDataContext';
import { TokenContext } from '../contexts/Token/context';
import { Pontos } from '../contexts/pontos/context';
import { RelationContex } from '../contexts/relation/context';
import clubMentoriaTheme from '../global/styles/club-mentoria';
import gebTheme from '../global/styles/geb';
import { useAuth } from '../hooks/useAuth';
import { SingIn } from '../pages/LogIn';
import { DrawerApp } from './DrawerApp';

export function Route() {
  const { user, loading } = useAuth();

  const themes = {
    A: gebTheme,
    B: clubMentoriaTheme,
  };

  if (loading) {
    return (
      <Center flex='1' bg={themes.B.colors.bg_color[1]} >
        <ActivityIndicator color={clubMentoriaTheme.colors.focus[1]} size={45} />
      </Center>
    )
  }

  return (
    <NavigationContainer>
      <ThemeProvider theme={themes.B}>
        {user ? (
          <LoadData>
            <Pontos>
              <TokenContext>
                <RelationContex>
                  <DrawerApp />
                </RelationContex>
              </TokenContext>
            </Pontos>
          </LoadData>
        ) : (
          <SingIn />
        )}
      </ThemeProvider>
    </NavigationContainer>
  );
}
