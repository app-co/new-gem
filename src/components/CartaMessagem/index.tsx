import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Box, Circle, Text } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import theme from '../../global/styles/club-mentoria';

interface Props {
  pres: () => void;
  quantity: number;
}

export function CartaMessagem({ pres, quantity }: Props) {
  return (
    <Box>
      <TouchableOpacity onPress={pres}>
        <Circle
          top="2"
          bg={theme.colors.focus[1]}
          alignItems="center"
          justifyContent="center"
          size="5"
        >
          <Text
            fontFamily={theme.fonts.bold}
            color={theme.colors.color_text.dark}
            fontSize={12}
          >
            {quantity}
          </Text>
        </Circle>
        <MaterialCommunityIcons
          color={theme.colors.focus[1]}
          size={40}
          name="email-outline"
        />
      </TouchableOpacity>
    </Box>
  );
}
