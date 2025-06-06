import { useState, useEffect, useCallback } from 'react';
import { ShoppingService } from '../services/ShoppingService';

export const useShoppingList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const loadedItems = await ShoppingService.getAllItems();
      setItems(loadedItems);
    } catch (err) {
      setError('Erro ao carregar lista de compras');
      console.error('Error loading items:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createItem = useCallback(async (dto) => {
    try {
      setError(null);
      const newItem = await ShoppingService.createItem(dto);
      setItems(prev => [...prev, newItem]);
    } catch (err) {
      setError('Erro ao adicionar item');
      throw err;
    }
  }, []);

  const updateItem = useCallback(async (dto) => {
    try {
      setError(null);
      const updatedItem = await ShoppingService.updateItem(dto);
      if (updatedItem) {
        setItems(prev => prev.map(item => 
          item.id === dto.id ? updatedItem : item
        ));
      }
    } catch (err) {
      setError('Erro ao atualizar item');
      throw err;
    }
  }, []);

  const deleteItem = useCallback(async (id) => {
    try {
      setError(null);
      const success = await ShoppingService.deleteItem(id);
      if (success) {
        setItems(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      setError('Erro ao excluir item');
      throw err;
    }
  }, []);

  const toggleItem = useCallback(async (id) => {
    try {
      setError(null);
      const updatedItem = await ShoppingService.toggleItemCompletion(id);
      if (updatedItem) {
        setItems(prev => prev.map(item => 
          item.id === id ? updatedItem : item
        ));
      }
    } catch (err) {
      setError('Erro ao marcar item');
      throw err;
    }
  }, []);

  const clearAll = useCallback(async () => {
    try {
      setError(null);
      await ShoppingService.clearAllItems();
      setItems([]);
    } catch (err) {
      setError('Erro ao limpar lista');
      throw err;
    }
  }, []);

  const refresh = useCallback(async () => {
    await loadItems();
  }, [loadItems]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;

  return {
    items,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
    toggleItem,
    clearAll,
    refresh,
    completedCount,
    totalCount
  };
};
