import styled from 'styled-components/native';
import { _text } from '../../../utils/size';
import { colors } from '../../../global/hub-colors';


export const Container = styled.View``;

export const error = styled.Text`
  font-size: ${_text}px;
  font-family: regular;
  color: ${colors.error[0]};
  margin-top: -5px;
`;
