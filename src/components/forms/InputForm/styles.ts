import styled from 'styled-components/native';

import { font } from '@/styles/fonts';
import { _text } from '@/styles/sizes';

export const Container = styled.View``;

export const error = styled.Text`
  font-size: ${_text}px;
  font-family: ${font.regular};
  color: #e91919;
  margin-top: -10px;
`;
