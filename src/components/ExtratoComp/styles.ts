import styled from 'styled-components/native';

import { _subTitle, _text } from '../../utils/size';

export const content = styled.View`
  margin: 5px;
  border-width: 1px;
  border-radius: 8px;
  padding: 5px;
  min-height: 60px;
  border-color: ${h => h.theme.colors.bg_color[2]};
`;

export const Container = styled.View`
  background-color: ${h => h.theme.colors.bg_color[3]};
  padding: 5px 10px;

  flex-direction: row;
  align-items: center;
  margin: 5px 10px;
  border-radius: 5px;
`;

export const circle = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 20px;
  background-color: ${h => h.theme.colors.focus[1]};
  align-items: center;
  justify-content: center;
`;

export const box = styled.View`
  flex: 1;
  margin-left: 15px;
`;

export const title = styled.Text`
  color: ${h => h.theme.colors.color_text.dark};
  font-family: ${h => h.theme.fonts.bold};
  font-size: ${_subTitle}px;
`;

export const text = styled.Text`
  color: ${h => h.theme.colors.color_text.ligh};
  font-family: ${h => h.theme.fonts.regular};
  font-size: ${_text + 2}px;
`;
