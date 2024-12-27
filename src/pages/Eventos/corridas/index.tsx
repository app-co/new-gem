import { useNavigation } from '@react-navigation/native';
import { Avatar, Box, Center, VStack } from 'native-base';
import React from 'react';
import { Button } from '../../../components/Button';
import { Header } from '../../../components/Header';
import { useAuth } from '../../../hooks/useAuth';
import { _donates } from '../../../utils/donativos';
import * as S from './styles';
import { InputSelect } from '../../../components/forms/input-select';
import { make } from '../../../hooks';

interface I {
  value: string;
  label: string;
}

const { mutations } = make()

export function Corrida() {
  const { user } = useAuth();


  const { mutateAsync, isLoading } = mutations.registerRelation()

  const handleSave = React.useCallback(async () => {
    const data = {
      prestador_id: user.id,
      objeto: {
        nome: user.nome
      },
      type: 9,
    };

    await mutateAsync(data);
  }, []);


  return (
    <S.Container>
      <Box>
        <Button loading={isLoading} pres={handleSave} title="REGISTRAR CORRIDA" />
      </Box>
    </S.Container>
  );
}
