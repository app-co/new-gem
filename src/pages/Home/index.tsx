/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
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
import { useAuth } from '../../hooks/useAuth';
import { useAllUsers } from '../../hooks/user';
import { api } from '../../services/api';
import { ButonPost, Container } from './styles';

export interface Res {
  post: IPostsDtos;
  user: IUserDtos;
}

export function Home() {
  const navigation = useNavigation();
  const { getPosts, isLoading, refetch } = usePosts()
  const users = useAllUsers('geb')
  const { user } = useAuth()
  const [load, setLoad] = React.useState<boolean>(false)

  const navigateToPost = useCallback(() => {
    navigation.navigate('Post');
  }, [navigation]);

  const posts = React.useMemo(() => {
    const post = getPosts || []

    const postLikeds = post.map(h => {
      const likes = h.like.filter(h => h.liked).length
      const allUsers = users.data || []
      const date = format(new Date(h.created_at), 'dd/MM/yy')
      const findUser = allUsers.find(p => p.id === h.fk_id_user)
      const likedUser = h.like.find(p => p.liked && p.user_id === user.id) ? true : false

      return {
        ...h,
        date,
        likes,
        username: findUser?.nome,
        avatar: findUser?.profile.avatar,
        likedUser: likedUser,
      }

    })
    return postLikeds
  }, [getPosts, users.data]);


  const handleLike = useCallback(async (id: string) => {
    setLoad(true)
    try {
      await api.post('/post/like', {
        fk_id_post: id,
      });

      refetch()
      setLoad(false)

    } catch (error) {
      setLoad(false)
      console.log(error)
    }
  }, []);

  useFocusEffect(useCallback(() => {
    refetch()
  }, []))


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
              state={h.likedUser}
              presLike={() => handleLike(h.id)}
              avater={h.avatar}
              user_name={h.username}
              image={h.image}
              descriçao={h.description}
              like={h.likes}
              load={load}
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
