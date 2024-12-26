import React from 'react'
import * as S from './styles'
import { Avatar, Box, HStack } from 'native-base'
import { TextStyle } from '../../../../../components/forms/topograph'
import { IRelationship } from '../../../../../hooks/dto/interfaces'
import * as G from '../../styles'
import { colors } from '../../../../../global/hub-colors'
import { format } from 'date-fns'

interface I {
  item: IRelationship
  accept: (id: number) => void
  reject: (id: number) => void
}

export function Convite({ item, accept, reject }: I) {
  const name = String(item?.objeto?.nome)
  const [nome, sobrenome] = name ? name.split(' ').map(String) : ''

  return (
    <S.Container>
      <HStack alignItems={'center'} justifyContent={'space-between'}>
        <HStack alignItems={'center'} space={3} >
          <Avatar source={{ uri: item?.avatar }} />
          <TextStyle>{nome} {sobrenome}</TextStyle>
        </HStack>
        <Box p={2} rounded={10} bg={colors.bg_color[2]}>
          <TextStyle type='subtitle' >{format(new Date(item.created_at), 'dd/MM - HH:mm')}</TextStyle>

        </Box>
      </HStack>

      <Box mt={4} >
        <TextStyle colorText={colors.alert[0]} >Nome do convidado</TextStyle>
        <TextStyle type='subtitle' >{item?.objeto?.nomeConvidado}</TextStyle>
      </Box>

      <HStack space={10} mt={4} >
        <G.reject onPress={() => reject(item.id)} >
          <TextStyle colorText={colors.text[0]} >RECUSAR</TextStyle>
        </G.reject>

        <G.accept onPress={() => accept(item.id)} >
          <TextStyle colorText={colors.text[2]} >ACEITAR</TextStyle>
        </G.accept>
      </HStack>
    </S.Container>
  )
}