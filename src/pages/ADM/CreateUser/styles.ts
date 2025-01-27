import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface Props {
  isAdm: boolean;
}

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${h => h.theme.colors.bg_color[1]};
`;

export const boxForm = styled.View`
  padding: 20px;
  gap: 10px;
`