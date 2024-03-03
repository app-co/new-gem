import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${h => h.theme.colors.bg_color[1]};
`;

export const Title = styled.Text`
  color: ${h => h.theme.colors.color_text.ligh};
  font-size: ${RFValue(16)}px;
  font-family: 'regular';
`;
