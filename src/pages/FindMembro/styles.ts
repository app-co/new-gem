import styled from 'styled-components/native';


export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${h => h.theme.colors.bg_color[1]};
  padding-top: 20px;
`;

export const Title = styled.Text``;



export const Box = styled.View`
  padding: 20px;
  width: 100%;
`;
