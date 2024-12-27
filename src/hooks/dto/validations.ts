import { z } from "zod";
import { _number } from "../../utils/mask";

export const validation = {
  user: z.object({
    id: z.string({ message: '* campo obrigatório' }),
    nome: z.string({ message: '* campo obrigatório' }).transform(h => h.trim()),
    apelido: z.string({ message: '* campo obrigatório' }).transform(h => h.trim()),
    token: z.string({ message: '* campo obrigatório' }).optional(),
    senha: z.string().optional().nullable().transform(h => h ? h.trim() : ''),
    adm: z.boolean().default(false),
    apadrinhado: z.boolean(),
    hub: z.array(z.number().default(0)),
  }),
  profile: z.object({
    id: z.string({ message: '* campo obrigatório' }).optional(),
    logotipo: z.string({ message: '* campo obrigatório' }).optional(),
    whats: z.string({ message: '* campo obrigatório' }),
    avatar: z.string({ message: '* campo obrigatório' }).optional(),
    workName: z.string({ message: '* campo obrigatório' }),
    CNPJ: z.string().optional().nullable(),
    CPF: z.string().optional().nullable(),
    ramo: z.string().optional().nullable(),
    enquadramento: z.string().optional().nullable(),
    email: z.string({ message: '* campo obrigatório' }).email('E-mail invaálido'),
    userId: z.string({ message: '* campo obrigatório' })
  }),
  midia: z.object({
    id: z.number(),
    nome: z.string({ message: '* campo obrigatório' }),
    link: z.string({ message: '* campo obrigatório' }),
    type_midia: z.string({ message: '* campo obrigatório' }),
    created_at: z.string({ message: '* campo obrigatório' }),
    updated_at: z.string({ message: '* campo obrigatório' }),
    user_id: z.string({ message: '* campo obrigatório' }),
  }),
  relationships: z.object({
    id: z.number(),
    status: z.number().default(0),
    userId: z.string({ message: '* campo obrigatório' }),
    avatar: z.string().nullable(),
    userReceptorId: z.string({ message: '* campo obrigatório' }).optional(),
    hub: z.number().default(0),
    type: z.number(),
    valor: z.string().transform(h => {
      const vl = _number(h)
      const valor = vl && vl.length >= 3 ? Number(vl) / 100 : Number(vl)
      return valor
    }).optional(),
    objeto: z.any({}).optional()
  }),
  indication: z.object({
    indicado_por: z.string({ message: '* campo obrigatório' }),
    nomeCliente: z.string({ message: '* campo obrigatório' }),
    contatoCliente: z.string({ message: '* campo obrigatório' }),
    descricao: z.string({ message: '* campo obrigatório' }),
  }),
  b2b: z.object({
    descricao: z.string({ message: '* campo obrigatório' }),
    nome: z.string({ message: '* campo obrigatório' }),
  }),
  donate: z.array(z.object({
    item: z.string({ message: '* campo obrigatório' }),
    ponto: z.number(),
  })),
  consumo: z.object({
    descricao: z.string({ message: '* campo obrigatório' }),
    nome: z.string({ message: '* campo obrigatório' }),
  }),
  invit: z.object({
    nomeConvidado: z.string({ message: '* campo obrigatório' }),
    nome: z.string({ message: '* campo obrigatório' }),
  }),
  session: z.object({
    apelido: z.string({ message: '* campo obrigatório' }),
    senha: z.string({ message: '* campo obrigatório' }),
  }),
  usersByHub: z.object({
    hub: z.string({ message: '* campo obrigatório' }),
    pageSize: z.number(),
    pageNumber: z.number(),
    nome: z.string({ message: '* campo obrigatório' }),
  })
}

export const validationB2b = validation.b2b.merge(validation.relationships)
export const validationConsumo = validation.consumo.merge(validation.relationships)
export const validationIndication = validation.indication.merge(validation.relationships)
