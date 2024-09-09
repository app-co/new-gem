/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useId, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { useQuery } from 'react-query';

import { Header } from '../../../components/Header';
import { Loading } from '../../../components/Loading';
import { IGlobalPonts } from '../../../dtos';
import theme from '../../../global/styles/geb';
import { api } from '../../../services/api';
import {
  Box,
  BoxClassificacao,
  BoxFiltro,
  BoxLista,
  Container,
  TitleFiltro,
  TitleList,
  TitleType,
} from './styles';

interface PropResponse {
  TP: PropsTotalPontos[];
  compras: Tips[];
  vendas: Tips[];
  presenca: Tips[];
  indication: Tips[];
  b2b: Tips[];
}

interface Tips {
  id: string;
  nome: string;
  pontos: number;
  rank: number;
}

interface PropsTotalPontos {
  name: string;
  totalPontos: number;
}

export function Ranking() {
  const [type, setType] = useState('entrada');
  const [filtro, setFiltro] = useState('mes');

  const reactId = useId();

  const data = useQuery('rank-global', async () => {
    const rs = await api.get('/user/global-rank');

    return rs.data as IGlobalPonts;
  });

  const global = React.useMemo(() => {
    const rank = (data.data as IGlobalPonts) || {};

    const consumo = rank.compras;
    const { vendas } = rank;
    const { TP } = rank;
    const { b2b } = rank;
    const { presenca } = rank;
    const indi = rank.indication;
    const padri = rank.padrinho;
    const invit = rank.convidado;
    const donate = rank.donates;

    return { consumo, vendas, b2b, indi, padri, invit, donate, presenca, TP };
  }, [data.data]);

  // todo entrada ...................

  if (data.isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Header />

      <>
        <View
          style={{
            flexDirection: 'row',
            padding: 25,
          }}
        >
          <ScrollView horizontal>
            <Box type={type === 'total'} onPress={() => setType('total')}>
              <TitleType type={type === 'total'}>TOTAL</TitleType>
            </Box>
            <Box type={type === 'entrada'} onPress={() => setType('entrada')}>
              <TitleType type={type === 'entrada'}>VENDAS</TitleType>
            </Box>

            <Box type={type === 'saida'} onPress={() => setType('saida')}>
              <TitleType type={type === 'saida'}>COMPRAS</TitleType>
            </Box>

            <Box
              type={type === 'indicaçao'}
              onPress={() => setType('indicaçao')}
            >
              <TitleType type={type === 'indicaçao'}>Indicações</TitleType>
            </Box>

            <Box type={type === 'presença'} onPress={() => setType('presença')}>
              <TitleType type={type === 'presença'}>Presença</TitleType>
            </Box>

            <Box type={type === 'padrinho'} onPress={() => setType('padrinho')}>
              <TitleType type={type === 'padrinho'}>Padrinho</TitleType>
            </Box>

            <Box type={type === 'b2b'} onPress={() => setType('b2b')}>
              <TitleType type={type === 'padrinho'}>B2B</TitleType>
            </Box>

            <Box type={type === 'donate'} onPress={() => setType('donate')}>
              <TitleType type={type === 'donate'}>DONATIVOS</TitleType>
            </Box>

            <Box type={type === 'invit'} onPress={() => setType('invit')}>
              <TitleType type={type === 'invit'}>CONVIDADOS</TitleType>
            </Box>
          </ScrollView>
        </View>

        {type === 'entrada' && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: RFValue(36),
            }}
          >
            <BoxFiltro
              onPress={() => setFiltro('mes')}
              filtro={filtro === 'mes'}
            >
              <TitleFiltro filtro={filtro === 'mes'}>MES</TitleFiltro>
            </BoxFiltro>

            <BoxFiltro
              onPress={() => setFiltro('ano')}
              filtro={filtro === 'ano'}
            >
              <TitleFiltro filtro={filtro === 'ano'}>Ano</TitleFiltro>
            </BoxFiltro>

            <BoxFiltro
              onPress={() => setFiltro('todos')}
              filtro={filtro === 'todos'}
            >
              <TitleFiltro filtro={filtro === 'todos'}>Todos</TitleFiltro>
            </BoxFiltro>
          </View>
        )}

        <View style={{ marginTop: RFValue(20), paddingBottom: 200 }}>
          {type === 'total' && (
            <FlatList
              data={global.TP}
              keyExtractor={h => h.name}

              renderItem={({ item: h, index }) => (
                <TouchableOpacity
                  onPress={() => { }}
                  style={{
                    paddingBottom: 20,
                  }}
                >
                  <BoxLista>
                    <BoxClassificacao>
                      <TitleList
                        style={{
                          fontSize: 26,
                          color: theme.colors.color_text.dark,
                        }}
                      >
                        {index + 1}
                      </TitleList>
                    </BoxClassificacao>

                    <View
                      style={{
                        flex: 1,
                        marginLeft: 20,
                      }}
                    >
                      <TitleList
                        style={{
                          fontSize: RFValue(20),
                          fontFamily: theme.fonts.bold,
                        }}
                      >
                        {' '}
                        {h.nome}{' '}
                      </TitleList>
                      <TitleList> { } </TitleList>
                    </View>

                    <View
                      style={{
                        alignItems: 'center',
                        flex: 1,
                      }}
                    >
                      <TitleList
                        style={{
                          fontSize: RFValue(16),
                          fontFamily: theme.fonts.bold,
                          textAlign: 'center',
                        }}
                      >
                        Pontuação
                      </TitleList>
                      <TitleList>{h.totalPontos} pts</TitleList>
                    </View>
                  </BoxLista>
                </TouchableOpacity>
              )}
            />
          )}

          {type === 'entrada' && (
            <FlatList
              data={global.vendas}
              keyExtractor={h => h.id}
              contentContainerStyle={{
                gap: 4
              }}
              renderItem={({ item: h }) => (
                <BoxLista>
                  <BoxClassificacao>
                    <TitleList
                      style={{
                        fontSize: 26,
                        color: theme.colors.color_text.ligh,
                      }}
                    >
                      {h.rank}
                    </TitleList>
                  </BoxClassificacao>

                  <View
                    style={{
                      flex: 1,
                      marginLeft: 20,
                    }}
                  >
                    <TitleList
                      style={{
                        fontSize: RFValue(20),
                        fontFamily: theme.fonts.bold,
                        color: theme.colors.color_text.ligh,
                      }}
                    >
                      {' '}
                      {h.nome}{' '}
                    </TitleList>
                    <TitleList> { } </TitleList>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      flex: 1,
                    }}
                  >
                    <TitleList
                      style={{
                        fontSize: RFValue(16),
                        fontFamily: theme.fonts.bold,
                        textAlign: 'center',
                      }}
                    >
                      Pontuação
                    </TitleList>
                    <TitleList>{h.pontos} pts</TitleList>
                  </View>
                </BoxLista>
              )}
            />
          )}

          {type === 'saida' && (
            <FlatList
              data={global.consumo}
              keyExtractor={h => h.id}
              renderItem={({ item: h }) => (
                <BoxLista>
                  <BoxClassificacao>
                    <TitleList
                      style={{
                        fontSize: 26,
                        color: theme.colors.color_text.dark,
                      }}
                    >
                      {h.rank}
                    </TitleList>
                  </BoxClassificacao>

                  <View
                    style={{
                      flex: 1,
                      marginLeft: 20,
                    }}
                  >
                    <TitleList
                      style={{
                        fontSize: RFValue(20),
                        fontFamily: theme.fonts.bold,
                      }}
                    >
                      {' '}
                      {h.nome}{' '}
                    </TitleList>
                    <TitleList> { } </TitleList>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      flex: 1,
                    }}
                  >
                    <TitleList
                      style={{
                        fontSize: RFValue(16),
                        fontFamily: theme.fonts.bold,
                        textAlign: 'center',
                      }}
                    >
                      Pontuação
                    </TitleList>
                    <TitleList>{h.pontos} pts</TitleList>
                  </View>
                </BoxLista>
              )}
            />
          )}

          {type === 'indicaçao' && (
            <FlatList
              data={global.indi}
              keyExtractor={h => h.id}
              renderItem={({ item: h }) => (
                <BoxLista>
                  <BoxClassificacao>
                    <TitleList
                      style={{
                        fontSize: 26,
                        color: theme.colors.color_text.dark,
                      }}
                    >
                      {h.rank}
                    </TitleList>
                  </BoxClassificacao>

                  <View
                    style={{
                      flex: 1,
                      marginLeft: 20,
                    }}
                  >
                    <TitleList
                      style={{
                        fontSize: RFValue(20),
                        fontFamily: theme.fonts.bold,
                      }}
                    >
                      {' '}
                      {h.nome}{' '}
                    </TitleList>
                    <TitleList> { } </TitleList>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      flex: 1,
                    }}
                  >
                    <TitleList
                      style={{
                        fontSize: RFValue(16),
                        fontFamily: theme.fonts.bold,
                        textAlign: 'center',
                      }}
                    >
                      Pontuação
                    </TitleList>
                    <TitleList>{h.pontos} pts</TitleList>
                  </View>
                </BoxLista>
              )}
            />
          )}

          {type === 'presença' && (
            <FlatList
              data={global.presenca}
              keyExtractor={h => h.id}
              renderItem={({ item: h }) => (
                <BoxLista>
                  <BoxClassificacao>
                    <TitleList
                      style={{
                        fontSize: 26,
                        color: theme.colors.color_text.dark,
                      }}
                    >
                      {h.rank}
                    </TitleList>
                  </BoxClassificacao>

                  <View
                    style={{
                      flex: 1,
                      marginLeft: 20,
                    }}
                  >
                    <TitleList
                      style={{
                        fontSize: RFValue(20),
                        fontFamily: theme.fonts.bold,
                      }}
                    >
                      {' '}
                      {h.nome}{' '}
                    </TitleList>
                    <TitleList> { } </TitleList>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      flex: 1,
                    }}
                  >
                    <TitleList
                      style={{
                        fontSize: RFValue(16),
                        fontFamily: theme.fonts.bold,
                        textAlign: 'center',
                      }}
                    >
                      Pontuação
                    </TitleList>
                    <TitleList>{h.pontos} pts</TitleList>
                  </View>
                </BoxLista>
              )}
            />
          )}

          {type === 'padrinho' && (
            <FlatList
              data={global.padri}
              keyExtractor={h => h.id}
              renderItem={({ item: h }) => (
                <BoxLista>
                  <BoxClassificacao>
                    <TitleList
                      style={{
                        fontSize: 26,
                        color: theme.colors.color_text.dark,
                      }}
                    >
                      {h.rank}
                    </TitleList>
                  </BoxClassificacao>

                  <View
                    style={{
                      flex: 1,
                      marginLeft: 20,
                    }}
                  >
                    <TitleList
                      style={{
                        fontSize: RFValue(20),
                        fontFamily: theme.fonts.bold,
                      }}
                    >
                      {' '}
                      {h.nome}{' '}
                    </TitleList>
                    <TitleList> { } </TitleList>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      flex: 1,
                    }}
                  >
                    <TitleList
                      style={{
                        fontSize: RFValue(16),
                        fontFamily: theme.fonts.bold,
                        textAlign: 'center',
                      }}
                    >
                      Pontuação
                    </TitleList>
                    <TitleList>{h.pontos} pts</TitleList>
                  </View>
                </BoxLista>
              )}
            />
          )}

          {type === 'b2b' && (
            <FlatList
              data={global.b2b}
              keyExtractor={h => h.id}
              renderItem={({ item: h }) => (
                <BoxLista>
                  <BoxClassificacao>
                    <TitleList
                      style={{
                        fontSize: 26,
                        color: theme.colors.color_text.dark,
                      }}
                    >
                      {h.rank}
                    </TitleList>
                  </BoxClassificacao>

                  <View
                    style={{
                      flex: 1,
                      marginLeft: 20,
                    }}
                  >
                    <TitleList
                      style={{
                        fontSize: RFValue(20),
                        fontFamily: theme.fonts.bold,
                      }}
                    >
                      {' '}
                      {h.nome}{' '}
                    </TitleList>
                    <TitleList> { } </TitleList>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      flex: 1,
                    }}
                  >
                    <TitleList
                      style={{
                        fontSize: RFValue(16),
                        fontFamily: theme.fonts.bold,
                        textAlign: 'center',
                      }}
                    >
                      Pontuação
                    </TitleList>
                    <TitleList>{h.pontos} pts</TitleList>
                  </View>
                </BoxLista>
              )}
            />
          )}

          {type === 'donate' && (
            <FlatList
              data={global.donate}
              keyExtractor={h => h.id}
              renderItem={({ item: h }) => (
                <BoxLista>
                  <BoxClassificacao>
                    <TitleList
                      style={{
                        fontSize: 26,
                        color: theme.colors.color_text.dark,
                      }}
                    >
                      {h.rank}
                    </TitleList>
                  </BoxClassificacao>

                  <View
                    style={{
                      flex: 1,
                      marginLeft: 20,
                    }}
                  >
                    <TitleList
                      style={{
                        fontSize: RFValue(20),
                        fontFamily: theme.fonts.bold,
                      }}
                    >
                      {' '}
                      {h.nome}{' '}
                    </TitleList>
                    <TitleList> { } </TitleList>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      flex: 1,
                    }}
                  >
                    <TitleList
                      style={{
                        fontSize: RFValue(16),
                        fontFamily: theme.fonts.bold,
                        textAlign: 'center',
                      }}
                    >
                      Pontuação
                    </TitleList>
                    <TitleList>{h.pontos} pts</TitleList>
                  </View>
                </BoxLista>
              )}
            />
          )}

          {type === 'invit' && (
            <FlatList
              data={global.invit}
              keyExtractor={h => h.id}
              renderItem={({ item: h }) => (
                <BoxLista>
                  <BoxClassificacao>
                    <TitleList
                      style={{
                        fontSize: 26,
                        color: theme.colors.color_text.dark,
                      }}
                    >
                      {h.rank}
                    </TitleList>
                  </BoxClassificacao>

                  <View
                    style={{
                      flex: 1,
                      marginLeft: 20,
                    }}
                  >
                    <TitleList
                      style={{
                        fontSize: RFValue(20),
                        fontFamily: theme.fonts.bold,
                      }}
                    >
                      {' '}
                      {h.nome}{' '}
                    </TitleList>
                    <TitleList> { } </TitleList>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      flex: 1,
                    }}
                  >
                    <TitleList
                      style={{
                        fontSize: RFValue(16),
                        fontFamily: theme.fonts.bold,
                        textAlign: 'center',
                      }}
                    >
                      Pontuação
                    </TitleList>
                    <TitleList>{h.pontos} pts</TitleList>
                  </View>
                </BoxLista>
              )}
            />
          )}
        </View>
      </>
    </Container>
  );
}
