import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface PropsType {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;

  justify-content: space-between;
  background-color: ${h => h.theme.colors.bg_color[1]}
`;

export const title = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${h => h.theme.fonts.bold};
  color: ${h => h.theme.colors.color_text.ligh}
`;

export const text = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${h => h.theme.fonts.regular};
`;

export const textButon = styled.Text`
  color: ${h => h.theme.colors.color_text.dark};
  font-family: ${h => h.theme.fonts.medium}
`;

export const buttonType = styled.TouchableOpacity<PropsType>`
  padding: 5px 10px;
  background-color: ${h =>
    h.selected ? h.theme.colors.focus[1] : h.theme.colors.bg_color[2]};
  border-radius: 5px;
`;

export const box = styled.View``;
