import { z } from "zod";
import { validation, validationB2b, validationConsumo, validationIndication } from "./validations";


export type TUser = z.infer<typeof validation.user>
export type TProfile = z.infer<typeof validation.profile>
export type TMidia = z.infer<typeof validation.midia>
export type TRelationships = z.infer<typeof validation.relationships>
export type TIndication = z.infer<typeof validation.indication>
export type TDonate = z.infer<typeof validation.donate>
export type TInvit = z.infer<typeof validation.invit>
export type TSession = z.infer<typeof validation.session>
export type TUsersByHub = z.infer<typeof validation.usersByHub>
export type TRelationB2b = z.infer<typeof validationB2b>
export type TRelationConsumo = z.infer<typeof validationConsumo>
export type TRelationIndication = z.infer<typeof validationIndication>