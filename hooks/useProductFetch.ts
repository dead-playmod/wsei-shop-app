import { Product, ProductResponse } from '@/types/product';
import { api } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

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

export function useProductsFetch() {
  const fetchProducts = async () => api<ProductResponse>('/products');

  const {
    data: productResponse,
    isLoading: loading,
    error,
  } = useQuery<ProductResponse, Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  return {
    productResponse,
    loading,
    error,
  };
}
