import { api } from '@/utils/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, UserToken } from '@/types/user';

const USER_TOKEN_KEY = 'USER_TOKEN_KEY';

export function useUser() {
  const {
    data: user,
    isLoading,
    refetch: load,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const token = await AsyncStorage.getItem('USER_TOKEN_KEY');

      if (!token) {
        return null;
      }

      return await api<User>('/auth/me');
    },
    enabled: false,
  });

  const { mutateAsync: login, isPending } = useMutation({
    mutationKey: ['auth'],
    mutationFn: async (data: { username: string; password: string }) => {
      const user = await api<UserToken>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (user) {
        await AsyncStorage.setItem('USER_TOKEN_KEY', user.accessToken);
        await load();
      } else {
        throw new Error('Invalid username or password');
      }

      return user;
    },
  });

  const logout = async () => {
    await AsyncStorage.removeItem('USER_TOKEN_KEY');
    await load();
  };

  return {
    user,
    isLoading,
    isPending,
    load,
    login,
    logout,
  };
}
