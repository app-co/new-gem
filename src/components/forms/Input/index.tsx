/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextInputProps } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { Box } from 'native-base';

import * as S from './styles';
import { colors } from '../../../global/hub-colors';

export interface TypeInput extends TextInputProps {
  icon?: React.ComponentProps<typeof Feather>['name'];
  label: string;
  error?: string;
}

export function Input({ value, error, label, icon, ...rest }: TypeInput) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isFiled, setIsFiled] = React.useState(false);

  const handleFocus = React.useCallback(async () => {
    setIsFocused(true);
  }, []);

  const handleBlur = React.useCallback(async () => {
    setIsFocused(false);
    setIsFiled(!!value);
  }, [value]);

  return (
    <Box w="full">
      {label && <S.title>{label}</S.title>}
      <S.Container focus={isFocused} filed={isFiled} error={!!error}>
        <S.input
          value={value}
          onBlur={handleBlur}
          onFocus={handleFocus}
          cursorColor={colors.bg_color[1]}
          placeholderTextColor={colors.bg_color[1]}
          {...rest}
        />

        {icon && (
          <S.boxIcon>
            <Feather
              name={icon}
              size={25}
              color={isFiled || isFocused ? colors.focus[1] : colors.focus[3]}
            />
          </S.boxIcon>
        )}
      </S.Container>
      {error && (
        <S.title style={{ color: '#ff0000', fontFamily: 'regular' }}>
          {error}
        </S.title>
      )}
    </Box>
  );
}
