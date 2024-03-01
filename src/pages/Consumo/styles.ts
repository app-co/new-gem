import { MaterialIcons } from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import { _subTitle, _text } from '../../utils/size';

interface PropsFiltro {
  filtro: boolean;
}

interface PropsTyps {
  type: boolean;
}

interface TypeEx {
  type: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${h => h.theme.colors.bg_color[1]};
`;

export const toch = styled.TouchableOpacity<TypeEx>`
  padding: 4px;

  border-width: 1px;
  border-color: ${h => h.theme.colors.bg_color[2]};
  border-radius: 8px;

  background-color: ${h =>
    h.type ? h.theme.colors.bg_color[2] : 'transparent'};
`;

export const titleToch = styled.Text<TypeEx>`
  font-size: ${_text + 2}px;
  font-family: ${h => h.theme.fonts.Regular};
  color: ${h =>
    h.type ? h.theme.colors.color_text.dark : h.theme.colors.color_text.ligh};
`;

export const text = styled.Text`
  font-size: ${_text + 2}px;
  font-family: ${h => h.theme.fonts.Regular};
  color: ${h => h.theme.colors.color_text.dark};
`;

export const reloaded = styled.TouchableOpacity`
  padding: 2px 10px;
  background-color: ${h => h.theme.colors.focus[1]};
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

export const titleReload = styled.Text`
  font-size: ${_subTitle}px;
  font-family: ${h => h.theme.fonts.medium};
  color: ${h => h.theme.colors.color_text.dark};
`;

export const title = styled.Text`
  font-size: ${_subTitle}px;
  font-family: ${h => h.theme.fonts.Regular};
  color: ${h => h.theme.colors.color_text.ligh};
`;

export const BoxTotal = styled.View`
  width: 100%;
  background-color: ${h => h.theme.colors.focus[1]};
  justify-content: center;
  padding: 10px 20px;
`;

export const Text = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${h => h.theme.fonts.Regular};
  color: ${h => h.theme.colors.color_text.dark};
`;

export const BoxFiltros = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px;
  margin-bottom: ${RFValue(16)}px;
`;

export const arrowIcon = styled(MaterialIcons)`
  color: ${h => h.theme.colors.focus[1]};
`;

export const TextFiltro = styled.Text<PropsFiltro>`
  font-size: ${RFValue(14)}px;
  font-family: ${h => h.theme.fonts.Regular};
  color: ${({ filtro, theme }) =>
    filtro ? theme.colors.color_text.dark : theme.colors.color_text.ligh};
`;

export const BoxFiltroTouch = styled.TouchableOpacity<PropsFiltro>`
  background-color: ${({ filtro, theme }) =>
    filtro ? theme.colors.bg_button[1] : theme.colors.bg_button[2]};
  border-radius: 10px;
  align-items: center;
  justify-content: center;

  width: ${RFValue(70)}px;
  padding: 2px;

  border-width: 1px;
  border-color: ${h => h.theme.colors.focus[1]};
`;

export const BoxTypeTransaction = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px 10px;
  /* background-color: red; */
  height: 70px;
  width: 100%;
`;

export const TextTypeTransaction = styled.Text<PropsTyps>`
  font-size: ${RFValue(14)}px;
  font-family: ${h => h.theme.fonts.bold};
  color: ${({ type, theme }) =>
    type ? theme.colors.color_text.dark : theme.colors.color_text.dark};
`;

export const BoxTypeTransactionTouch = styled.TouchableOpacity<PropsTyps>`
  background-color: ${({ type, theme }) =>
    type ? theme.colors.button.bg.approved : theme.colors.bg_button[1]};
  /* width: ${RFPercentage(8)}px;
    height: ${RFPercentage(3)}px; */

  border-radius: ${RFValue(10)}px;

  align-items: center;
  justify-content: center;

  border-width: 1px;
  border-color: ${h => h.theme.colors.focus[1]};
  margin-left: ${RFValue(15)}px;
  padding: 3px ${RFValue(6)}px;
`;
