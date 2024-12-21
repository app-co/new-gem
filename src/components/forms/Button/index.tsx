import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';

import { Container, Title } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  pres: () => void;
  loading: boolean
}
export function Button({ title, loading, pres }: Props) {
  return (
    <Container onPress={pres}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Title>{title}</Title>

      )}
    </Container>
  );
}
