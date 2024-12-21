/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

import { Feather } from '@expo/vector-icons';

import { Box, Select, Text } from 'native-base';


import { TypeInput } from '../Input';
import Mask from '../../../utils/mascara';

export type TSelectionItem = { value: string; label: string };

type T = TypeInput & {
  name: string;
  control: Control<any>;
  error?: FieldError;
  mask?: 'date' | 'cpf' | 'cell-phone' | 'placa' | 'cep' | 'currency';
  itens: TSelectionItem[];
  itemSelected?: (value: string) => void;
  label?: string;
  placeholder?: string;
};

const msk = new Mask();

export function FormSelection({
  name,
  control,
  label,
  placeholder,
  itens,
  error,
  ...rest
}: T) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <Box>
            {label && (
              <Text
                style={{
                  left: 20,
                  backgroundColor: '#fff',
                  paddingHorizontal: 5,
                  zIndex: 10,
                }}
              >
                {label}
              </Text>
            )}
            <Select
              placeholder={placeholder}
              color="gray.100"
              _text={{ color: 'gray.100', fontSize: 16 }}
              onValueChange={h => onChange(h)}
              fontSize="14px"
              _selectedItem={{
                color: 'gray.100',
                startIcon: (
                  <Box bg="gray.100" rounded={8} p={2}>
                    <Feather name="map-pin" size={20} color="#ccc" />
                  </Box>
                ),
              }}
              borderWidth={error ? '1.5px' : 1}
              borderColor={error ? '#ee5858' : '#bbbbbb'}
              defaultValue="Selecione um item"
              rounded="10px"
              h="45px"
            >
              {itens.map(h => (
                <Select.Item key={h.value} label={h.label} value={h.value} />
              ))}
            </Select>

            {error && (
              <Text style={{ color: '#ee5858', marginTop: 5 }}>
                {error.message}
              </Text>
            )}
          </Box>
        );
      }}
    />
  );
}
