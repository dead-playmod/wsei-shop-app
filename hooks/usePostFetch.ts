import { PostResponse } from '@/types/post';
import { api } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export function usePostFetch(skip = 0, limit = 10) {
  const url = useMemo(
    () => `/posts?skip=${skip}&limit=${limit}`,
    [skip, limit]
  );
  const fetchPosts = async () => api<PostResponse>(url);

  const {
    data: postResponse,
    isLoading: loading,
    error,
  } = useQuery<PostResponse, Error>({
    queryKey: ['posts', url],
    queryFn: fetchPosts,
  });

  return {
    postResponse,
    loading,
    error,
  };
}
