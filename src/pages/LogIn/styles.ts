import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${h => h.theme.colors.bg_color[1]};
  align-items: center;
  /* padding-bottom: 10px; */
`;

export const BoxLogo = styled.View`
  width: 100%;
  height: 40%;
  align-items: center;
  justify-content: center;
`;

export const BoxInput = styled.View`
  padding: 20px;
  align-items: center;

  gap: 15px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${h => h.theme.fonts.bold};
  color: ${h => h.theme.colors.color_text.dark};
  margin-left: 10px;
`;

const wid = 180;
const hei = wid - 70;
export const Logo = styled.Image`
  width: ${RFValue(350)}px;
  height: ${RFValue(250)}px;
  margin-top: ${RFValue(50)}px;
`;
