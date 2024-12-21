import React from 'react'
import * as S from './styles'
import { Image, Modal, TouchableOpacity } from 'react-native';
import { Box, Center, HStack, VStack } from 'native-base';
import { colors } from '../../../global/hub-colors';
import { useNavigation } from '@react-navigation/native';
import { TextStyle } from '../../forms/topograph';
import negocios from '../../../assets/negocios.jpg'
import { _canva } from '../../../utils/size';

interface I {
  openModal: boolean;
}

export function ModalInfoPresenca({ openModal }: I) {
  const navigation = useNavigation()

  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    setIsOpen(openModal)
  }, [openModal])

  const imgSize = _canva * 13

  return (
    <Modal transparent visible={false}>
      <Center flex={1}>
        <VStack
          p="8"
          borderRadius={4}
          space={4}
        >
          <S.title style={{ color: '#fff' }}>
            Sua presença está baixa :
          </S.title>
          <TextStyle type='subtitle' style={{ color: '#fff' }}>
            Total de eventos do geb:
          </TextStyle>

          <TextStyle type='subtitle' style={{ color: '#fff' }}>
            Suas presenças até o momento:
          </TextStyle>
        </VStack>
      </Center>
    </Modal>

  )
}