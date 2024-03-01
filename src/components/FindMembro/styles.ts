import { FontAwesome } from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import { w } from '../../utils/size';

export const Container = styled.View`
  background-color: ${h => h.theme.colors.bg_color[3]};
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: ${RFValue(12)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${h => h.theme.fonts.regular};
  color: ${h => h.theme.colors.color_text.ligh};
`;

export const TitleName = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${h => h.theme.fonts.bold};
  color: ${h => h.theme.colors.color_text.ligh};
`;

export const Avatar = styled.Image`
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;
  border-radius: ${RFValue(25)}px;
  background-color: ${h => h.theme.colors.focus[1]};
`;

export const MapView = styled.TouchableOpacity`
  width: ${w * 0.3}px;
  min-height: ${RFPercentage(5)}px;
  background-color: ${h => h.theme.colors.focus[1]};
  flex-direction: row;
  padding: 5px;
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(15)}px;
  margin-top: ${RFValue(16)}px;
  margin-bottom: ${RFValue(16)}px;
`;

export const boxH = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: ${w * 0.3}px;

  align-self: center;
`;

export const star = styled(FontAwesome)`
  color: ${h => h.theme.colors.focus[1]};
  font-size: ${RFValue(18)}px;
`;

export const boxV = styled.View``;

export const TitleMaps = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${h => h.theme.fonts.bold};
  color: ${h => h.theme.colors.color_text.dark};
  margin-left: 5px;
`;

export const Box = styled.TouchableOpacity`
  width: ${RFPercentage(10.5)}px;
  height: ${RFPercentage(6)}px;
  background-color: ${h => h.theme.colors.focus[1]};
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-top: 8px;
`;

export const TitleSocial = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${h => h.theme.fonts.medium};
  color: ${h => h.theme.colors.color_text.dark};
`;
