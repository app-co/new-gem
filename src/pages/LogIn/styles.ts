import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { colors } from '../../global/hub-colors';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${colors.bg_color[2]};
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
  align-items: center;
  padding: 50px;
  width: 100%;
  gap: 15px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${h => h.theme.fonts.bold};
  color: ${h => h.theme.colors.color_text.dark};
  margin-left: 10px;
`;

export const Logo = styled.Image`
  width: ${RFValue(350)}px;
  height: ${RFValue(250)}px;
  margin-top: ${RFValue(50)}px;
`;
