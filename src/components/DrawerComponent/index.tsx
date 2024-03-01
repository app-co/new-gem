/* eslint-disable react/jsx-props-no-spreading */
import {
  DrawerContentComponentProps,
  DrawerItemList,
} from '@react-navigation/drawer';
import { HStack, VStack } from 'native-base';
import React from 'react';
import { ScrollView, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import theme from '../../global/styles/club-mentoria';
import { useAuth } from '../../hooks/useAuth';
import { Avatar, Container, Header, LogOf, Title, TitleName } from './styles';

type Props = DrawerContentComponentProps;

export function DrawerContent({ ...props }: Props) {
  const { logOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HStack maxW={200}>
          <Avatar source={{ uri: user?.profile?.avatar }} />
          <VStack ml={5}>
            <Text
              style={{
                color: theme.colors.color_text.dark,
                fontSize: RFValue(18),
              }}
            >
              Olá
            </Text>
            <TitleName>{user?.nome}</TitleName>
          </VStack>
        </HStack>
      </Header>

      <ScrollView>
        <DrawerItemList {...props} />

        <LogOf
          onPress={() => {
            logOut();
          }}
        >
          <Title style={{ color: theme.colors.color_text.dark }}>SAIR</Title>
        </LogOf>
      </ScrollView>
    </Container>
  );
}
