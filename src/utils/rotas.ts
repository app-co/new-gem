import { colors } from '../global/hub-colors';
import theme from '../global/styles/club-mentoria';
import { Ranking } from '../pages/ADM/Classificacao';
import { SingUp } from '../pages/ADM/CreateUser';
import { DeletUser } from '../pages/ADM/DeleteUser';
import { ValidateEventos } from '../pages/ADM/Eventos';
import { UploadAvatar } from '../pages/ADM/UploadAvatar';
import { Consumo } from '../pages/Consumo';
import { Eventos } from '../pages/Eventos';
import { FindUser } from '../pages/FindMembro';
import { Inicio } from '../pages/Inicio';
import { Profile } from '../pages/Profile';
import { Solicitaions } from '../pages/Solicitaions';
import { StacKMembros } from '../routes/StackMembros';
import { TabBarApp } from '../routes/TabBarApp';

export const rotas = [
  {
    focus: theme.colors.focus[1],
    color: theme.colors.bg_color[2],
    name: 'INÍCIO',
    component: Inicio,
    icon: 'home',
  },
  // {
  //   focus: theme.colors.focus[1],
  //   color: theme.colors.bg_color[2],
  //   name: 'POSTS',
  //   component: TabBarApp,
  //   icon: 'camera-retro',
  // },
  {
    focus: theme.colors.focus[1],
    color: theme.colors.bg_color[2],
    name: 'PERFIL',
    component: Profile,
    icon: 'user-circle-o',
  },
  {
    focus: theme.colors.focus[1],
    color: theme.colors.bg_color[2],
    name: 'LOCALIZE OS MEMBROS',
    component: FindUser,
    icon: 'map-marker',
  },
  {
    focus: theme.colors.focus[1],
    color: theme.colors.bg_color[2],
    name: 'EXTRATO',
    component: Consumo,
    icon: 'line-chart',
  },
  // {
  //   focus: theme.colors.focus[1],
  //   color: theme.colors.bg_color[2],
  //   name: 'VALIDE SUA PRESENÇA',
  //   component: Valide,
  //   icon: 'hand-peace-o',
  // },
  {
    focus: theme.colors.focus[1],
    color: theme.colors.bg_color[2],
    name: 'LANÇAMENTOS',
    component: StacKMembros,
    icon: 'handshake-o',
  },


  // {
  //   focus: theme.colors.focus[1],
  //   color: theme.colors.bg_color[2],
  //   name: 'CONVIDADOS',
  //   component: Visitante,
  //   icon: 'user-plus',
  // },

  // {
  //   focus: theme.colors.focus[1],
  //   color: theme.colors.bg_color[2],
  //   name: 'DONATIVOS',
  //   component: Donates,
  //   icon: 'diamond',
  // },

  // {
  //   focus: theme.colors.focus[1],
  //   color: theme.colors.bg_color[2],
  //   name: 'APADRINHAR',
  //   component: Padrinho,
  //   icon: 'mortar-board',
  // },

  {
    focus: colors.focus[1],
    color: colors.bg_color[0],
    name: 'EVENTOS',
    component: Eventos,
    icon: 'life-buoy',
  },
  {
    focus: theme.colors.focus[1],
    color: theme.colors.bg_color[2],
    name: 'SOLICITAÇÕES',
    component: Solicitaions,
    icon: 'envelope',
  },
];

export const rotasAdm = [
  {
    color: theme.colors.bg_color[2],
    name: 'RANKING',
    component: Ranking,
    icon: '',
  },
  {
    color: theme.colors.bg_color[2],
    name: 'CADASTRAR MEMBRO',
    component: SingUp,
    icon: '',
  },
  {
    color: colors.alert[0],
    name: 'VALIDAR EVENTOS',
    component: ValidateEventos,
    icon: 'life-buoy',
  },

  // {
  //   color: theme.colors.bg_color[2],
  //   name: 'ALTERAR SENHA DE UM MEMBRO',
  //   component: UpdateSenhaUser,
  //   icon: '',
  // },
  {
    color: theme.colors.bg_color[2],
    name: 'EXCLUIR MEMBROS',
    component: DeletUser,
    icon: '',
  },

  {
    color: theme.colors.bg_color[2],
    name: 'Carregar Avatar',
    component: UploadAvatar,
    icon: '',
  },
  // {
  //   color: theme.colors.bg_color[2],
  //   name: 'INATIVAR UM MEMBRO',
  //   component: Inativo,
  //   icon: '',
  // },
];
