import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${h => h.theme.colors.bg_color[1]};
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${h => h.theme.fonts.Regular};
  margin-left: 20px;
  margin-bottom: 10px;
`;

export const BoxModal = styled.View`
  padding: 20px;
`;

export const BoxInput = styled.View`
  border-width: 1px;
  border-radius: 10px;
  width: 100%;
  height: 45px;
  border-color: ${h => h.theme.colors.focus[1]};
  padding: 0 20px;
  justify-content: center;
`;

export const Input = styled.TextInput``;

export const TitleButon = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${h => h.theme.fonts.Regular};
  color: ${h => h.theme.colors.color_text.ligh};
`;

export const ButonConfirmar = styled.TouchableOpacity`
  width: 100px;
  height: 40px;
  border-radius: 10px;
  background-color: ${h => h.theme.colors.bg_button[1]};
  align-items: center;
  justify-content: center;
`;

export const ButonCancelar = styled.TouchableOpacity`
  width: 100px;
  height: 40px;
  border-radius: 10px;
  background-color: ${h => h.theme.colors.bg_button[2]};
  align-items: center;
  justify-content: center;
`;
