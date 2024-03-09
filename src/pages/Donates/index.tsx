import { useNavigation } from '@react-navigation/native';
import { Box, Center, VStack } from 'native-base';
import React from 'react';
import { Alert, Modal, ScrollView, TouchableOpacity } from 'react-native';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { useToken } from '../../contexts/Token';
import theme from '../../global/styles/club-mentoria';
import { useAuth } from '../../hooks/useAuth';
import { useAllUsers } from '../../hooks/user';
import { api } from '../../services/api';
import { _donates } from '../../utils/donativos';
import * as S from './styles';

interface I {
  item: string;
}

export function Donates() {
  const { user } = useAuth();
  const { goBack } = useNavigation();
  const { data } = useAllUsers();
  const { sendMessage, mytoken } = useToken();

  const adm = data || [];
  const [modal, setModal] = React.useState(false);

  const [itensDonates, setItensDonates] = React.useState<I[]>([
    { item: 'Nenhum item foi selecionado' },
  ]);

  const handleSave = React.useCallback(async () => {
    const data = {
      prestador_id: user.id,
      objto: {
        itens: itensDonates,
      },
      type: 'DONATE',
    };

    const adms = adm.filter(h => h.adm === true).map(h => h.token);

    await api.post('/relation-create', data).then(h => {
      adms.forEach(async h => {
        await sendMessage({
          title: 'Nova doação de donativos',
          text: `Membro ${user.nome} acabou de realizar um donativo e espera por sua aprovação`,
          token: h,
        });
      });
      Alert.alert('Sucesso!', 'Agradecemos sua preocupação com o próximo');
      goBack();
    });
  }, [adm, goBack, itensDonates, sendMessage, user.id]);

  const handleSelect = React.useCallback(
    async (index: I) => {
      const findindex = itensDonates.findIndex(i => i.item === index.item);
      const arrSelect = [...itensDonates];

      if (findindex !== -1) {
        arrSelect.splice(findindex, 1);
      } else {
        arrSelect.push(index);
      }

      setItensDonates(
        arrSelect.filter(h => h.item !== 'Nenhum item foi selecionado'),
      );
    },
    [itensDonates],
  );

  return (
    <S.Container>
      <Header />
      <Center w="full" p="10">
        <S.title>DONATIVOS</S.title>

        <TouchableOpacity
          style={{ margin: 20 }}
          onPress={() => setModal(true)}
        >
          <Center w='300px' borderColor={theme.colors.focus[1]} borderWidth={2} px="4" py="2" borderRadius={4}>
            <S.title  >Lista de itens</S.title>
          </Center>
        </TouchableOpacity>

        <Modal visible={modal} animationType="fade">
          <Box bg={theme.colors.bg_color[3]} py="8">
            <VStack p="4" alignItems="center" justifyContent="space-between">
              <S.title>Selecione os itens que deseja doar</S.title>
              <TouchableOpacity onPress={() => setModal(false)}>
                <Box
                  borderRadius="4"
                  py="2"
                  px="4"
                  bg={theme.colors.focus[1]}
                >
                  <S.title style={{ color: '#000' }}>FECHAR</S.title>
                </Box>
              </TouchableOpacity>
            </VStack>
            <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
              {_donates.map(h => (
                <TouchableOpacity
                  onPress={() => handleSelect(h)}
                  key={h.item}
                >
                  <Box
                    px="4"
                    py="2"
                    my="1"
                    bg={
                      itensDonates.findIndex(i => i.item === h.item) !== -1
                        ? theme.colors.focus[1]
                        : '#4c4c4c'
                    }
                  >
                    <S.subTitle
                      style={{ color: itensDonates.findIndex(i => i.item === h.item) !== -1 ? '#262626' : '#fff' }}
                      selected={
                        itensDonates.findIndex(i => i.item === h.item) !== -1
                      }
                    >
                      {h.item}
                    </S.subTitle>
                  </Box>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Box>
        </Modal>

        <Box w="full">
          <S.title>Seus itens</S.title>
          <S.content>
            {itensDonates.map(h => (
              <S.text style={{ color: '#fff' }}>{h.item}</S.text>
            ))}
          </S.content>
        </Box>

        <Button pres={handleSave} title="SALVAR" />
      </Center>
    </S.Container>
  );
}
