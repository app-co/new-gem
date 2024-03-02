import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { ThemeProvider } from 'styled-components';

import { LoadData } from '../contexts/LoadDataContext';
import { PadrinhoContext } from '../contexts/padrinho/context';
import { Pontos } from '../contexts/pontos/context';
import { RelationContex } from '../contexts/relation/context';
import { TokenContext } from '../contexts/Token/context';
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
    return <ActivityIndicator color={clubMentoriaTheme.colors.focus[1]} size={45} />;
  }

  return (
    <NavigationContainer>
      <ThemeProvider theme={themes.B}>
        {user ? (
          <LoadData>
            <Pontos>
              <PadrinhoContext>
                <TokenContext>
                  <RelationContex>
                    <DrawerApp />
                  </RelationContex>
                </TokenContext>
              </PadrinhoContext>
            </Pontos>
          </LoadData>
        ) : (
          <SingIn />
        )}
      </ThemeProvider>
    </NavigationContainer>
  );
}
