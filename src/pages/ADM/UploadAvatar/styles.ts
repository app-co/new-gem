import styled from 'styled-components/native';

import { _height, _subTitle } from '../../../utils/size';

export const Container = styled.View`
  flex: 1;
  background-color: ${h => h.theme.colors.bg_color[1]};
  padding: 0 20px;
`;

export const title = styled.Text`
  font-family: ${h => h.theme.fonts.bold};
  font-size: ${_subTitle}px;
`;

export const boxSelectUser = styled.TouchableOpacity`
  background-color: ${h => h.theme.colors.bg_button[1]};
  padding: 10px 20px;
  border-radius: 8px;
`;

export const content = styled.TouchableOpacity`
  border-radius: 10px;
  border-width: 2px;
  width: 100%;
  height: ${_height * 0.4}px;

  border-color: ${h => h.theme.colors.bg_button[1]};
  margin-top: 30px;

  align-items: center;
  justify-content: center;
`;

export const Image = styled.Image`
  width: 50%;
  height: 50%;
`;

export const button = styled.TouchableOpacity`
  padding: 10px 20px;
  align-items: center;
  justify-content: center;

  margin-top: 10px;
`;
