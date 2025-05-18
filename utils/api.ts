import AsyncStorage from '@react-native-async-storage/async-storage';

export async function api<T>(url: string, options?: RequestInit): Promise<T> {
  const token = await AsyncStorage.getItem('user-token');

  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options?.headers,
      },
    });

    if (response.status === 401) {
      AsyncStorage.removeItem('user-token');
    }

    if (!response.ok) {
      throw new Error(`HTTP error! url: ${url} status: ${response.status}`);
    }

    return await (response.json() as Promise<T>);
  } catch (error) {
    console.error('API request error:', error);

    throw error;
  }
}
