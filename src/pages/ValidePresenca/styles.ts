import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${h => h.theme.colors.bg_color[1]};
  flex: 1;

`;

export const Title = styled.Text`
  font-family: ${h => h.theme.fonts.bold};
  font-size: 20px;
  color: ${h => h.theme.colors.color_text.ligh};
`;

export const Box = styled.View`
  background-color: ${h => h.theme.colors.bg_color[1]};
  width: 100%;
  height: 100px;
  align-items: center;
  justify-content: center;
`;

export const ButtonValidar = styled.TouchableOpacity`
  width: 70%;
  height: 40px;
  background-color: ${h => h.theme.colors.button.bg.approved};
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-top: 25px;
`;

export const TextButtonValidar = styled.Text`
  font-family: ${h => h.theme.fonts.regular};
  font-size: 20px;
  color: ${h => h.theme.colors.color_text.dark};
`;
