import { ArrowLeft } from "phosphor-react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const container = styled.View`
    flex:1;
    background-color: ${h => h.theme.colors.bg_color[1]};
    padding-bottom: 30px;
`

export const title = styled.Text`
    color: ${h => h.theme.colors.color_text.ligh};
    font-family: 'bold';
    font-size: ${RFValue(18)}px;
`


export const text = styled.Text`
    color: ${h => h.theme.colors.color_text.ligh};
    font-family: 'regular';
    font-size: ${RFValue(14)}px;
`

export const textSegments = styled.Text`
    color: ${h => h.theme.colors.color_text.dark};
    font-family: 'regular';
    font-size: ${RFValue(14)}px;
`



