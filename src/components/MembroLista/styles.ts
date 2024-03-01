import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';


export const Container = styled.View``;

export const Title = styled.Text`
  color: ${h => h.theme.colors.color_text.dark};
  font-family: ${h => h.theme.fonts.regular};

  font-size: ${RFValue(18)}px;
  margin-left: ${RFValue(30)}px;
`;

export const ButtonToggle = styled.TouchableOpacity`
  width: 50%;
  height: 35px;

  background-color: ${h => h.theme.colors.focus[1]};
`;

export const TitleTogle = styled.Text`
  color: ${h => h.theme.colors.color_text.ligh};
  font-family: ${h => h.theme.fonts.regular};

  font-size: ${RFValue(18)}px;
`;

export const BxName = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  /* justify-content:  */
  padding: 15px;

  background-color: ${h => h.theme.colors.bg_color[1]};
`;

export const Avatar = styled.Image`
  width: ${RFValue(60)}px;
  height: ${RFValue(60)}px;
  border-radius: 30px;

  background-color: ${h => h.theme.colors.focus[1]};
`;

export const Line = styled.View`
  width: 90%;
  height: 2px;
  align-self: center;

  background-color: ${h => h.theme.colors.focus[1]};
`;
