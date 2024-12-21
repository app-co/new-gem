/* eslint-disable react/require-default-props */
import React from 'react';

import { Box, Select, Text } from 'native-base';

import { cor } from '@/styles/cor';
import { _title, hightPercent } from '@/styles/sizes';

export type TSelectionItem = { value: string; label: string };

interface I {
  itens: TSelectionItem[];
  itemSelected: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export function Selection({ itens, placeholder, label, itemSelected }: I) {
  return (
    <Box>
      {label && (
        <Text color={cor.text.light} mb={2}>
          {label}
        </Text>
      )}
      <Select
        placeholder={placeholder}
        onValueChange={h => itemSelected(h)}
        _text={{ color: cor.focus.a }}
        color={cor.text.light}
        size={_title + 10}
        defaultValue="Selecione um item"
        rounded="15px"
        h={`${hightPercent('6')}px`}
      >
        {itens.map(h => (
          <Select.Item key={h.value} label={h.label} value={h.value} />
        ))}
      </Select>
    </Box>
  );
}
