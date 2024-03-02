import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${h => h.theme.colors.bg_color[1]};
  padding: 20px;
`;

export const Title = styled.Text`
  font-family: ${h => h.theme.fonts.bold};
  font-size: ${RFValue(24)}px;
  color: ${h => h.theme.colors.color_text.ligh};
`;

export const Message = styled.Text`
  font-family: ${h => h.theme.fonts.bold};
  font-size: ${RFValue(24)}px;
  color: ${h => h.theme.colors.color_text.ligh};
`;

export const Button = styled.TouchableOpacity`
  width: ${RFValue(200)}px;
  height: ${RFValue(50)}px;
  background-color: ${h => h.theme.colors.bg_button[1]};
  border-radius: ${RFValue(10)}px;
  align-items: center;
  justify-content: center;
  margin-top: ${RFValue(106)}px;
`;

export const Image = styled.Image`
  position: absolute;
  width: ${RFValue(200)}px;
  height: ${RFValue(120)}px;
  opacity: 0.4;
  top: ${60}px;
`;
