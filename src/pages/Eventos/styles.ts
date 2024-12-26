import styled from 'styled-components/native'
import { colors } from '../../../global/hub-colors';
import { _canva } from '../../../utils/size';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.bg_color[2]};
  padding-top: 20px;
`;

export const warp = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  padding: 10px;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  justify-content: space-between;
  margin-top: 10px;
  `

export const touch = styled.TouchableOpacity`
  background-color: ${colors.bg_color[3]};
  padding: 10px;
  border-radius: 10px;
  width: ${_canva * 5};
  /* height: ${_canva * 2}; */
  align-items: center;
  justify-content: center;
  gap: 8px;

`

export const accept = styled.TouchableOpacity`
  border-radius: 10px;
  background-color: ${colors.focus[0]};
  padding: 10px;
  flex: 1;
  align-items: center;
  justify-content: center;
`


export const reject = styled.TouchableOpacity`
  background-color: ${colors.alert[1]};
  /* border-width: 2px; */
  border-radius: 10px;
  /* border-color: ${colors.bg_color[1]}; */
  padding: 10px;
  flex: 1;

  align-items: center;
  justify-content: center;
`