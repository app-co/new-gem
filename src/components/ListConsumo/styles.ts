import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View.attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
})`
  width: 100%;
  height: ${RFPercentage(9)}px;
  background-color: ${h => h.theme.colors.bg_color[1]};
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: ${RFValue(20)}px;
`;

export const BoxData = styled.View`
  width: ${RFPercentage(14)}px;
  height: ${RFPercentage(8)}px;
  border-radius: ${RFValue(30)}px;
  background-color: ${h => h.theme.colors.focus[1]};
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

export const TextData = styled.Text`
  font-family: ${h => h.theme.fonts.bold};
  font-size: ${RFValue(14)}px;
  color: ${h => h.theme.colors.color_text.dark};
  text-align: center;
`;

export const BoxValor = styled.View`
  width: ${RFPercentage(30)}px;
  background-color: ${h => h.theme.colors.focus[1]};
  border-radius: ${RFValue(10)}px;
  padding: 0 10px;
  justify-content: space-around;
`;

export const TextValue = styled.Text`
  font-family: ${h => h.theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${h => h.theme.colors.color_text.ligh};
`;
