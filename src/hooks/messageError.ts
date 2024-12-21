import { ZodError } from "zod";
import Toast from "../components/toast/handler";
import { AppError } from "../utils/AppError";

export function showMessage(error: any) {
  if (error instanceof AppError) {
    return Toast.show({
      title: 'Ops!',
      description: error.message,
      tipo: 'alert',
    })
  }

  if (error instanceof ZodError) {
    return Toast.show({
      title: 'Ops!',
      description: error.message,
      tipo: 'alert',
    })
  }

  return Toast.show({
    title: 'Error!',
    description: 'Ocorreu um erro inesperado, tente novamente mais tarde.',
    tipo: 'error',
  })
}