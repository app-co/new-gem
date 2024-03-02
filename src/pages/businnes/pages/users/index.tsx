import { useNavigation } from '@react-navigation/native';
import { useAllUsers } from '../../../../hooks/user';
import * as S from './styles'
import { useAuth } from '../../../../hooks/useAuth';
import { useState } from 'react';
import { Header } from '../../../../components/Header';
import { Box, Center, FlatList } from 'native-base';
import { Form } from '@unform/mobile';
import { Input } from '../../../../components/Inputs';
import { MembrosComponents } from '../../../../components/MembrosCompornents';
import { Loading } from '../../../../components/Loading';

export function Businnes() {
    const { navigate } = useNavigation();
    const { user } = useAuth();
    const { data, refetch, isLoading } = useAllUsers(user.hub);
  
    const [load, setLoad] = useState(true);
    const [search, setSearch] = useState('');

    const membros = data || [];


    const users =
    
    search.length > 0
      ? membros.filter(h => {
        const up = h.nome.toLocaleUpperCase();

        if (up.includes(search.toLocaleUpperCase()) && h.id !== user.id) {
          return h;
        }
        return null;
      })
      : membros.filter(h => h.id !== user.id);



    return (
      <S.container>
        <Header  />
        {isLoading ? (
          <Center flex='1' >
            <Loading />
          </Center>
        ) : (
          <Box>
            <Center mt='4' >
            <Form>
              <Box>
                <Input
                  autoCapitalize="characters"
                  name="find"
                  icon="search"
                  onChangeText={setSearch}
                />
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
                      pres={() => navigate('segments', {providerId: h.id, token: h.token, avatar: h.profile.avatar, name: h.nome, workname: h.profile.workName})}
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
        )}


      </S.container>
    )
}
