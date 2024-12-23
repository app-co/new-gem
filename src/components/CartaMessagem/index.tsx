import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Box, Circle, Text } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import theme from '../../global/styles/club-mentoria';
import { colors } from '../../global/hub-colors';
import { TextStyle } from '../forms/topograph';

interface Props {
  pres: () => void;
  quantity: number;
}

export function CartaMessagem({ pres, quantity }: Props) {
  return (
    <Box>
      <TouchableOpacity onPress={pres}>
        <Circle
          top="1"
          bg={colors.focus[0]}
          alignItems="center"
          justifyContent="center"
          size="5"
        >
          <TextStyle type='defaultSemiBold' colorText={colors.text[2]} >
            {quantity}
          </TextStyle>
        </Circle>
        <MaterialCommunityIcons
          color={colors.focus[1]}
          size={35}
          name="email-outline"
        />
      </TouchableOpacity>
    </Box>
  );
}
