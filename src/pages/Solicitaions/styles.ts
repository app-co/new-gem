import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

import { _title } from '../../utils/size';

export const Container = styled.View`
  padding-top: ${Platform.OS === `ios` ? getStatusBarHeight() : 20}px;
  background-color: ${h => h.theme.colors.bg_color[1]};
  flex: 1;
`;

export const title = styled.Text`
  font-size: ${_title}px;
  color: ${h => h.theme.colors.color_text.ligh};
  font-family: ${h => h.theme.fonts.bold};

  text-align: center;
  margin-top: 50px;
`;

export const box = styled.View`
  flex: 1;

  padding: 10px;
`;
