import AsyncStorage from "@react-native-async-storage/async-storage"
import { api } from "../../services/api"
import { IRelationship, IRelationsMetricas, IUser, IUsersByHub } from "../dto/interfaces"
import { TRelationships, TUsersByHub } from "../dto/types"

export class GetFetchs {

  public async userById() {
    const { data } = await api.get<IUser>('/user')

    return data
  }

  public async getAllUsers() {
    const { data } = await api.get<IUser[]>('/users')

    return data
  }

  public async getOnStorage(key: string) {
    const dt = await AsyncStorage.getItem(key)

    return dt ? JSON.parse(dt) : null
  }

  public async relationGetAll() {
    const { data } = await api.get<IRelationship[]>('/relationShip/all')

    return data
  }

  public async relationByUser() {
    const { data } = await api.get<IRelationship[]>('/relationShip/byUser')

    return data
  }

  public async relationByReceptor() {
    const { data } = await api.get<IRelationship[]>('/relationShip/byReceptor')

    return data
  }

  public async relationForAprovation() {
    const { data } = await api.get<IRelationship[]>('/relationShip/aprovation')

    return data
  }

  public async relationMetricasUser() {
    const { data } = await api.get<IRelationsMetricas>('/relationShip/podiun')

    return data
  }

  public async userByHub(params: TUsersByHub) {
    const { data } = await api.get<IUsersByHub>('/user/hub', { params })

    return data
  }

  public async relationNotvalidBytype(type: number) {
    const { data } = await api.get<IRelationship[]>(`/relationShip/notValides/${type}`)

    return data
  }

}