import styled from 'styled-components/native';

import { _subTitle } from '../../utils/size';

interface props {
  afiliado: boolean;
}

export const text = styled.Text<props>`
  font-size: ${_subTitle}px;

  font-family: ${h => h.theme.fonts.medium};
  color: ${h =>
    h.afiliado
      ? h.theme.colors.color_text.ligh
      : h.theme.colors.color_text.dark};
`;

export const button = styled.TouchableOpacity<props>`
  padding: 10px;
  margin-top: 5px;
  border-bottom-width: 1px;

  background-color: ${h =>
    h.afiliado ? h.theme.colors.bg_button[1] : h.theme.colors.bg_button[2]};
`;
