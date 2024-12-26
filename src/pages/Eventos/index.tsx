import React, { ReactNode, useCallback } from 'react'
import * as S from './styles'
import { TextStyle } from '../../../components/forms/topograph'
import { HandCoins, HandDeposit, HandHeart, HandPalm, PersonSimpleRun, UserPlus } from 'phosphor-react-native'
import { colors } from '../../../global/hub-colors'
import { _canva } from '../../../utils/size'
import { Header } from '../../../components/Header'
import { make } from '../../../hooks'
import { RenderItem } from './render-item'
import { PresenAs } from './render-types/PresenAs'
import { Donativos } from './render-types/Donativos'
import { Button } from '../../../components/forms/Button'
import { Box } from 'native-base'
import { ActivityIndicator, FlatList } from 'react-native'
import { IRelationship } from '../../../hooks/dto/interfaces'
import { Comvites, Convite } from './render-types/Comvites'
import { Corridas } from './render-types/Corridas'
import { useFocusEffect } from '@react-navigation/native'

const { querys, mutations } = make()

export function Eventos() {
  const icosize = _canva + 5

  const [relationType, setRelationType] = React.useState(5)

  function focusType(t: number) {
    if (relationType === t) return colors.focus[0]
    if (relationType === t) return colors.focus[0]
    if (relationType === t) return colors.focus[0]
    if (relationType === t) return colors.focus[0]

    return colors.focus[1]
  }

  function focusWeight(t: number) {
    if (relationType === t) return 'bold'
    if (relationType === t) return 'bold'
    if (relationType === t) return 'bold'
    if (relationType === t) return 'bold'

    return 'thin'
  }

  const focusTitle: { [key: number]: string } = {
    5: 'Lista de Presença',
    6: 'Lista de Donativos',
    7: 'Lista de Convidados',
    9: 'Lista dos Maratonistas',
  }

  const { data = [], isLoading, refetch } = querys.relationNotvalidBytype(relationType)
  const { mutateAsync, isLoading: load } = mutations.aproveRelation()

  async function handleAccept(id: number) {
    await mutateAsync(id)
  }

  async function handleReject(id: number) {
    await mutateAsync(id)
  }

  function renderItens(item: IRelationship) {

    const components: { [key: number]: ReactNode } = {
      [5]: <PresenAs accept={h => handleAccept(h)} reject={(h) => handleReject(h)} item={item} />,
      [6]: <Donativos accept={h => handleAccept(h)} reject={(h) => handleReject(h)} item={item} />,
      [7]: <Convite accept={h => handleAccept(h)} reject={(h) => handleReject(h)} item={item} />,
      [9]: <Corridas accept={h => handleAccept(h)} reject={(h) => handleReject(h)} item={item} />
    }

    return components[relationType]
  }

  useFocusEffect(useCallback(() => {
    refetch()
  }, []))


  return (
    <S.Container>
      <Header title='Validações dos Eventos' />
      {/* <TextStyle type='title' style={{ textAlign: 'center' }} >Validações dos Eventos</TextStyle> */}
      <S.warp>
        <S.touch onPress={() => setRelationType(5)} >
          <HandPalm weight={focusWeight(5)} color={focusType(5)} size={icosize} />
          <TextStyle style={{ textAlign: 'center' }} type='defaultSemiBold' >Presenças</TextStyle>
        </S.touch>

        <S.touch onPress={() => setRelationType(6)} >
          <HandHeart weight={focusWeight(6)} color={focusType(6)} size={icosize} />
          <TextStyle style={{ textAlign: 'center' }} type='defaultSemiBold' >Donativos</TextStyle>
        </S.touch>

        <S.touch onPress={() => setRelationType(7)} >
          <UserPlus weight={focusWeight(7)} color={focusType(7)} size={icosize} />
          <TextStyle style={{ textAlign: 'center' }} type='defaultSemiBold' >Convidados</TextStyle>
        </S.touch>

        <S.touch onPress={() => setRelationType(9)} >
          <PersonSimpleRun weight={focusWeight(9)} color={focusType(9)} size={icosize} />
          <TextStyle style={{ textAlign: 'center' }} type='defaultSemiBold' >Corridas</TextStyle>
        </S.touch>

      </S.warp>

      <Box mt={2} p='4' >

        {data.length > 0 && (
          <Button title='validar todos' />
        )}

        {isLoading && <Box w='100%' h='100%' justifyContent='center' alignItems='center' >
          <ActivityIndicator size='large' />
        </Box>}

        <Box mt={4} >

          <TextStyle type='subtitle' >{focusTitle[relationType]}</TextStyle>
        </Box>


        <FlatList
          contentContainerStyle={{
            gap: 10,
            paddingTop: 15
          }}
          data={data}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => renderItens(item)}
        />

      </Box>

    </S.Container>
  )
}