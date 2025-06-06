import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const ShoppingItemCard = ({
  item,
  onToggle,
  onDelete,
  onEdit
}) => {
  const handleDelete = () => {
    Alert.alert(
      'Excluir Item',
      `Deseja excluir "${item.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => onDelete(item.id) }
      ]
    );
  };

  return (
    <View style={[styles.container, item.completed && styles.completedContainer]}>
      <TouchableOpacity
        style={styles.checkButton}
        onPress={() => onToggle(item.id)}
      >
        <Ionicons
          name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={item.completed ? '#4CAF50' : '#999'}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.name, item.completed && styles.completedText]}>
          {item.name}
        </Text>
        <Text style={styles.quantity}>
          Quantidade: {item.quantity}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onEdit(item)}
        >
          <Ionicons name="pencil" size={20} color="#2196F3" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleDelete}
        >
          <Ionicons name="trash" size={20} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  completedContainer: {
    opacity: 0.7,
    backgroundColor: '#f5f5f5',
  },
  checkButton: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  quantity: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
});