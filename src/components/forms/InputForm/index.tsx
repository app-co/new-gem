/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactNode } from 'react';
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldError,
} from 'react-hook-form';

import * as S from './styles';

interface IChildren extends ControllerRenderProps {
  children: ReactNode;
}

type T = {
  name: string;
  control: Control<any>;
  error?: FieldError;
  render: (fieldProps: { onChange: () => void; value: any }) => ReactNode;
};

export function InputForm({ name, control, error, render, ...rest }: T) {
  return (
    <S.Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => render({ onChange, value })}
      />
      {error && <S.error>{error.message}</S.error>}
    </S.Container>
  );
}
