import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const EmptyState = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="basket-outline" size={64} color="#ccc" />
      <Text style={styles.title}>Lista vazia</Text>
      <Text style={styles.subtitle}>
        Adicione itens à sua lista de compras{'\n'}tocando no botão +
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#999',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 22,
  },
});