import { useMutation, useQueryClient } from "react-query";
import { showMessage } from "./messageError";
import Toast from "../components/toast/handler";
import { PostFetchs } from "./fetchs/posts";
import { GetFetchs } from "./fetchs/gets";
import { PutFetchs } from "./fetchs/put";
import { DelteFetchs } from "./fetchs/delte";
import { Querys } from "./querys";

export class Mutations {
  constructor(
    private get: GetFetchs,
    private post: PostFetchs,
    private put: PutFetchs,
    private del: DelteFetchs,
  ) {

  }

  private resetClient(key: string) {
    const client = useQueryClient()
    return client.invalidateQueries(key)
    // client.resetQueries(key)
  }

  public registerUser() {
    return useMutation(this.post.registerUser, {
      onSuccess: () => {

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
      onError: (error) => showMessage(error),
      onSuccess: () => {
        Toast.show({
          tipo: 'success',
          title: 'Sucesso!',
          description: 'Sessão iniciada com sucesso!',
        })
      }
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
      onError: (error) => showMessage(error)
    })
  }

  public registerRelation() {
    const client = useQueryClient()
    return useMutation(this.post.registerRelation, {
      onSuccess: () => {
        client.invalidateQueries('relationsMetricasUser')
        client.invalidateQueries('relationNotvalidBytype')
        Toast.show({
          tipo: 'success',
          title: 'Sucesso!',
          description: 'Relacionamento cadastrado com sucesso! \n Aguarde a validação',
        })
      },
      onError: (error) => showMessage(error)
    })
  }

  public aproveRelation() {
    const client = useQueryClient()
    return useMutation(this.put.validateRelationship, {
      onError: (error) => showMessage(error),
      onSuccess: () => {
        client.invalidateQueries('relationsMetricasUser')
        client.invalidateQueries('relationForAprovation')
        client.invalidateQueries('relationByReceptor')
        client.invalidateQueries('relationNotvalidBytype')
      }
    })
  }

  public updateProfile() {
    return useMutation(this.post.registerProfile, {
      onError: (error) => showMessage(error),
      onSuccess: () => {
        Toast.show({
          tipo: 'success',
          title: 'Sucesso!',
          description: 'Perfil atualizado com sucesso!',
        })
      }
    })
  }

  public updateUser() {
    return useMutation(this.put.updateUser, {
      onError: (error) => showMessage(error),
      onSuccess: () => {
        Toast.show({
          tipo: 'success',
          title: 'Sucesso!',
          description: 'Usuário atualizado com sucesso!',
        })
      }
    })
  }

  public delRelation() {
    const client = useQueryClient()
    return useMutation(this.del.deleteRelation, {
      onSuccess: () => {
        client.invalidateQueries('relationsMetricasUser')
        client.invalidateQueries('relationForAprovation')
        client.invalidateQueries('relationByReceptor')
        client.invalidateQueries('relationNotvalidBytype')
        Toast.show({
          tipo: 'success',
          title: 'Sucesso!',
          description: 'Relacionamento rejeitado!',
        })
      },
      onError: (error) => showMessage(error)
    })
  }

  public avaliation() {
    const client = useQueryClient()

    return useMutation(this.post.registerStar, {
      onError: (error) => showMessage(error),
      onSuccess: () => {
        client.invalidateQueries('userByHub')

      }
    })
  }

  public registerMidia() {
    const client = useQueryClient()
    return useMutation(this.post.registerMidia, {
      onError: (error) => showMessage(error),
      onSuccess: () => {
        client.invalidateQueries('userByHub')
        Toast.show({
          tipo: 'success',
          title: 'Sucesso!',
          description: 'Midia cadastrada com sucesso!',
        })
      }
    })
  }

}