import React from 'react';
import { FlatList, View } from 'react-native';
import { Box, Container, Title, TitleDescricao } from './styles';
import { TextStyle } from '../forms/topograph';

const Itens = [
  { nome: 'MEI', descricao: 'Micro Empreendedor Individual' },
  { nome: 'ME', descricao: 'Micro individual' },
  {
    nome: 'EIRELI',
    descricao: 'Epresa Individual de Responsabilidade Limidadta',
  },
  { nome: 'LTDA', descricao: 'Sociedade Limitada' },
  { nome: 'UNIPESSOAL', descricao: 'Sociedade Limitada' },
  { nome: 'SA', descricao: 'Sociedade Anônima' },
];

interface Props {
  selectItem: (item: string) => void;
}

export function ToglleEnquadramento({ selectItem }: Props) {
  return (
    <Container>
      {Itens.map(h => (
        <Box key={h.nome} onPress={() => selectItem(h.nome)}>
          <TextStyle type='subtitle' >{h.nome}</TextStyle>
          <TextStyle>{h.descricao}</TextStyle>
        </Box>
      ))}
    </Container>
  );
}
