import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: ${RFValue(270)}px;
  height: ${50}px;
  background-color: ${h => h.theme.colors.button.bg.approved};
  align-items: center;
  justify-content: center;

  border-radius: ${RFValue(10)}px;
`;

export const Title = styled.Text`
  font-family: ${h => h.theme.fonts.bold};
  color: ${h => h.theme.colors.button.text.dark};
  font-size: ${RFValue(18)}px;
`;
