import AsyncStorage from "@react-native-async-storage/async-storage"
import { api } from "../../services/api"
import { IRelationsMetricas, IUser } from "../dto/interfaces"
import { IRelashionship } from "../../dtos"
import { TRelationships } from "../dto/types"

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
    const { data } = await api.get<IRelashionship[]>('/relationShip/all')

    return data
  }

  public async relationByUser() {
    const { data } = await api.get<IRelashionship[]>('/relationShip/byUser')

    return data
  }

  public async relationByReceptor() {
    const { data } = await api.get<IRelashionship[]>('/relationShip/byReceptor')

    return data
  }

  public async relationMetricasUser() {
    const { data } = await api.get<IRelationsMetricas>('/relationShip//podiun')

    return data
  }

}