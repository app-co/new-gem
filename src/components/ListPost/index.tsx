/* eslint-disable camelcase */
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'native-base';
import React from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../global/styles/club-mentoria';

import {
  Avatar,
  BoxAvatarPost,
  BoxImagePost,
  BoxPost,
  Container,
  HeaderPost,
  LikePost,
  Name,
  TextLike,
  TextPost,
  ViewLike,
} from './styles';

const { width, height } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.6;

interface Props {
  image: string;
  avater: string;
  user_name: string;
  descriçao: string;
  like: number;
  presLike: () => void;
  state: boolean;
  load: boolean;
}
export function ListPost({
  image,
  user_name,
  descriçao,
  like,
  avater,
  presLike,
  state,
  load
}: Props) {
  return (
    <Container>
      <BoxPost
        style={{
          width: ITEM_WIDTH,
          overflow: 'hidden',
        }}
      >
        <HeaderPost>
          <BoxAvatarPost>
            {avater === undefined && (
              <AntDesign name="user" size={RFValue(20)} />
            )}
            <Avatar source={{ uri: avater }} />
          </BoxAvatarPost>
          <Name> {user_name} </Name>
        </HeaderPost>

        <BoxImagePost style={{ width }}>
          <Image
            alt="image"
            size="350"
            resizeMode="contain"
            source={{ uri: image }}
          />
        </BoxImagePost>
        <TextPost>{descriçao}</TextPost>

        <ViewLike>
          <LikePost onPress={presLike}>
            {load ? (
              <ActivityIndicator />
            ) : (

              <AntDesign name="like2" size={30} color={state ? theme.colors.focus[1] : '#b3b3b3'} />
            )}
          </LikePost>

          <TextLike>{like}</TextLike>
        </ViewLike>
      </BoxPost>
    </Container>
  );
}
