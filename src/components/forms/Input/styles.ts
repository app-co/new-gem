import { TextInput } from 'react-native';

import { css } from 'styled-components';
import styled from 'styled-components/native';
import { colors } from '../../../global/hub-colors';
import { _text } from '../../../utils/size';

interface I {
  filed: boolean;
  focus: boolean;
  error: boolean;
}

export type TCondition = 'filed' | 'focus' | 'error';

export const Container = styled.View<I>`
  border-radius: 12px;
  flex-direction: row;
  width: 100%;
  height: 50px;
  align-items: center;
  background-color: ${colors.bg_color[2]};

  border-width: 1px;
  border-color: ${colors.bg_color[0]};

  ${(h: I) =>
    h.filed &&
    css`
      border-color: ${colors.focus[0]};
      border-width: 2px;
    `}

  ${(h: I) =>
    h.focus &&
    css`
      border-color: ${colors.focus[0]};
      border-width: 2px;
    `};

  ${(h: I) =>
    h.error &&
    css`
      border-color: ${colors.error};
      border-width: 2px;
    `};
`;

export const title = styled.Text`
  color: ${colors.text[2]};
  font-family: regular;
  margin-bottom: 5px;
  font-size: ${_text}px;
`;

export const input = styled(TextInput)`
  flex: 1;
  padding: 0 0 0 10px;
  font-family: bold;
  color: ${colors.text[0]};
  font-size: ${_text + 2}px;
`;

export const boxIcon = styled.View`
  width: 40px;
  height: 100%;

  align-items: center;
  justify-content: center;
`;
