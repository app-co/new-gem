/* eslint-disable class-methods-use-this */
import AsyncStorage from '@react-native-async-storage/async-storage';

const keyToken = '@appnetworking:token';

export class TokenStorage {
  async setToken(token: string): Promise<void> {
    const stringToken = JSON.stringify(token);
    await AsyncStorage.setItem(keyToken, token);
  }

  async getToken() {
    const getStorageToken = await AsyncStorage.getItem(keyToken);

    const token = getStorageToken || null;

    return token;
  }

  async removeToken() {
    await AsyncStorage.removeItem(keyToken);
  }
}
