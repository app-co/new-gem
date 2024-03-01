import { AntDesign } from '@expo/vector-icons';
import React from 'react';

import theme from '../../global/styles/geb';
import { Container } from './styled';

interface Props {
  focus: boolean;
}

export function PostComponent({ focus }: Props) {
  return (
    <Container focus={focus}>
      <AntDesign
        style={{ position: 'absolute' }}
        name="plus"
        size={35}
        color={theme.colors.bg_color[1]}
      />
    </Container>
  );
}
