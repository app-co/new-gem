import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${h => h.theme.colors.primary};

  flex-direction: row;
  padding: 15px;
  margin-top: 25px;
  width: 100%;
`;

export const AvatarMembro = styled.Image`
  width: ${RFValue(80)}px;
  height: ${RFValue(80)}px;
  border-radius: ${RFValue(40)}px;
  background-color: ${h => h.theme.colors.focus[1]};
`;

export const Title = styled.Text`
  font-family: ${h => h.theme.fonts.regular};
  font-size: ${RFValue(26)}px;
  margin-left: ${RFValue(40)}px;
`;

export const TitleData = styled.Text`
  font-family: ${h => h.theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  margin-left: ${RFValue(40)}px;
`;

interface PropsButton {
  type: '1' | '2';
}

export const BoxButton = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
`;

export const TitleButton = styled.Text`
  font-family: ${h => h.theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${h => h.theme.colors.color_text.ligh};
`;

export const ButtonPresensa = styled.TouchableOpacity<PropsButton>`
  width: ${RFValue(80)}px;
  height: ${RFValue(30)}px;
  border-radius: ${RFValue(10)}px;
  background-color: ${({ type, theme }) =>
    type === '1' ? theme.colors.focus[1] : theme.colors.focus[2]};
  align-items: center;
  justify-content: center;
`;
