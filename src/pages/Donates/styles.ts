import styled from 'styled-components/native';

import { _subTitle, _text } from '../../utils/size';

interface I {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;

  align-items: center;
  justify-content: center;
`;

export const text = styled.Text`
  font-size: ${_text}px;
  font-family: 'regular';
`;

export const title = styled.Text`
  font-size: ${_subTitle}px;
  font-family: 'regular';
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

  background-color: #4a66b3;
  border-radius: 8px;

  margin-bottom: 20px;
`;
