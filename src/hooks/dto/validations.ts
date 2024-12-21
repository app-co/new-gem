import { z } from "zod";

export const validation = {
  user: z.object({
    id: z.string(),
    nome: z.string(),
    apelido: z.string(),
    token: z.string().optional(),
    senha: z.string(),
    adm: z.boolean().default(false),
    apadrinhado: z.boolean(),
    hub: z.array(z.number().default(0)),
  }),
  profile: z.object({
    id: z.string(),
    whats: z.string(),
    logotipo: z.string(),
    avatar: z.string(),
    workName: z.string(),
    CNPJ: z.string(),
    CPF: z.string(),
    ramo: z.string(),
    enquadramento: z.string(),
    email: z.string(),
    avatarPath: z.string(),
    logoPath: z.string(),
    userId: z.string()
  }),
  midia: z.object({
    id: z.number(),
    nome: z.string(),
    link: z.string(),
    type_midia: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    user_id: z.string(),
  }),
  relationships: z.object({
    id: z.number(),
    status: z.number().default(0),
    userId: z.string(),
    avatar: z.string(),
    userReceptorId: z.string().optional(),
    hub: z.number().default(0),
    type: z.number(),
    valor: z.number().default(0),
    objeto: z.any({}).optional()
  }),
  indication: z.object({
    indicado_por: z.string(),
    nomeCliente: z.string(),
    contatoCliente: z.string(),
  }),
  donate: z.array(z.object({
    item: z.string(),
    ponto: z.number(),
  })),
  invit: z.object({
    nomeConvidado: z.string(),
  }),
  session: z.object({
    apelido: z.string(),
    senha: z.string(),
  })
}
