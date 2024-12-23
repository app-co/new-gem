import { useNavigation, useRoute } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { Avatar, Box, Center, HStack, ScrollView, TextArea, VStack } from 'native-base'
import { ArrowLeft } from 'phosphor-react-native'
import { useState } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { Button } from '../../../../components/Button'
import { Input } from '../../../../components/Inputs'
import { useToken } from '../../../../contexts/Token'
import theme from '../../../../global/styles/club-mentoria'
import { useAuth } from '../../../../hooks/useAuth'
import { api } from '../../../../services/api'
import { routesScheme } from '../../../../services/schemeRoutes'
import { AppError } from '../../../../utils/AppError'
import { _currency, _number } from '../../../../utils/mask'
import * as S from './styles'
import { TextStyle } from '../../../../components/forms/topograph'
import { colors } from '../../../../global/hub-colors'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { validationB2b, validationConsumo, validationIndication } from '../../../../hooks/dto/validations'
import { TRelationB2b, TRelationConsumo, TRelationIndication } from '../../../../hooks/dto/types'
import { FormInput } from '../../../../components/forms/FormInput'
import { InputForm } from '../../../../components/forms/InputForm'
import { make } from '../../../../hooks'

interface IParmans {
  name: string
  workname: string
  avatar: string
  providerId: string
  token: string,
  hub: number
}

type TSegments = 'b2b' | 'consumo' | 'indication'

const { mutations } = make()

