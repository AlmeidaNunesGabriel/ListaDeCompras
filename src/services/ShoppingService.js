import { StorageService } from './StorageService';

export class ShoppingService {
  static generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  static async getAllItems() {
    return await StorageService.getItems();
  }

  static async createItem(dto) {
    const items = await StorageService.getItems();
    
    const newItem = {
      id: this.generateId(),
      name: dto.name.trim(),
      quantity: Math.max(1, dto.quantity),
      completed: false,
      createdAt: new Date()
    };

    const updatedItems = [...items, newItem];
    await StorageService.saveItems(updatedItems);
    
    return newItem;
  }

  static async updateItem(dto) {
    const items = await StorageService.getItems();
    const itemIndex = items.findIndex(item => item.id === dto.id);
    
    if (itemIndex === -1) {
      return null;
    }

    const updatedItem = {
      ...items[itemIndex],
      ...(dto.name !== undefined && { name: dto.name.trim() }),
      ...(dto.quantity !== undefined && { quantity: Math.max(1, dto.quantity) }),
      ...(dto.completed !== undefined && { completed: dto.completed })
    };

    items[itemIndex] = updatedItem;
    await StorageService.saveItems(items);
    
    return updatedItem;
  }

  static async deleteItem(id) {
    const items = await StorageService.getItems();
    const filteredItems = items.filter(item => item.id !== id);
    
    if (filteredItems.length === items.length) {
      return false;
    }

    await StorageService.saveItems(filteredItems);
    return true;
  }

  static async clearAllItems() {
    await StorageService.clearItems();
  }

  static async toggleItemCompletion(id) {
    const items = await StorageService.getItems();
    const item = items.find(item => item.id === id);
    
    if (!item) {
      return null;
    }

    return await this.updateItem({
      id,
      completed: !item.completed
    });
  }
}