import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getItem(item) {
  const value = await AsyncStorage.getItem(item);
  return value ? JSON.parse(value) : null;
}

export async function storeItem(item, value) {
  return AsyncStorage.setItem(item, JSON.stringify(value));
}

export async function removeItem(item) {
  return AsyncStorage.removeItem(item)
}
