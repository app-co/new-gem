/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';


import Mask from '../../../utils/mascara';
import { Input, TypeInput } from '../Input';

type T = TypeInput & {
  name: string;
  control: Control<any>;
  error?: FieldError;
  mask?: 'date' | 'cpf' | 'cell-phone' | 'short-date' | 'money' | 'card';
};

const msk = new Mask();

export function FormInput({ name, control, mask, error, ...rest }: T) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        const mascars: any = {
          cpf: (e: string) => (e ? msk.formatCPFOrCNPJ(e) : ''),
          'cell-phone': (e: string) => (e ? msk.cellPhone(e) : ''),
          'short-date': (e: string) =>
            e ? e.replace(/(\d{2})(\d{2})/, '$1/$2') : '',
          money: (e: string) => (e ? msk.money(e) : ''),
        };

        const m = mascars[mask ?? ''];

        return (
          <Input
            error={error ? error.message : ''}
            value={mask ? m(value) : value}
            onChangeText={onChange}
            {...rest}
          />
        );
      }}
    />
  );
}
