import styled from 'styled-components/native';

import { _subTitle } from '../../utils/size';

export const Container = styled.View`
  flex: 1;
  background-color: ${h => h.theme.colors.bg_modal[1]};
`;

export const title = styled.Text`
  font-size: ${_subTitle}px;
  font-family: 'bold';
`;

export const box = styled.View`
  background-color: ${h => h.theme.colors.bg_modal[1]};
  padding: 20px;
`;
