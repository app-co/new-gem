import { AntDesign } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${h => h.theme.colors.bg_color[1]};
`;

export const box = styled.View.attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.57,
  shadowRadius: 4.65,

  elevation: 6,
})`
  width: 100%;
  /* height: ${RFValue(200)}px; */
  background-color: ${h => h.theme.colors.bg_color[3]};
  align-items: center;
  padding: 20px;
  border-radius: 16px;
`;

export const BoxAvatar = styled.View`
  flex: 2;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const BoxElement = styled.View`
  width: 100%;
  height: ${RFValue(120)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  top: -20px;
`;

export const Boxcons = styled.View`
  flex: 1;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BoxProvider = styled.View`
  flex: 2;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const ImageProviderOfice = styled.Image`
  width: ${RFValue(40)}px;
  border-radius: ${RFValue(25)}px;
  height: ${RFValue(40)}px;
  background-color: ${h => h.theme.colors.focus[1]};
  align-self: flex-start;
`;

export const Avatar = styled.Image`
  width: ${RFValue(75)}px;
  border-radius: ${RFValue(35)}px;
  height: ${RFValue(75)}px;
  top: 20px;
`;

export const ImageOfice = styled.Image`
  width: ${RFValue(40)}px;
  border-radius: ${RFValue(25)}px;
  height: ${RFValue(40)}px;
  background-color: ${h => h.theme.colors.focus[1]};
  align-self: flex-end;
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${h => h.theme.fonts.bold};
  color: ${h => h.theme.colors.color_text.ligh};
`;

export const BoxInput = styled.View.attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.57,
  shadowRadius: 4.65,

  elevation: 6,
})`
  width: 100%;
  height: ${RFValue(250)}px;
  background-color: ${h => h.theme.colors.bg_color[3]};
  /* flex-direction: row; */
  align-items: center;
  padding: 6px;
  border-radius: 16px;
  margin-top: 32px;
  margin-bottom: 10px;
`;

export const ContainerInput = styled.View`
  width: ${RFValue(260)}px;
  height: ${RFValue(50)}px;
  padding: 10px;
  border-width: 1px;
  border-radius: 10px;
`;

export const InputText = styled(TextInputMask)`
  font-family: ${h => h.theme.fonts.regular};
  font-size: ${RFValue(12)}px;
`;

export const Buton = styled.TouchableOpacity`
  width: ${RFValue(250)}px;
  height: ${RFValue(40)}px;
  border-radius: ${RFValue(10)}px;
  background-color: ${h => h.theme.colors.button.bg.approved};
  align-self: center;
  align-items: center;
  justify-content: center;
`;

export const Caretright = styled(AntDesign)`
  color: ${h => h.theme.colors.focus[1]};
`;
