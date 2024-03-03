import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { Box, Center, FlatList, HStack } from 'native-base';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Header } from '../../../../components/Header';
import { Input } from '../../../../components/Inputs';
import { Loading } from '../../../../components/Loading';
import { MembrosComponents } from '../../../../components/MembrosCompornents';
import { useAuth } from '../../../../hooks/useAuth';
import { useAllUsers } from '../../../../hooks/user';
import * as S from './styles';

type THub = 'GEB' | 'CLUB_MENTORIA'

export function Businnes() {
  const { navigate } = useNavigation();
  const { user } = useAuth();
  const { data, refetch, isLoading } = useAllUsers(user.hub);
  const [hub, setHub] = useState<THub>()

  const [load, setLoad] = useState(true);
  const [search, setSearch] = useState('');

  const membros = data || [];

  const hubsUsers = membros.filter(h => h.hub === hub)


  const users =
    search.length > 0
      ? hubsUsers.filter(h => {
        const up = h.nome.toLocaleUpperCase();

        if (up.includes(search.toLocaleUpperCase()) && h.id !== user.id) {
          return h;
        }
        return null;
      })
      : hubsUsers.filter(h => h.id !== user.id);



  return (
    <S.container>
      <Header />
      {isLoading ? (
        <Center flex='1' >
          <Loading />
        </Center>
      ) : (
        <Box>
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
                  <S.title>Escolha um hub para selecionar um membro</S.title>

                </Center>

                <HStack space={4} >
                  <TouchableOpacity onPress={() => setHub('GEB')} >
                    <Center bg='gray.600' minW='100px' rounded={8} p='4' my='4' >
                      <S.title>GEB</S.title>
                    </Center>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setHub('CLUB_MENTORIA')} >
                    <Center bg='gray.600' minW='100px' rounded={8} p='4' my='4'>
                      <S.title>CLUB DA MENTORIA</S.title>
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
              keyExtractor={h => h.id}
              renderItem={({ item: h }) => (
                <MembrosComponents
                  star={h.media}
                  icon="necociar"
                  pres={() => navigate('segments', { providerId: h.id, token: h.token, avatar: h.profile.avatar, name: h.nome, workname: h.profile.workName })}
                  userName={h.nome}
                  user_avatar={h.profile.avatar}
                  oficio={h.profile.workName}
                  imageOfice={h.profile.logo}
                // inativoPres={h..inativo}
                // inativo={h.inativo}
                />
              )}
            />

          </Box>

        </Box>
      )
      }


    </S.container >
  )
}
