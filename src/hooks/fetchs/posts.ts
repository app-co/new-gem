import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../services/api";
import { IUser } from "../dto/interfaces";
import { TProfile, TSession, TUser } from "../dto/types";

export class PostFetchs {
  public async registerUser(obj: Omit<TUser, 'id'>) {
    const { data } = await api.post<IUser>('/user/register', obj)

    return data
  }

  public async session(obj: TSession) {
    const { data } = await api.post('/user/session', obj)

    return data as { token: string }
  }


  public async registerProfile(obj: TProfile) {
    const { data } = await api.post('/user/profile', obj)

    return data
  }

  public async delteUser(id: string) {
    const { data } = await api.post(`/user/${id}`)

    return data
  }

  public async saveOnStorage({ key, value }: { key: string, value: any }) {
    const dt = JSON.stringify(value)

    await AsyncStorage.setItem(key, dt)
  }

  public async registerRelation(obj: any) {
    const { data } = await api.post('/relationShip/register', obj)

    return data
  }

  public async registerStar(obj: { userId: string, star: number }) {
    const { data } = await api.post('/user/avaliation', obj)

    return data
  }

}