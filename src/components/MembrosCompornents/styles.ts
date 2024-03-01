import { FontAwesome } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import { w } from '../../utils/size';

type Props = {
  inativo: boolean;
};

export const Container = styled.View``;

export const BoxText = styled.View`
  flex: 1;
  justify-content: space-between;
  padding-left: 10px;
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

export const Title = styled.Text`
  font-family: ${h => h.theme.fonts.regular};
  font-size: ${RFValue(22)}px;
  color: ${h => h.theme.colors.color_text.ligh};
`;

export const Box = styled.TouchableOpacity<Props>`
  flex-direction: row;
  padding: 5px;
  background-color: ${h =>
    h.inativo ? h.theme.colors.focus[2] : h.theme.colors.bg_color[3]};
  margin-bottom: 10px;
`;

export const Linha = styled.View``;

export const BoxAvatar = styled.View`
  flex-direction: row;
  flex: 1;
`;

export const Avatar = styled.Image`
  width: ${RFValue(110)}px;
  height: ${RFValue(100)}px;
  border-radius: 16px;
  background-color: ${h => h.theme.colors.focus[1]};
`;

export const ImageOfice = styled.Image`
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;
  border-radius: ${RFValue(25)}px;
  top: ${RFValue(50)}px;
  right: ${RFValue(35)}px;
  background-color: ${h => h.theme.colors.bg_color[1]};
  opacity: 0.8;
`;

export const ContainerIcon = styled.View`
  flex: 0.4;
`;
