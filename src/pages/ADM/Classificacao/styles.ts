import { Dimensions } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('screen');

const widt = width * 0.3;
const heig = widt / 5;

interface TypePros {
  type: boolean;
}

interface FiltroProps {
  filtro: boolean;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${h => h.theme.colors.bg_color[3]};
`;

export const TitleType = styled.Text<TypePros>`
  font-family: ${h => h.theme.fonts.bold};
  color: ${({ type, theme }) =>
    type ? theme.colors.color_text.dark : theme.colors.color_text.ligh};
  font-size: ${RFValue(12)}px;
`;

export const TitleFiltro = styled.Text<FiltroProps>`
  font-family: ${h => h.theme.fonts.bold};
  color: ${({ filtro, theme }) =>
    filtro ? theme.colors.color_text.dark : theme.colors.color_text.ligh};
  font-size: ${RFValue(14)}px;
`;

export const TitleList = styled.Text`
  font-family: ${h => h.theme.fonts.bold};
  color: ${h => h.theme.colors.color_text.ligh};
  font-size: ${RFValue(14)}px;
`;

export const Box = styled.TouchableOpacity<TypePros>`
  background-color: ${({ type, theme }) =>
    type ? theme.colors.focus[1] : theme.colors.bg_button[1]};
  border-radius: 10px;
  align-items: center;
  justify-content: center;

  border-width: 1px;
  padding: 3px ${RFValue(8)}px;
  margin-left: ${RFValue(15)}px;
`;

export const BoxFiltro = styled.TouchableOpacity<FiltroProps>`
  background-color: ${({ filtro, theme }) =>
    filtro ? theme.colors.focus[1] : theme.colors.bg_color[1]};
  width: ${widt - 40}px;
  margin-top: ${RFValue(20)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(8)}px;
  border-width: 1px;
  border-color: ${h => h.theme.colors.focus[1]};
`;

export const BoxClassificacao = styled.View`
  width: ${RFPercentage(8)}px;
  height: ${RFPercentage(8)}px;

  border-radius: ${RFValue(30)}px;
  background-color: ${h => h.theme.colors.focus[1]};
  align-items: center;
  justify-content: center;
`;

export const BoxLista = styled.View.attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
})`
  padding: ${RFValue(20)}px;
  background-color: ${h => h.theme.colors.bg_color[1]};
  width: 100%;
  align-items: center;
  border-radius: ${RFValue(8)}px;
  flex-direction: row;
`;
