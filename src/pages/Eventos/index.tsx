import React, { ReactNode, useCallback } from 'react'
import * as S from './styles'
import { HandCoins, HandDeposit, HandHeart, HandPalm, PersonSimpleRun, UserPlus, UserSquare } from 'phosphor-react-native'
import { PresenAs } from './render-types/PresenAs'
import { Donativos } from './render-types/Donativos'
import { Box } from 'native-base'
import { ActivityIndicator, FlatList } from 'react-native'
import { Convite } from './render-types/Comvites'
import { Corridas } from './render-types/Corridas'
import { useFocusEffect } from '@react-navigation/native'
import { make } from '../../hooks'
import { _canva, _height } from '../../utils/size'
import { colors } from '../../global/hub-colors'
import { IRelationship } from '../../hooks/dto/interfaces'
import { TextStyle } from '../../components/forms/topograph'
import { Header } from '../../components/Header'
import { Button } from '../../components/forms/Button'
import { useAuth } from '../../hooks/useAuth'
import { ValidePresenca } from './ValidePresenca'
import { Donativo } from './Donates'
import { Corrida } from './corridas'
import { Convidado } from './convidados'
import { Apadrinhar } from './Apadrinhar'

const { querys, mutations } = make()

export function Eventos() {
  const { user } = useAuth()
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
    5: 'Registro Pendente',
    6: 'Lista de Donativos',
    7: 'Lista de Convidados',
    9: 'Registro d',
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

  const eventos: { [key: number]: ReactNode } = {
    5: <ValidePresenca />,
    6: <Donativo />,
    7: <Convidado />,
    8: <Apadrinhar />,
    9: <Corrida />
  }

  const reletions = data.filter(h => h.userId === user.id)


  return (
    <S.Container>
      <Header title='Eventos' />

      <Box p={4} >
        <FlatList
          contentContainerStyle={{
            gap: 10,
            paddingBottom: 100
          }}
          data={reletions}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Box minH={_height * 0.2} >
              {renderItens(item)}
            </Box>
          )}
          ListHeaderComponent={
            <Box w={'full'} >
              <S.warp>
                <S.touch onPress={() => setRelationType(5)} >
                  <HandPalm weight={focusWeight(5)} color={focusType(5)} size={icosize} />
                  <TextStyle colorText={relationType === 5 ? colors.text[0] : colors.text[1]} style={{ textAlign: 'center' }} type={relationType === 5 ? 'defaultSemiBold' : 'default'} >Presenças</TextStyle>
                </S.touch>

                <S.touch onPress={() => setRelationType(6)} >
                  <HandHeart weight={focusWeight(6)} color={focusType(6)} size={icosize} />
                  <TextStyle colorText={relationType === 6 ? colors.text[0] : colors.text[1]} style={{ textAlign: 'center' }} type={relationType === 6 ? 'defaultSemiBold' : 'default'} >Donativos</TextStyle>
                </S.touch>

                <S.touch onPress={() => setRelationType(7)} >
                  <UserPlus weight={focusWeight(7)} color={focusType(7)} size={icosize} />
                  <TextStyle colorText={relationType === 7 ? colors.text[0] : colors.text[1]} style={{ textAlign: 'center' }} type={relationType === 7 ? 'defaultSemiBold' : 'default'} >Convidados</TextStyle>
                </S.touch>

                <S.touch onPress={() => setRelationType(9)} >
                  <PersonSimpleRun weight={focusWeight(9)} color={focusType(9)} size={icosize} />
                  <TextStyle colorText={relationType === 9 ? colors.text[0] : colors.text[1]} style={{ textAlign: 'center' }} type={relationType === 9 ? 'defaultSemiBold' : 'default'} >Corridas</TextStyle>
                </S.touch>

                <S.touch onPress={() => setRelationType(8)} >
                  <UserSquare weight={focusWeight(8)} color={focusType(8)} size={icosize} />
                  <TextStyle colorText={relationType === 8 ? colors.text[0] : colors.text[1]} style={{ textAlign: 'center' }} type={relationType === 8 ? 'defaultSemiBold' : 'default'} >Apadrinhar</TextStyle>
                </S.touch>

              </S.warp>

              <Box style={{ gap: 10 }} mt={2} >
                <TextStyle type='subtitle' >Registrar evento</TextStyle>
                {eventos[relationType]}
              </Box>

              {isLoading && <Box w='100%' h='100%' justifyContent='center' alignItems='center' >
                <ActivityIndicator size='large' />
              </Box>}

              <TextStyle style={{ marginTop: 10 }} type='subtitle' >Registros Pendentes</TextStyle>
            </Box>
          }
        />

      </Box>

    </S.Container>
  )
}