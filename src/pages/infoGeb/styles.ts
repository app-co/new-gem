import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${h => h.theme.colors.bg_color[1]};
  flex: 1;
  padding: 20px;
`;

export const Title = styled.Text`
  color: ${h => h.theme.colors.color_text.dark};
  font-family: ${h => h.theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  margin-top: ${RFValue(25)}px;
`;
