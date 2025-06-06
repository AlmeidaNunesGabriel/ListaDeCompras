import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageService {
  static STORAGE_KEY = '@shopping_list';

  static async getItems() {
    try {
      const jsonValue = await AsyncStorage.getItem(this.STORAGE_KEY);
      if (jsonValue) {
        const items = JSON.parse(jsonValue);
        return items.map((item) => ({
          ...item,
          createdAt: new Date(item.createdAt)
        }));
      }
      return [];
    } catch (error) {
      console.error('Error loading shopping items:', error);
      return [];
    }
  }

  static async saveItems(items) {
    try {
      const jsonValue = JSON.stringify(items);
      await AsyncStorage.setItem(this.STORAGE_KEY, jsonValue);
    } catch (error) {
      console.error('Error saving shopping items:', error);
      throw error;
    }
  }

  static async clearItems() {
    try {
      await AsyncStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing shopping items:', error);
      throw error;
    }
  }
}