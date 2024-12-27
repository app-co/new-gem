import { Box, Center, VStack } from 'native-base';
import React from 'react';
import { Button } from '../../../components/Button';
import { useAuth } from '../../../hooks/useAuth';
import { _donates } from '../../../utils/donativos';
import * as S from './styles';
import { InputSelect } from '../../../components/forms/input-select';
import { make } from '../../../hooks';

interface I {
  value: string;
  label: string;
}

const { mutations, querys } = make()

export function Donativo() {
  const { user } = useAuth();


  const [itensDonates, setItensDonates] = React.useState<I[]>([]);
  const { mutateAsync, isLoading } = mutations.registerRelation()


  const handleSave = React.useCallback(async () => {
    const itens = itensDonates.map(h => {
      let ponto = 10

      if (h.value === 'Cesta básica P') {
        ponto = 200
      }
      if (h.value === 'Cesta básica M') {
        ponto = 300
      }
      if (h.value === 'Cesta básica G') {
        ponto = 400
      }

      return {
        item: h.value,
        ponto,
      }
    })


    const data = {
      prestador_id: user.id,
      objeto: {
        donate: itens,
        nome: user.nome
      },
      type: 6,
    };

    await mutateAsync(data);
  }, [itensDonates]);


  return (
    <S.Container>
      <S.title>DONATIVOS</S.title>

      <InputSelect
        options={_donates}
        label='Lista de Itens'
        isMultiple
        placeholder='Selecione'
        value={itensDonates}
        onChange={h => setItensDonates(h)}
      />

      <Box>
        <Button loading={isLoading} pres={handleSave} title="SALVAR" />
      </Box>


    </S.Container>
  );
}
