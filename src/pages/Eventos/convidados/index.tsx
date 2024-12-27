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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormInput } from '../../../components/forms/FormInput';

interface I {
  value: string;
  label: string;
}

const { mutations } = make()

const schema = z.object({
  nomeConvidado: z.string(),
  nome: z.string(),
})

type TSchema = z.infer<typeof schema>

export function Convidado() {
  const { user } = useAuth();
  const { goBack } = useNavigation();


  const { mutateAsync, isLoading } = mutations.registerRelation()
  const { control, formState: { errors }, handleSubmit } = useForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      nomeConvidado: '',
      nome: user.nome,
    },
  })


  const handleSave = React.useCallback(async (obj: TSchema) => {

    const data = {
      prestador_id: user.id,
      Avatar: user.profile.avatar,
      objeto: obj,
      type: 7,
    };

    await mutateAsync(data);
  }, []);


  return (
    <S.Container>

      <FormInput
        control={control}
        name='nomeConvidado'
        error={errors.nomeConvidado}
        placeholder='Nome do convidado'
      />

      <Box>
        <Button loading={isLoading} pres={handleSubmit(handleSave)} title="SALVAR" />
      </Box>


    </S.Container>
  );
}