export function Segments() {
  const params = useRoute().params as IParmans
  const { goBack, navigate } = useNavigation()
  const { user } = useAuth()

  const { mutateAsync: resgister, isLoading } = mutations.registerRelation()


  const [segmenst, setSegmens] = useState<TSegments>()


  function selecSegment(value: TSegments) {
    setSegmens(value)

  }

  const b2b = useForm<TRelationB2b>({
    resolver: zodResolver(validationB2b.omit({ id: true })),
    defaultValues: {
      avatar: params?.avatar ?? '',
      hub: params?.hub,
      type: 3,
      userId: user.id,
      userReceptorId: params.providerId,
      valor: '0'
    }
  })

  const consumo = useForm<TRelationConsumo>({
    resolver: zodResolver(validationConsumo.omit({ id: true })),
    defaultValues: {
      avatar: params?.avatar ?? '',
      hub: params?.hub,
      type: 1,
      userId: user.id,
      userReceptorId: params.providerId,
    }
  })

  const indication = useForm<TRelationIndication>({
    resolver: zodResolver(validationIndication.omit({ id: true })),
    defaultValues: {
      avatar: params?.avatar ?? '',
      hub: params?.hub,
      type: 4,
      userId: user.id,
      userReceptorId: params.providerId,
      valor: '0',
      indicado_por: user.nome
    }
  })

  async function submitB2b(obj: TRelationIndication) {
    try {
      const dt = {
        ...obj,
        objeto: { assunto: obj.assunto }
      }
      console.log(dt)
      await resgister(dt)
      navigate('sucess', { workName: params.workname })
    } catch (error) {
      console.log(error)
    }
  }

  async function submitConsumo(obj: TRelationConsumo) {
    try {
      const dt = {
        ...obj,
        objeto: { assunto: obj.descricao }
      }
      console.log(dt)
      await resgister(dt)
      navigate('sucess', { workName: params.workname })
    } catch (error) {
      console.log(error)
    }
  }


  async function submitIndication(obj: TRelationIndication) {
    try {
      const dt = {
        ...obj,
        objeto: {
          descricao: obj.descricao,
          indicado_por: obj.indicado_por,
          nomeCliente: obj.nomeCliente,
          contatoCliente: obj.contatoCliente,
        }
      }
      console.log('dt', dt)
      await resgister(dt)
      // navigate('sucess', { workName: params?.workname })
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <S.container>
      <ScrollView contentContainerStyle={{
        paddingBottom: 100
      }}>
        <Box my='4' mx='8' >
          <TouchableOpacity onPress={() => goBack()} >
            <ArrowLeft color={theme.colors.focus[1]} weight='duotone' size={35} />
          </TouchableOpacity>
        </Box>

        <HStack space={6} p={4} mt='2' >
          <Avatar alignItems={'center'} size='xl' source={{ uri: params.avatar }} />

          <Box w='220px' >
            <S.title>{params?.name}</S.title>
            <S.text>{params?.workname}</S.text>
          </Box>
        </HStack>

        <Center mt='4'>
          <S.title>Escolha qual negócios irá realizar</S.title>
        </Center>


        <VStack mt='4' space={3} p='4' >
          <TouchableOpacity onPress={() => selecSegment('b2b')} >
            <Center bg={segmenst === 'b2b' ? colors.focus[1] : colors.bg_color[1]} rounded={8} py='2' >
              <TextStyle type='title' colorText={segmenst === 'b2b' ? colors.text[0] : colors.text[2]} >B2B</TextStyle>
            </Center>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => selecSegment('consumo')} >
            <Center bg={segmenst === 'consumo' ? colors.focus[1] : colors.bg_color[1]} rounded={8} py='2' >
              <TextStyle type='title' colorText={segmenst === 'consumo' ? colors.text[0] : colors.text[2]} >CONSUMO</TextStyle>
            </Center>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => selecSegment('indication')} >
            <Center bg={segmenst === 'indication' ? colors.focus[1] : colors.bg_color[1]} rounded={8} py='2' >
              <TextStyle type='title' colorText={segmenst === 'indication' ? colors.text[0] : colors.text[2]} >INDICAÇÃO</TextStyle>
            </Center>
          </TouchableOpacity>
        </VStack>

        <Box>
          {segmenst === 'b2b' && (
            <Box p='4'>
              <InputForm
                control={b2b.control}
                name='assunto'
                error={b2b.formState.errors.assunto}
                render={({ value, onChange }) => (
                  <TextArea
                    borderRadius={10}
                    maxLength={100}
                    onChangeText={h => onChange(h)}
                    fontFamily={theme.fonts.regular}
                    fontSize={14}
                    color='gray.200'
                    placeholder='Descrição do B2B'
                    placeholderTextColor={colors.text[1]}
                  />

                )}
              />


              {segmenst && (
                <Center mt={10}>
                  <Button loading={isLoading} pres={b2b.handleSubmit(submitB2b)} title='FINALIZAR' />
                </Center>
              )}
            </Box>
          )}

          {segmenst === 'consumo' && (
            <VStack space={3} p='4' >
              <InputForm
                control={consumo.control}
                name='descricao'
                error={consumo.formState.errors.descricao}
                render={({ value, onChange }) => (
                  <TextArea
                    borderRadius={10}
                    maxLength={100}
                    onChangeText={h => onChange(h)}
                    fontFamily={theme.fonts.regular}
                    fontSize={14}
                    color='gray.200'
                    placeholder='Descreva seu consumo'
                    placeholderTextColor={colors.text[1]}
                  />

                )}
              />
              <FormInput
                control={consumo.control}
                name='valor'
                error={consumo.formState.errors.valor}
                mask='money'
                keyboardType='numeric'
                placeholder='Valor a ser consumido R$'
              />

              {segmenst && (
                <Center mt={10}>
                  <Button loading={isLoading} pres={consumo.handleSubmit(submitConsumo)} title='FINALIZAR' />
                </Center>
              )}
            </VStack>
          )}

          {segmenst === 'indication' && (
            <VStack p='4' >
              <InputForm
                control={indication.control}
                name='descricao'
                error={indication.formState.errors.descricao}
                render={({ value, onChange }) => (
                  <TextArea
                    borderRadius={10}
                    maxLength={100}
                    onChangeText={h => onChange(h)}
                    fontFamily={theme.fonts.regular}
                    fontSize={14}
                    color='gray.200'
                    placeholder='Descreva seu consumo'
                    placeholderTextColor={colors.text[1]}
                  />

                )}
              />

              <Box mt={5} >

                <FormInput
                  control={indication.control}
                  name='nomeCliente'
                  error={indication.formState.errors.nomeCliente}
                  placeholder='Nome do cliente'
                />


                <FormInput
                  control={indication.control}
                  name='contatoCliente'
                  error={indication.formState.errors.contatoCliente}
                  placeholder='Contato do cliente'
                  keyboardType='numeric'
                  mask='cell-phone'
                  maxLength={16}
                />
              </Box>


              {segmenst && (
                <Center mt={4}>
                  <Button loading={isLoading} pres={indication.handleSubmit(submitIndication)} title='FINALIZAR' />
                </Center>
              )}

            </VStack>


          )}
        </Box>
      </ScrollView>
    </S.container>
  )
}