/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { StyleSheet, Text, type TextProps } from "react-native";
import { _subTitle, _title } from "../../../utils/size";
import { colors } from "../../../global/hub-colors";


export type ThemedTextProps = TextProps & {
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  colorText?: string;
};

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
  },
  defaultSemiBold: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "bold",
  },
  title: {
    fontSize: _title,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: _subTitle,
    fontWeight: "bold",
  },
  link: {
    fontSize: 16,
    letterSpacing: 4,
  },
});

export function TextStyle({
  style,
  colorText = colors.text[0],
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = colorText;

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}
