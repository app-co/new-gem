import { Box, Center, VStack, Wrap } from 'native-base';
import React from 'react';
import { Button } from '../../../components/Button';
import { useAuth } from '../../../hooks/useAuth';
import { _donates } from '../../../utils/donativos';
import * as S from './styles';
import { InputSelect } from '../../../components/forms/input-select';
import { make } from '../../../hooks';
import * as G from '..//styles'
import { Alert, TouchableOpacity } from 'react-native';
import { TextStyle } from '../../../components/forms/topograph';
import { _convertionType } from '../../../components/OrderIndicationComp';
import { colors } from '../../../global/hub-colors';
import { color } from 'native-base/lib/typescript/theme/styled-system';

interface I {
  value: string;
  label: string;
}

const hubs: { [key: number]: string } = {
  0: 'GEB Networking',
  1: 'Club da Mentaria'
}

const { mutations, querys } = make()

export function Apadrinhar() {
  const { user } = useAuth();


  const [selectUser, setSelectUser] = React.useState<I>();
  const [selectHub, setSelectHun] = React.useState(0)

  const { mutateAsync, isLoading } = mutations.registerRelation()

  const { data, fetchNextPage, isFetchingNextPage } = querys.useUserByHub({ hub: String(selectHub), nome: '' })
  const usersData = data?.pages.flatMap(h => h.records.filter(p => !p.apadrinhado).map(h => {
    return {
      value: h.id,
      label: h.nome,
    }
  })
  )


  const handleSave = React.useCallback(async () => {
    console.log(selectUser)

    const data = {
      objeto: {},
      userReceptorId: selectUser,
      type: 8,
    };

    Alert.alert('Atenção', 'Vocè realmente deseja apadrinhar este membro?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {

            await mutateAsync(data);
          },
        },
      ]
    )

  }, [selectUser]);


  return (
    <S.Container>
      <TextStyle>Selecione o HUB</TextStyle>
      <Wrap flexDir={'row'} >
        {user.hub.map(h => (
          <TouchableOpacity onPress={() => setSelectHun(h)} key={h} style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, backgroundColor: selectHub === h ? colors.focus[1] : colors.bg_color[2] }} >
            <TextStyle>{hubs[h]}</TextStyle>
          </TouchableOpacity>
        ))}
      </Wrap>

      <InputSelect
        options={usersData ?? []}
        label='Lista de Itens'
        placeholder='Selecione'
        value={selectUser}
        onChange={h => setSelectUser(h)}
        nexPage={fetchNextPage}
        load={isFetchingNextPage}
      />

      <Box>
        <Button loading={isLoading} pres={handleSave} title="SALVAR" />
      </Box>


    </S.Container>
  );
}
