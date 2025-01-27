import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { Box, Center, FlatList, HStack } from 'native-base';
import { useState } from 'react';
import { RefreshControl, TouchableOpacity } from 'react-native';
import { Header } from '../../../../components/Header';
import { Input } from '../../../../components/Inputs';
import { Loading } from '../../../../components/Loading';
import { MembrosComponents } from '../../../../components/MembrosCompornents';
import { useAuth } from '../../../../hooks/useAuth';
import { useAllUsers } from '../../../../hooks/user';
import * as S from './styles';
import { make } from '../../../../hooks';
import { colors } from '../../../../global/hub-colors';
import { TextStyle } from '../../../../components/forms/topograph';
import { Lista } from '../../../../components/ferramentas/lista';
import { IUser } from '../../../../hooks/dto/interfaces';

type THub = 'GEB' | 'CLUB_MENTORIA'

const { querys } = make()

export function Businnes() {
  const { navigate } = useNavigation();
  const { user } = useAuth();

  const [search, setSearch] = useState('');
  const [hub, setHub] = useState('9999')

  const nome = search.length > 3 ? search : ''

  const { data, refetch, isLoading, fetchNextPage } = querys.useUserByHub({
    nome,
    hub
  });


  const users = data?.pages.flatMap(h => h.records)


  return (
    <S.container>

      <Box>
        <Header />
        <Center mt='4' >
          <Form>
            <Box p='4' w='full' >
              <Input
                autoCapitalize="characters"
                name="find"
                icon="search"
                onChangeText={setSearch}
              />

              <Center mt='4' >
                <S.title>Escolha um Hub para encontrar um membro</S.title>

              </Center>

              <HStack space={4} >
                <TouchableOpacity onPress={() => setHub('0')} >
                  <Center bg={hub === '0' ? colors.focus[0] : colors.bg_color[1]} minW='100px' rounded={8} p='4' my='4' >
                    <TextStyle type='defaultSemiBold' colorText={hub === '0' ? colors.text[2] : colors.text[0]} >GEB</TextStyle>
                  </Center>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setHub('1')} >
                  <Center bg={hub === '1' ? colors.focus[0] : colors.bg_color[1]} minW='100px' rounded={8} p='4' my='4'>
                    <TextStyle type='defaultSemiBold' colorText={hub === '1' ? colors.text[2] : colors.text[0]} >CLUB DA MENTORIA</TextStyle>
                  </Center>
                </TouchableOpacity>
              </HStack>
            </Box>
          </Form>
        </Center>

        <Box>
          <FlatList
            contentContainerStyle={{ paddingBottom: 570 }}
            data={users}
            keyExtractor={h => h?.id}
            renderItem={({ item: h }) => (
              <MembrosComponents
                whats={h?.profile?.whats ?? "0"}
                google={h.midia[0]?.link ?? 'https://www.google.com.br/'}
                star={h?.avalicaoes}
                icon="necociar"
                pres={() => navigate('segments', { providerId: h?.id, avatar: h?.profile?.avatar, name: h?.nome, workname: h?.profile?.workName })}
                userName={h?.nome}
                user_avatar={h?.profile?.avatar}
                oficio={h?.profile?.workName}
                imageOfice={h?.profile?.logotipo}
              // inativoPres={h..inativo}
              // inativo={h.inativo}
              />
            )}
            onEndReached={() => fetchNextPage()}
            refreshControl={
              <RefreshControl onRefresh={refetch} refreshing={isLoading} />
            }
          />

        </Box>

      </Box>

    </S.container >
  )
}
