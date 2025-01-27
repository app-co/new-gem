import { FontAwesome } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import { colors } from '../../global/hub-colors';
import { _height, _width } from '../../utils/size';

type Props = {
  inativo: boolean;
};

export const Container = styled.View``;

export const BoxText = styled.View`
  flex: 1;
  flex-direction: row;
  gap: 30px;
`;

export const boxH = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

export const star = styled(FontAwesome)`
  color: ${h => colors.focus[1]};
  font-size: ${RFValue(18)}px;
`;

export const boxV = styled.View``;

export const Box = styled.TouchableOpacity<Props>`
  padding: 10px;
  background-color: ${h =>
    h.inativo ? colors.focus[2] : colors.bg_color[2]};
  margin-bottom: 10px;
  height: ${_height * 0.15}px;
`;

export const Linha = styled.View``;

export const BoxAvatar = styled.View`
  flex-direction: row;
`;

export const Avatar = styled.Image`
  width: ${RFValue(110)}px;
  height: ${RFValue(100)}px;
  border-radius: 16px;
  background-color: ${h => colors.focus[2]};
`;

export const ImageOfice = styled.Image`
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;
  border-radius: ${RFValue(25)}px;
  top: ${RFValue(50)}px;
  right: ${RFValue(35)}px;
  background-color: ${h => colors.bg_color[1]};
  opacity: 0.8;
  position: absolute;
  right: -19;
`;

export const ContainerIcon = styled.View`
  flex: 0.4;
`;
