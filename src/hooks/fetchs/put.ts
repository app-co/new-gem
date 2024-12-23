import { api } from "../../services/api";
import { TProfile, TUser } from "../dto/types";

export class PutFetchs {

  public async updateUser(obj: TUser) {
    const { data } = await api.put('/user', obj)

    return data
  }

  public async updatProfile(obj: TProfile) {
    const { data } = await api.put('/user/profile', obj)

    return data
  }

  public async validateRelationship(id: number) {
    const { data } = await api.put(`/relationShip/${id}`)

    return data
  }

}