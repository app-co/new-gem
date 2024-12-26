import styled from 'styled-components/native'
import { colors } from '../../../../../global/hub-colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.bg_color[3]};
  padding: 10px;
  border-radius: 10px;
`;

export const warp = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: 5px;
  gap: 8px
`