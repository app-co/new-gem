import { Image } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${h => h.theme.colors.bg_color[1]};
  align-items: center;
  justify-content: center;
`;

export const title = styled.Text``;

export const bg = styled(Image)`
  width: 100%;
  height: 100%;
  position: absolute;
`;
