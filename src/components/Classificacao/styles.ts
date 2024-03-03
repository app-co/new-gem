import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${h => h.theme.colors.bg_color[1]};
`;

export const Title = styled.Text`
  font-family: ${h => h.theme.fonts.bold};
  font-size: ${RFValue(16)}px;
  color: ${h => h.theme.colors.color_text.dark};
`;

export const BoxAvatar = styled.Image`
  width: ${RFPercentage(12)}px;
  height: ${RFPercentage(10)}px;
  background-color: ${h => h.theme.colors.bg_color[2]};
  border-radius: ${RFPercentage(6)}px;
  align-self: center;
`;

export const BoxEventos = styled.View`
  padding: 0 10px;
  gap: 10px;
`;

export const BoxContainer = styled.View`
  width: 70%;
  background-color: ${h => h.theme.colors.focus[1]};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-radius: 8px;
`;

export const text = styled.Text`
    font-family: ${h => h.theme.fonts.regular};
    font-size: ${RFValue(12)}px;
    color: ${h => h.theme.colors.color_text.dark};
`

export const BoxPosition = styled.View`
  width: 20%;
  height: ${RFPercentage(6)}px;
  background-color: ${h => h.theme.colors.focus[1]};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;
