import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Foundation,
  Ionicons,
  SimpleLineIcons,
} from '@expo/vector-icons';
import { Dimensions, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import theme from '../../global/styles/geb';
import { _subTitle, _text, _title } from '../../utils/size';

const { height, width } = Dimensions.get('screen');

export const Container = styled.View`
  flex: 1;
  background-color: ${h => h.theme.colors.bg_color[1]};
  padding: ${width / 10.5}px 5px;
  padding-top: ${Platform.OS === `ios` ? getStatusBarHeight() : 20}px;
  padding-bottom: 10px;
  justify-content: space-between;
`;

export const title = styled.Text`
  font-family: ${h => h.theme.fonts.Regular};
  font-size: ${_title}px;
  color: ${h => h.theme.colors.color_text.ligh};
`;

export const subTitle = styled.Text`
  color: ${h => h.theme.colors.color_text.ligh};
  font-family: ${h => h.theme.fonts.medium};
  font-size: ${_subTitle}px;
`;

export const text = styled.Text`
  color: ${h => h.theme.colors.color_text.ligh};
  font-family: ${h => h.theme.fonts.Regular};
  font-size: ${_text}px;
`;

export const Box = styled.TouchableOpacity`
  flex-direction: row;
  padding: 10px;

  width: 100%;
  height: ${width * 0.12}px;
  align-items: center;
  /* background-color: red; */
  margin-bottom: ${RFPercentage(0.1)}px;
`;

export const Avatar = styled.Image`
  width: ${RFValue(130)}px;
  height: ${RFValue(130)}px;
  border-radius: ${RFValue(75)}px;
  align-self: center;
`;

export const BoxIco = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${h => h.theme.colors.focus[2]};
  width: ${height * 0.15}px;
  height: ${height * 0.15}px;
  border-radius: ${RFValue(100)}px;
  align-self: center;
`;

export const TitleName = styled.Text`
  /* margin-top: 10px; */
  font-family: ${h => h.theme.fonts.Regular};
  font-size: ${RFValue(20)}px;
  align-self: center;
  color: ${h => h.theme.colors.color_text.dark};
`;

export const BoxPrice = styled.View.attrs({
  shadowColor: theme.colors.focus[1],
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,

  elevation: 6,
})`
  width: ${width * 0.5}px;
  background-color: ${h => h.theme.colors.focus[1]};
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: ${RFValue(10)}px;
  margin-top: ${RFValue(15)}px;
  margin-bottom: ${RFValue(15)}px;
  padding: 2px;
`;
export const TitlePrice = styled.Text`
  font-family: ${h => h.theme.fonts.Regular};
  font-size: ${RFValue(16)}px;
  color: ${h => h.theme.colors.color_text.dark};
`;

export const TitleP = styled.Text`
  font-family: ${h => h.theme.fonts.Regular};
  font-size: ${RFValue(12)}px;
  color: ${h => h.theme.colors.color_text.dark};
`;

export const ComprasText = styled.Text`
  font-family: ${h => h.theme.fonts.Regular};
  font-size: ${RFValue(14)}px;
  color: ${h => h.theme.colors.color_text.dark};
  top: ${RFValue(15)}px;
`;

export const Scroll = styled.ScrollView`
  padding: 20px 0;
`;

export const Line = styled.View.attrs({
  shadowColor: theme.colors.focus[1],
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,

  elevation: 6,
})`
  height: 2px;
  width: 80%;
  background-color: ${h => h.theme.colors.bg_color[2]};
  align-self: center;
  margin-top: ${width / 29}px;
  margin-bottom: ${width / 20}px;
`;

export const IConSimple = styled(SimpleLineIcons)`
  font-size: ${width / 16}px;
`;

export const IconIoncic = styled(Ionicons)`
  font-size: ${width / 16}px;
`;

export const IconAnt = styled(AntDesign)`
  font-size: ${width / 16}px;
`;

export const IconFont = styled(FontAwesome5)`
  font-size: ${width / 16}px;
`;

export const IconFoundation = styled(Foundation)`
  font-size: ${width / 16}px;
`;

export const FontAwes = styled(FontAwesome)`
  font-size: ${width / 16}px;
`;
