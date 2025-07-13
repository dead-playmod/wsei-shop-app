import { Product, ProductResponse } from '@/types/product';
import { api } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export function useProductFetch(productId: string) {
  const fetchProduct = async () => api<Product>(`/products/${productId}`);

  const {
    data: product,
    isLoading: loading,
    error,
  } = useQuery<Product, Error>({
    queryKey: ['product', productId],
    queryFn: fetchProduct,
  });

  return {
    product,
    loading,
    error,
  };
}

export function useProductsFetch(skip = 0, limit = 10) {
  const ulr = useMemo(
    () => `/products?skip=${skip}&limit=${limit}`,
    [skip, limit]
  );
  const fetchProducts = async () => api<ProductResponse>(ulr);

  const {
    data: productResponse,
    isLoading: loading,
    error,
  } = useQuery<ProductResponse, Error>({
    queryKey: ['products', ulr],
    queryFn: fetchProducts,
  });

  return {
    productResponse,
    loading,
    error,
  };
}
