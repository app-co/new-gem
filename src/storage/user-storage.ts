/* eslint-disable class-methods-use-this */
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IUserDtos } from '../dtos';

const key = '@appnetworking:user';

export class UserStorage {
  async setToken(user: IUserDtos): Promise<void> {
    const data = JSON.stringify(user);
    await AsyncStorage.setItem(key, data);
  }

  async getToken() {
    const getStorageToken = await AsyncStorage.getItem(key);

    const token = getStorageToken || null;

    return token;
  }

  async removeToken() {
    await AsyncStorage.removeItem(key);
  }
}
