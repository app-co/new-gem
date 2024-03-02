import { Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface Props {
  isError: boolean;
  isFocus: boolean;
}
export const Box = styled.View<Props>`
  padding: 2px 10px;
  background-color: ${h => h.theme.colors.imput.bg};

  width: 100%;
  height: ${RFValue(40)}px;
  border-width: 1px;
  justify-content: center;
  flex-direction: row;
  border-radius: ${RFValue(10)}px;
  border-color: ${h => h.theme.colors.bg_color[2]};

  ${({ theme, isError }) =>
    isError &&
    css`
      border-top-color: transparent;
      border-left-color: transparent;
      border-right-color: transparent;
      border-bottom-color: ${theme.colors.focus[2]};
      border-width: 2px;
    `}
  ${({ theme, isFocus }) =>
    isFocus &&
    css`
      border-color: ${h => h.theme.colors.focus[1]}
      border-width: 2px;
    `};
`;

export const Container = styled(TextInput)`
  flex: 1;
  /* font-family: ${h => h.theme.fonts.bold}; */
  font-size: ${RFValue(16)}px;
  color: ${h => h.theme.colors.imput.text};
`;

export const Icon = styled(Feather) <Props>`
  margin-right: 14px;
  align-self: center;
  color: ${({ theme, isFocus }) =>
    isFocus ? theme.colors.focus[2] : theme.colors.focus[1]};
`;
