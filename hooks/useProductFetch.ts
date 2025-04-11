import { ProductResponse } from '@/types/product';
import { api } from '@/utils/api';
import { useEffect, useState } from 'react';

export function useProductFetch() {
  const [productResponse, setProductResponse] = useState<ProductResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const load = async () => {
    try {
      setLoading(true);
      const response = await api<ProductResponse>('/products');
      setProductResponse(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return {
    productResponse,
    loading,
    error,
    load,
  };
}
