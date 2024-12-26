import { useNavigation } from '@react-navigation/native';
import { Box, Center, VStack } from 'native-base';
import React from 'react';
import { Alert, Modal, ScrollView, TouchableOpacity } from 'react-native';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import theme from '../../global/styles/club-mentoria';
import { useAuth } from '../../hooks/useAuth';
import { _donates } from '../../utils/donativos';
import * as S from './styles';
import { InputSelect } from '../../components/forms/input-select';
import { make } from '../../hooks';

interface I {
  value: string;
  label: string;
}

const { mutations } = make()

export function Donates() {
  const { user } = useAuth();
  const { goBack } = useNavigation();


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

    console.log(itens)

    const data = {
      prestador_id: user.id,
      objeto: {
        donate: itens,
        nome: user.nome
      },
      type: 6,
    };

    await mutateAsync(data);
    setItensDonates([])
    goBack();


    // await api.post('/relation-create', data).then(h => {
    //   adms.forEach(async h => {
    //     await sendMessage({
    //       title: 'Nova doação de donativos',
    //       text: `Membro ${user.nome} acabou de realizar um donativo e espera por sua aprovação`,
    //       token: h,
    //     });
    //   });
    //   Alert.alert('Sucesso!', 'Agradecemos sua preocupação com o próximo');
    // });
  }, [itensDonates]);


  return (
    <S.Container>
      <Header />
      <Center w="full" p="10">
        <S.title>DONATIVOS</S.title>

        <InputSelect
          options={_donates}
          label='Itens'
          isMultiple
          placeholder='Selecione'
          value={itensDonates}
          onChange={h => setItensDonates(h)}
        />

        <Box mt={20} >
          <Button loading={isLoading} pres={handleSave} title="SALVAR" />
        </Box>


      </Center>
    </S.Container>
  );
}
