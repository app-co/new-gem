import styled from 'styled-components/native';

import { _subTitle, _text } from '../../../utils/size';

export const Container = styled.View`
  flex: 1;
  background-color: ${h => h.theme.colors.bg_color[1]}
`;

export const title = styled.Text`
  color: ${h => h.theme.colors.color_text.ligh};
  font-weight: 600;
  font-family: ${h => h.theme.fonts.bold};

  font-size: ${_subTitle}px;
`;

export const text = styled.Text`
  color: ${h => h.theme.colors.color_text.ligh};
  font-weight: 600;
  font-family: ${h => h.theme.fonts.bold};

  font-size: ${_text}px;
`;

export const approvedButon = styled.TouchableOpacity`
  padding: 1px 20px;
  background-color: ${h => h.theme.colors.bg_button[1]};
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 6px;
`;

export const reprovedButon = styled.TouchableOpacity`
  padding: 5px 10px;
  height: 40px;
  border-radius: 6px;
  background-color: ${h => h.theme.colors.bg_button[2]};
  align-items: center;
  justify-content: center;
`;
