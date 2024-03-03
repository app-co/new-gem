import styled from 'styled-components/native';

import { _subTitle, _text } from '../../utils/size';

interface I {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;

  background-color: ${h => h.theme.colors.bg_color[1]}
`;

export const text = styled.Text`
  font-size: ${_text}px;
  font-family: 'regular';
`;

export const title = styled.Text`
  font-size: ${_subTitle}px;
  font-family: 'regular';
  color: ${h => h.theme.colors.color_text.ligh}
`;

export const subTitle = styled.Text<I>`
  font-size: ${_subTitle - 2}px;
  color: ${h =>
    h.selected
      ? h.theme.colors.color_text.ligh
      : h.theme.colors.color_text.dark};
  font-family: 'regular';
`;

export const content = styled.View`
  width: 100%;
  padding: 20px;

  background-color: ${h => h.theme.colors.bg_color[3]};
  border-radius: 8px;

  margin-bottom: 20px;
`;
