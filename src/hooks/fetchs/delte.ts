import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../services/api";

export class DelteFetchs {

  public async delteUser(id: string) {
    const { data } = await api.post(`/user/${id}`)

    return data
  }

  public async deleteOnStorage(key: string) {
    await AsyncStorage.removeItem(key)

    return true
  }
}