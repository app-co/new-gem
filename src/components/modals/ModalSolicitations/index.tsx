import React from 'react'
import * as S from './styles'
import { Image, Modal, TouchableOpacity } from 'react-native';
import { Box, Center, HStack } from 'native-base';
import { colors } from '../../../global/hub-colors';
import { useNavigation } from '@react-navigation/native';
import { TextStyle } from '../../forms/topograph';
import negocios from '../../../assets/negocios.jpg'
import { _canva } from '../../../utils/size';

interface I {
  openModal: boolean;
}

export function ModalSolicitations({ openModal }: I) {
  const navigation = useNavigation()

  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    setIsOpen(openModal)
  }, [openModal])

  const imgSize = _canva * 13

  return (
    <Modal
      animationType="fade"
      visible={isOpen}
      transparent
    >
      <Center bg={'#2a2a2af0'} p={4} flex={1}>
        <Image style={{ width: imgSize, height: imgSize / 2 }} source={negocios} />
        <Box borderRadius={8}>

          <TextStyle colorText={colors.text[0]} type='title' style={{ textAlign: 'center', marginTop: 20 }}>
            Você tem negócios para aprovar
          </TextStyle>
          <HStack justifyContent={'space-between'} mt="10">
            <TouchableOpacity
              onPress={() => setIsOpen(false)}
              style={{
                padding: 10,
                backgroundColor: colors.focus[2],
                borderRadius: 8,
                alignItems: 'center'
              }}
            >
              <TextStyle type='defaultSemiBold' colorText={colors.text[0]}>
                APROVAR DEPOIS
              </TextStyle>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsOpen(false);
                navigation.navigate('SOLICITAÇÕES');
              }}
              style={{
                padding: 10,
                backgroundColor: colors.focus[0],
                borderRadius: 8,
                alignItems: 'center'
              }}
            >
              <TextStyle colorText={colors.text[2]} type='defaultSemiBold' >
                APROVAR AGORA
              </TextStyle>
            </TouchableOpacity>
          </HStack>
        </Box>
      </Center>
    </Modal>

  )
}