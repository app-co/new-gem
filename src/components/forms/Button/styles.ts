import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { themeColors } from '../../../global/hub-colors/hubs';
import { colors } from '../../../global/hub-colors';

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: ${50}px;
  background-color: ${colors.focus[0]};
  align-items: center;
  justify-content: center;

  border-radius: ${RFValue(10)}px;
`;

export const Title = styled.Text`
  font-family: ${h => h.theme.fonts.bold};
  color: ${colors.text[2]};
  font-size: ${RFValue(18)}px;
`;
