import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding-top: ${Platform.OS === `ios` ? getStatusBarHeight() : 15}px;
  padding-bottom: 50px;
  background-color: ${h => h.theme.colors.bg_color[3]};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(80)}px;
  padding-top: ${Platform.OS === `ios` ? getStatusBarHeight() : 45}px;

  padding: 20px;
  flex-direction: row;

  align-items: center;
  margin-bottom: ${RFValue(32)}px;
`;

export const TextContainer = styled.View`
  margin-left: ${RFValue(40)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
`;

export const Avatar = styled.Image`
  width: ${RFValue(60)}px;
  height: ${RFValue(60)}px;
  border-radius: ${RFValue(30)}px;
`;

export const TitleName = styled.Text`
  color: ${h => h.theme.colors.color_text.ligh};
  font-family: ${h => h.theme.fonts.bold};
`;

export const LogOf = styled.TouchableOpacity`
  width: ${RFValue(100)}px;
  height: ${RFValue(35)}px;
  margin-left: ${RFValue(20)}px;
  background-color: ${h => h.theme.colors.focus[1]};

  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(10)}px;
  margin-top: ${RFValue(24)}px;
`;
