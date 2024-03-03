import theme from '../global/styles/club-mentoria';
import { Ranking } from '../pages/ADM/Classificacao';
import { SingUp } from '../pages/ADM/CreateUser';
import { DeletUser } from '../pages/ADM/DeleteUser';
import { UploadAvatar } from '../pages/ADM/UploadAvatar';
import { ValidateDanates } from '../pages/ADM/ValidateDanates';
import { ValidateGuest } from '../pages/ADM/ValidateGuest';
import { ListPresenca } from '../pages/ADM/ValidatePresenca';
import { Consumo } from '../pages/Consumo';
import { Donates } from '../pages/Donates';
import { FindUser } from '../pages/FindMembro';
import { Inicio } from '../pages/Inicio';
import { Padrinho } from '../pages/Padrinho';
import { Profile } from '../pages/Profile';
import { Solicitaions } from '../pages/Solicitaions';
import { Valide } from '../pages/ValidePresenca';
import { Visitante } from '../pages/Visitante';
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
  {
    focus: theme.colors.focus[1],
    color: theme.colors.bg_color[2],
    name: 'POSTS',
    component: TabBarApp,
    icon: 'camera-retro',
  },
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
  {
    focus: theme.colors.focus[1],
    color: theme.colors.bg_color[2],
    name: 'VALIDE SUA PRESENÇA',
    component: Valide,
    icon: 'hand-peace-o',
  },
  {
    focus: theme.colors.focus[1],
    color: theme.colors.bg_color[2],
    name: 'LANÇAMENTOS',
    component: StacKMembros,
    icon: 'handshake-o',
  },


  {
    focus: theme.colors.focus[1],
    color: theme.colors.bg_color[2],
    name: 'CONVIDADOS',
    component: Visitante,
    icon: 'user-plus',
  },

  {
    focus: theme.colors.focus[1],
    color: theme.colors.bg_color[2],
    name: 'DONATIVOS',
    component: Donates,
    icon: 'diamond',
  },

  {
    focus: theme.colors.focus[1],
    color: theme.colors.bg_color[2],
    name: 'APADRINHAR',
    component: Padrinho,
    icon: 'mortar-board',
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
    color: theme.colors.bg_color[2],
    name: 'VALIDAR PRESENÇA',
    component: ListPresenca,
    icon: '',
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
  // {
  //   color: theme.colors.bg_color[2],
  //   name: 'LISTA DE PRESENÇA',
  //   component: ListaPresença,
  //   icon: '',
  // },

  {
    color: theme.colors.bg_color[2],
    name: 'VALIDAR CONVIDADOS',
    component: ValidateGuest,
    icon: '',
  },
  {
    color: theme.colors.bg_color[2],
    name: 'VALIDAR DONATIVOS',
    component: ValidateDanates,
    icon: '',
  },
];
