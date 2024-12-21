/* eslint-disable react/require-default-props */
import React from 'react';

import { Radio } from 'native-base';

import { cor } from '@/styles/cor';

export type TRadios = { label: string; value: string };
interface I {
  radios: TRadios[];
  alin?: 'row' | 'column';
  name?: string;
  setItem: (value: string) => void;
}
export function RadioGrup({
  radios,
  setItem,
  name = 'my group',
  alin = 'column',
}: I) {
  const [s, set] = React.useState();

  return (
    <Radio.Group
      onChange={h => setItem(h)}
      name={name}
      defaultValue="0"
      direction={alin}
      space={2}
    >
      {radios.map(h => (
        <Radio
          size="lg"
          _checked={{
            borderColor: cor.focus.a,
            _icon: { color: cor.focus.a },
          }}
          // colorScheme="primary"
          value={h.value}
        >
          {h.value}
        </Radio>
      ))}
    </Radio.Group>
  );
}
