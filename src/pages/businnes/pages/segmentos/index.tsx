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

interface IParmans {
    name: string
    workname: string
    avatar: string
    providerId: string
    token: string
}

type TSegments = 'b2b' | 'consumo' | 'indication'

export function Segments() {
    const params = useRoute().params as IParmans
    const { goBack, navigate } = useNavigation()
    const { user } = useAuth()
    const { mytoken } = useToken()

    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [cell, setCell] = useState('')
    const [value, setValue] = useState('')

    const [loading, setLoad] = useState(false)
    const [segmenst, setSegmens] = useState<TSegments>()

    const valor =
        value.length < 6 ? Number(_number(`${value},00`)) : Number(_number(value));

    function selecSegment(value: TSegments) {
        setSegmens(value)
        setName('')
        setCell('')
        setValue('')
        setDescription('')
    }

    async function submit() {

        const indication = {
            prestador_id: params.providerId,
            objto: {
                quemIndicaou_name: user.nome,
                client_name: name,
                phone_number: cell,
                description,
                token: mytoken,
            },
            type: 'INDICATION',
            token: mytoken,
        };

        const consumo = {
            prestador_id: params.providerId,
            client_id: user.id,
            token: params.token || 'token',
            objto: {
                token: mytoken,
                consumidor_name: user.nome,
                avatar: user.profile.avatar,
                description,
                valor,
            },
            type: 'CONSUMO_OUT',
        };

        const b2b = {
            prestador_id: params.providerId,
            objto: {
                send_name: user.nome,
                description,
                token: mytoken,
                avatar: user.profile.avatar,
            },
            token: params.token || 'token',
            situation: false,
            type: 'B2B',
        };

        const modalidade = {
            b2b,
            consumo,
            indication
        }

        try {
            await api
                .post(`${routesScheme.relationShip.create}`, modalidade[segmenst])
                .then(() => {
                    Alert.alert('Sucesso!', 'Continue a incentivar os membros do GEB');
                    navigate('sucess', { prestador: params.providerId, description });
                })

        } catch (error) {
            if (error instanceof AppError) {
                console.log(error.message)
            }

            console.log({ error })
        }

    }


    return (
        <S.container>
            <ScrollView contentContainerStyle={{
                paddingBottom: 300
            }}>
            <Box my='4' mx='8' >
                <TouchableOpacity onPress={() => goBack()} >
                    <ArrowLeft color={theme.colors.focus[1]} weight='duotone' size={35} />
                </TouchableOpacity>
            </Box>

                <HStack space={6} p={4} mt='2' >
                    <Avatar alignItems={'center'} size='xl' source={{ uri: params.avatar }} />

                    <Box w='220px' >
                        <S.title>{params.name}</S.title>
                        <S.text>{params.workname}</S.text>
                    </Box>
                </HStack>

                <Center mt='4'>
                    <S.title>Escolha qual negócios irá realizar</S.title>
                </Center>


                <VStack mt='4' space={3} p='4' >
                    <TouchableOpacity onPress={() => selecSegment('b2b')} >
                        <Center bg={segmenst === 'b2b' ? theme.colors.focus[1] : 'gray.200'} rounded={8} py='2' >
                            <S.textSegments>B2B</S.textSegments>
                        </Center>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => selecSegment('consumo')} >
                        <Center bg={segmenst === 'consumo' ? theme.colors.focus[1] : 'gray.200'} rounded={8} py='2' >
                            <S.textSegments>CONSUMO</S.textSegments>
                        </Center>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => selecSegment('indication')} >
                        <Center bg={segmenst === 'indication' ? theme.colors.focus[1] : 'gray.200'} rounded={8} py='2' >
                            <S.textSegments>INDIÇÃO</S.textSegments>
                        </Center>
                    </TouchableOpacity>
                </VStack>

                <Box>
                    {segmenst === 'b2b' && (
                        <Box p='4'>
                            <TextArea
                                borderRadius={10}
                                maxLength={100}
                                value={description}
                                onChangeText={h => setDescription(h)}
                                fontFamily={theme.fonts.regular}
                                fontSize={14}
                                color='gray.200'
                                placeholder='Descrição do B2B'
                                placeholderTextColor={'#726d51'}
                            />
                        </Box>
                    )}

                    {segmenst === 'consumo' && (
                        <VStack space={3} p='4' >
                            <TextArea
                                borderRadius={10}
                                maxLength={100}
                                value={description}
                                onChangeText={h => setDescription(h)}
                                fontFamily={theme.fonts.regular}
                                fontSize={14}
                                color='gray.200'
                                placeholder='Descrição do consumo'
                                placeholderTextColor={'#726d51'}
                            />

                            <Form>
                                <Input
                                    onChangeText={setValue}
                                    value={_currency(value)}
                                    placeholder='Valor consumido R$'
                                    name='cash'
                                    keyboardType='numeric'
                                />
                            </Form>
                        </VStack>
                    )}

                    {segmenst === 'indication' && (
                        <Form>
                            <VStack space={3} p='4' >
                                <TextArea
                                    borderRadius={10}
                                    maxLength={100}
                                    value={description}
                                    onChangeText={h => setDescription(h)}
                                    fontFamily={theme.fonts.regular}
                                    fontSize={14}
                                    color='gray.200'
                                    selectionColor='#fff'
                                />
                                <Input placeholder='Valor consumido R$' name='cash' />
                                <Input placeholder='Valor consumido R$' name='cash' />

                            </VStack>
                        </Form>


                    )}
                </Box>
            </ScrollView>


            {segmenst && (
                <Center>
                    <Button pres={submit} title='FINALIZAR' />
                </Center>

            )}
        </S.container>
    )
}