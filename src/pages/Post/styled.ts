import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${h => h.theme.colors.bg_color[1]}
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(70)}px;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${h => h.theme.colors.bg_color[2]};
  align-items: center;
  padding: 0 20px;
`;

export const BoxAvatar = styled.TouchableOpacity`
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;
  border-radius: ${RFValue(30)}px;
  align-items: center;
  justify-content: center;

  background-color: ${h => h.theme.colors.bg_color[1]};
`;

export const Avatar = styled.Image``;

export const Titl = styled.Text`
  font-family: ${h => h.theme.fonts.bold};
  color: ${h => h.theme.colors.color_text.ligh};
  margin-left: ${RFValue(70)}px;
  font-size: ${RFValue(24)}px;
`;

export const Box = styled.View`
  padding: 20px;
`;

export const Title = styled.Text``;

export const BoxInput = styled.View`
  width: 100%;
  height: ${RFValue(40)}px;
  border-radius: ${RFValue(10)}px;
  background-color: ${h => h.theme.colors.bg_color[1]};
  justify-content: center;
  padding: 0 20px;
`;

export const BoxImage = styled.View`
  width: 100%;
  height: ${RFValue(250)}px;
  border-radius: ${RFValue(10)}px;
  background-color: ${h => h.theme.colors.bg_color[1]};
  margin-top: ${RFValue(32)}px;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.Image`
  height: ${RFValue(250)}px;
  width: 100%;
  border-radius: ${RFValue(10)}px;
`;

export const Input = styled.TextInput``;

export const Button = styled(RectButton)`
  width: 100%;
  height: ${RFValue(45)}px;
  border-radius: ${RFValue(10)}px;
  background-color: ${h => h.theme.colors.bg_button[1]};
  margin-top: ${RFValue(32)}px;
  align-items: center;
  justify-content: center;
`;

export const TexBoton = styled.Text`
  font-family: ${h => h.theme.fonts.bold};
  color: ${h => h.theme.colors.color_text.ligh};
  font-size: ${RFValue(24)}px;
`;

export const ButonImage = styled.TouchableOpacity`
  width: ${RFValue(150)}px;
  height: ${RFValue(45)}px;
  border-radius: ${RFValue(10)}px;
  margin-top: ${RFValue(32)}px;
  align-items: center;
  justify-content: center;
  background-color: ${h => h.theme.colors.bg_button[1]};
`;

export const Load = styled.View`
  position: absolute;
  align-self: center;
  top: ${RFValue(300)}px;
`;
