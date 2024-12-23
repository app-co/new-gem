import { useMutation, useQueryClient } from "react-query";
import { showMessage } from "./messageError";
import Toast from "../components/toast/handler";
import { PostFetchs } from "./fetchs/posts";
import { GetFetchs } from "./fetchs/gets";
import { PutFetchs } from "./fetchs/put";
import { DelteFetchs } from "./fetchs/delte";

export class Mutations {
  constructor(
    private get: GetFetchs,
    private post: PostFetchs,
    private put: PutFetchs,
    private del: DelteFetchs,
  ) { }

  private resetClient(key: string) {
    const client = useQueryClient()
    client.invalidateQueries(key)
    client.resetQueries(key)
  }

  public registerUser() {
    return useMutation(this.post.registerUser, {
      onSuccess: (data) => {
        Toast.show({
          tipo: 'success',
          title: 'Sucesso!',
          description: 'Usuário cadastrado com sucesso!',
        })
      },
      onError: (error) => showMessage(error)
    })
  }

  public session() {
    return useMutation(this.post.session, {
      onError: (error) => showMessage(error)
    })
  }

  public getOnStorage() {
    return useMutation(this.get.getOnStorage)
  }

  public saveOnStorage() {
    return useMutation(this.post.saveOnStorage)
  }

  public deleteOnStorage() {
    return useMutation(this.del.deleteOnStorage)
  }

  public getUserById() {
    return useMutation(this.get.userById, {
      onSuccess: (data) => {
        Toast.show({
          tipo: 'success',
          title: 'Sucesso!',
          description: 'Usuário buscado com sucesso!',
        })
      },
      onError: (error) => showMessage(error)
    })
  }

  public registerRelation() {

    return useMutation(this.post.registerRelation, {
      onSuccess: (data) => {
        Toast.show({
          tipo: 'success',
          title: 'Sucesso!',
          description: 'Relacionamento cadastrado com sucesso! \n Aguarde a validação para computar seus pontos.',
        })
        this.resetClient('relationsMetricasUser')
      },
      onError: (error) => showMessage(error)
    })
  }

  public aproveRelation() {
    return useMutation(this.put.validateRelationship, {
      onError: (error) => showMessage(error),
      onSuccess: () => {
        this.resetClient('relationsMetricasUser')
        this.resetClient('relationForAprovation')
        this.resetClient('relationByReceptor')
      }
    })
  }

}