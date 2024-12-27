import { TRelationships, TUser } from "./types";

export interface IUser extends TUser {
  profile: IProfile
  created_at: string | Date
  updated_at: string | Date
}

export interface IProfile {
  id: string
  whats: string
  logotipo: string
  avatar: string
  workName: string
  CNPJ: string
  CPF: string
  ramo: string
  enquadramento: string
  email: string
  avatarPath: string
  logoPath: string
  created_at: string | Date
  updated_at: string | Date
  userId: string
}

export interface IRelationship {
  id: number
  objeto: any,
  status: number
  userId: string
  avatar: string
  userReceptorId: string
  hub: number
  type: number
  valor: number
  created_at: string
  updated_at: string
  type_str: string
}

export interface IRelationsMetricas {
  position: IRelationPositons[]
  aprovaded: Aprovaded
  notAprovaded: NotAprovaded
  totalPontos: number
  currencyVenda: number
  globalCurrency: number
}

export interface IRelationPositons {
  pontos: number
  userId: string
  rank: number
  qnt: number
  type_str: string
}

export interface Aprovaded {
  COMPRA: IRelationship[]
  VENDA: undefined[]
  B2B: IRelationship[]
  INDICAÇÃO: IRelationship[]
  PRESENÇA: IRelationship[]
  DONATIVOS: IRelationship[]
  CONVITES: IRelationship[]
  PADRINHO: IRelationship[]
  CORRIDAS: IRelationship[]
}

export interface NotAprovaded {
  COMPRA: IRelationship[]
  VENDA: IRelationship[]
  B2B: IRelationship[]
  INDICAÇÃO: IRelationship[]
  PRESENÇA: IRelationship[]
  DONATIVOS: IRelationship[]
  CONVITES: IRelationship[]
  PADRINHO: IRelationship[]
  CORRIDAS: IRelationship[]
}

export interface IUsersByHub {
  totalPages: number
  currentPage: number
  totalRecords: number
  pageSize: number
  pageNumber: number
  totalRecordsPerPage: number
  records: IUser[],
}