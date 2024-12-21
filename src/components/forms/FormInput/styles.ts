import styled from 'styled-components/native';
import { _text } from '../../../utils/size';
import { themeColors } from '../../../global/hub-colors/hubs';
const { geb } = themeColors


export const Container = styled.View``;

export const error = styled.Text`
  font-size: ${_text}px;
  font-family: regular;
  color: ${geb.error[0]}
`;
