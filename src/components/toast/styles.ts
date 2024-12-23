/* eslint-disable prettier/prettier */
import Animated from 'react-native-reanimated';

import styled from 'styled-components/native';
import { colors } from '../../global/hub-colors';
import { _subTitle, _text } from '../../utils/size';


const color = {
  success: colors.sucess[0],
  error: colors.error[0],
  alert: colors.alert[0],
}

const colorText = {
  success: colors.text[2],
  error: colors.text[0],
  alert: colors.alert[2],
}

export const container = styled(Animated.View) <{ type: 'success' | 'error' | 'alert' }>`
  background-color: ${h => color[h.type]};
  position: absolute;
  top: 10%;
  right: -300px;
  padding: 10px;
  border-radius: 10px;
  border-width: 2px;
  border-color: ${h => color[h.type]};
  width: 300px;
`;

export const title = styled.Text<{ type: 'success' | 'error' | 'alert' }>`
  color: ${h => colorText[h.type]};
  font-size: ${_subTitle}px;
  font-weight: 800;
  font-family: bold;
`;

export const text = styled.Text<{ type: 'success' | 'error' | 'alert' }>`
  color: ${h => colorText[h.type]};
  font-size: ${_text}px;
  font-weight: 300;
  font-family: regular;
`;
