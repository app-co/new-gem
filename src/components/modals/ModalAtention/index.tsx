import React from 'react'
import * as S from './styles'
import { Image, Modal, TouchableOpacity } from 'react-native';
import { Box, Center, Circle, HStack, VStack } from 'native-base';
import { colors } from '../../../global/hub-colors';
import { useNavigation } from '@react-navigation/native';
import { TextStyle } from '../../forms/topograph';
import negocios from '../../../assets/negocios.jpg'
import { _canva } from '../../../utils/size';
import { Button } from '../../forms/Button';

interface I {
  openModal: boolean;
}

export function ModalAtention({ openModal }: I) {
  const navigation = useNavigation()

  const [isOpen, setIsOpen] = React.useState(true)

  React.useEffect(() => {
    setIsOpen(openModal)
  }, [openModal])

  const imgSize = _canva * 13

  return (
    <Modal visible={isOpen} >
      <Box justifyContent={'space-between'} py='10' flex='1' bg={colors.bg_color[2]}>
        <VStack p='8' >
          <TextStyle>Fique atento aos seus resultados</TextStyle>

          <Box mt='12' bg={colors.bg_color[1]} p='3' rounded={8} >
            <TextStyle type='title' colorText={colors.text[2]} style={{ textAlign: 'center' }} >Presença</TextStyle>
            <HStack alignItems={'center'} justifyContent={'space-between'} >
              <Box>
                <HStack w='150px' justifyContent={'space-between'} alignItems={'center'} >
                  <TextStyle>Suas presenças:</TextStyle>
                  <TextStyle type='subtitle' colorText={colors.focus[0]} >{0}</TextStyle>
                </HStack>
                <HStack w='154px' justifyContent={'space-between'} alignItems={'center'} >
                  <TextStyle>Total de encontros:</TextStyle>
                  <TextStyle type='subtitle' colorText={colors.focus[0]}>{0}</TextStyle>
                </HStack>
              </Box>

              <Circle size={'md'} bg='gray.600' >
                <TextStyle type='title' >
                  0%
                </TextStyle>
              </Circle>

            </HStack>
          </Box>

          <Box mt='12' bg={colors.bg_color[1]} p='3' rounded={8} >
            <TextStyle colorText={colors.text[2]} type='title' >Seus lançamentos</TextStyle>

            <Box mt='4' >
              <HStack justifyContent={'space-between'} >
                <TextStyle>Geral:</TextStyle>
                <TextStyle type='subtitle' colorText={colors.focus[0]}>{0}</TextStyle>

              </HStack>

              <HStack justifyContent={'space-between'} >
                <TextStyle>Vendas:</TextStyle>
                <TextStyle type='subtitle' colorText={colors.focus[0]} >
                  {0}
                </TextStyle>

              </HStack>

              <HStack justifyContent={'space-between'} >
                <TextStyle>Compensação:</TextStyle>
                <TextStyle type='subtitle' colorText={colors.focus[0]} >
                  {0} %
                </TextStyle>

              </HStack>
            </Box>

          </Box>
        </VStack>

        <Center>
          <Button pres={() => setIsOpen(false)} title='FECHAR' />

        </Center>
      </Box >
    </Modal >
  )
}