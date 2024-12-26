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

interface IDonate {
  item: string
  ponto: number
}

export function Donativos({ item, accept, reject }: I) {
  const name = String(item?.objeto?.nome)
  const [nome, sobrenome] = name ? name.split(' ').map(String) : ''
  const donate = item?.objeto?.donate as IDonate[] ?? [] as IDonate[]

  return (
    <S.Container>
      <HStack alignItems={'center'} justifyContent={'space-between'}>
        <HStack alignItems={'center'} space={3} >
          <Avatar source={{ uri: item?.avatar }} />
          <TextStyle>{nome} {sobrenome}</TextStyle>
        </HStack>
        <TextStyle>{format(new Date(item.created_at), 'dd/MM - HH:mm')}</TextStyle>
      </HStack>

      <S.warp>

        {donate.map(h => (
          <TextStyle key={h?.item} >{h?.item}</TextStyle>
        ))}
      </S.warp>

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