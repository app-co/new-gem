import { Feather } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

const { height, width } = Dimensions.get('screen');

export const BoxHeader = styled.View.attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,

  elevation: 4,
})`
  width: 100%;
  height: ${RFPercentage(8)}px;
  background-color: ${h => h.theme.colors.bg_color[1]};
  align-items: center;
  justify-content: space-between;
  padding: 8px 25px;
  flex-direction: row;
`;

export const Container = styled.View`
  /* padding: 20px 20px 30px 20px; */
  background-color: ${h => h.theme.colors.bg_color[1]};
  flex: 1;
`;

export const Box = styled.View`
  background-color: ${h => h.theme.colors.bg_color[1]};
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-top: ${RFValue(32)}px;
`;

export const BoxCamera = styled.TouchableOpacity`
  width: ${RFPercentage(7)}px;
  height: ${RFPercentage(7)}px;
  background-color: ${h => h.theme.colors.bg_button[1]};
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(25)}px;
  top: ${RFValue(-50)}px;
  right: ${RFValue(20)}px;
`;

export const Camera = styled(Feather)`
  font-size: ${RFValue(25)}px;
  color: ${h => h.theme.colors.bg_color[1]};
`;

export const Avatar = styled.Image`
  width: ${RFPercentage(22)}px;
  height: ${RFPercentage(22)}px;
  background-color: ${h => h.theme.colors.bg_color[2]};
  border-radius: ${RFValue(80)}px;
  align-self: center;
`;

export const TitleHeader = styled.Text`
  color: ${h => h.theme.colors.color_text.ligh};
  font-family: ${h => h.theme.fonts.bold};
  font-size: ${RFValue(16)}px;
`;

export const BoxFormularios = styled.View.attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  elevation: 4,
})`
  background-color: ${h => h.theme.colors.bg_color[3]};
  width: ${width / 1.12}px;
  top: ${RFPercentage(1)}px;
  align-self: center;
  border-radius: 15px;
  align-items: center;
  margin-bottom: 15px;

  padding: ${RFValue(40)}px 10px;
`;

export const BoxInput = styled.View`
  justify-content: center;
  padding: 0 20px;

  width: ${RFPercentage(40)}px;
  /* margin-bottom: 18px; */
`;

export const InpuMask = styled(TextInputMask)`
  font-family: ${h => h.theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${h => h.theme.colors.color_text.dark};
`;

export const BoxTogle = styled.TouchableOpacity`
  border-width: 2px;
  border-top-color: ${h => h.theme.colors.bg_color[2]};
  border-right-color: ${h => h.theme.colors.bg_color[2]};
  border-left-color: ${h => h.theme.colors.bg_color[2]};
  border-bottom-color: ${h => h.theme.colors.bg_color[2]};
  justify-content: center;
  padding: 0 10px;
  border-radius: 10px;

  width: ${RFPercentage(25)}px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const TextTogle = styled.Text`
  font-family: ${h => h.theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${h => h.theme.colors.color_text.ligh};
`;

export const BoxButton = styled.TouchableOpacity`
  width: ${RFPercentage(40)}px;
  height: ${RFPercentage(7)}px;
  background-color: ${h => h.theme.colors.button.bg.approved};
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  /* top: ${RFPercentage(-15)}px; */
`;

export const BoxLogo = styled.View`
  width: ${RFPercentage(20)}px;
  height: ${RFPercentage(20)}px;
  background-color: ${h => h.theme.colors.bg_color[2]};
  border-radius: 15px;
  margin-left: ${RFValue(20)}px;
  margin-top: ${RFValue(15)}px;
  align-items: center;
  justify-content: center;
`;

export const LogoImage = styled.Image`
  width: ${RFPercentage(20)}px;
  height: ${RFPercentage(20)}px;
  position: absolute;
  border-radius: 15px;
`;

export const TitleButton = styled.Text`
  font-family: ${h => h.theme.fonts.bold};
  font-size: ${RFValue(24)}px;
  color: ${h => h.theme.colors.color_text.ligh};
`;
