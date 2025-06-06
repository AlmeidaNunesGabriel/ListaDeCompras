import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useShoppingList } from '../hooks/useShoppingList';
import { ShoppingItemCard } from '../components/ShoppingItemCard';
import { AddItemModal } from '../components/AddItemModal';
import { EmptyState } from '../components/EmptyState';
import styles from './styles';
export const ShoppingListScreen = () => {
  const {
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
  } = useShoppingList();

  const [modalVisible, setModalVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleAddItem = async (name, quantity) => {
    await createItem({ name, quantity });
  };

  const handleEditItem = async (name, quantity) => {
    if (editItem) {
      await updateItem({
        id: editItem.id,
        name,
        quantity
      });
      setEditItem(null);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setEditItem(null);
  };

  const handleClearAll = () => {
    if (items.length === 0) return;

    Alert.alert(
      'Limpar Lista',
      'Deseja remover todos os itens da lista?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Limpar', style: 'destructive', onPress: clearAll }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <ShoppingItemCard
      item={item}
      onToggle={toggleItem}
      onDelete={deleteItem}
      onEdit={handleEdit}
    />
  );

  const sortedItems = [...items].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Lista de Compras</Text>
          {totalCount > 0 && (
            <Text style={styles.subtitle}>
              {completedCount} de {totalCount} completos
            </Text>
          )}
        </View>
        
        {totalCount > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearAll}
          >
            <Ionicons name="trash-outline" size={24} color="#F44336" />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.content}>
        {sortedItems.length === 0 ? (
          <EmptyState />
        ) : (
          <FlatList
            data={sortedItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={refresh}
                colors={['#2196F3']}
              />
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      <AddItemModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onSave={editItem ? handleEditItem : handleAddItem}
        editItem={editItem}
      />
    </SafeAreaView>
  );
};