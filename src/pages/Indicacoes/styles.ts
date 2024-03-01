import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${h => h.theme.colors.bg_color[1]};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: ${h => h.theme.fonts.regular};
`;

export const TitleInput = styled.Text`
  font-size: 26px;
  font-family: ${h => h.theme.fonts.medium};
`;

export const TextButon = styled.Text`
  font-size: 26px;
  font-family: ${h => h.theme.fonts.bold};
  color: ${h => h.theme.colors.color_text.ligh};
`;

export const BoxModal = styled.View`
  height: ${RFValue(600)}px;
  padding: 20px;
  background-color: ${h => h.theme.colors.bg_modal[1]};
  flex: 1;
`;

export const BoxTextInput = styled.View`
  border-radius: 10px;
  border-width: 1px;
  height: 100px;
  padding: 5px;
`;

export const BoxInput = styled.View`
  border-radius: 10px;
  border-width: 1px;
  height: 50px;
  padding: 5px;
  /* align-items: center; */
  justify-content: center;
  margin-top: 5px;
`;

export const Input = styled.TextInput`
  font-size: 14px;
  font-family: ${h => h.theme.fonts.medium};
  /* background-color: ${h => h.theme.colors.bg_color[2]}; */
  padding-left: 20px;
`;

export const BoxButton = styled.TouchableOpacity`
  background-color: ${h => h.theme.colors.button.bg.approved};
  width: 100%;
  height: 48px;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;
