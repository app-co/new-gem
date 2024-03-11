/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box } from 'native-base';
import React, { useCallback } from 'react';
import { FlatList } from 'react-native';

import { format } from 'date-fns';
import { Header } from '../../components/Header';
import { ListPost } from '../../components/ListPost';
import { Loading } from '../../components/Loading';
import { usePosts } from '../../contexts/posts/posts';
import { IPostsDtos, IUserDtos } from '../../dtos';
import theme from '../../global/styles/geb';
import { useAllUsers } from '../../hooks/user';
import { api } from '../../services/api';
import { ButonPost, Container } from './styles';

export interface Res {
  post: IPostsDtos;
  user: IUserDtos;
}

export function Home() {
  const navigation = useNavigation();
  const { getPosts, isLoading } = usePosts()
  const users = useAllUsers('geb')

  const navigateToPost = useCallback(() => {
    navigation.navigate('Post');
  }, [navigation]);

  const posts = React.useMemo(() => {
    const post = getPosts || []

    const postLikeds = post.map(h => {
      const likes = h.like.length
      const allUsers = users.data || []
      const date = format(new Date(h.created_at), 'dd/MM/yy')
      const user = allUsers.find(p => p.id === h.fk_id_user)

      return {
        ...h,
        date,
        likes,
        username: user?.nome,
        avatar: user?.profile.avatar
      }

    })
    return postLikeds
  }, [getPosts, users.data]);


  const handleLike = useCallback(async (id: string) => {
    await api.post('/post/like', {
      fk_id_post: id,
    });
  }, []);

  console.log(posts)

  if (isLoading) {
    <Loading />;
  }

  return (
    <Container>
      <Header />

      <FlatList
        data={posts}
        keyExtractor={p => p.id}
        renderItem={({ item: h }) => (
          <Box>
            <ListPost
              state={true}
              presLike={() => handleLike(h.id)}
              avater={h.avatar}
              user_name={h.username}
              image={h.image}
              descriçao={h.description}
              like={h.likes}
            />
          </Box>
        )}
      />
      <ButonPost onPress={navigateToPost}>
        <AntDesign name="plus" size={35} color={theme.colors.primary} />
      </ButonPost>
    </Container>
  );
}
