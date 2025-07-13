import { StyleSheet, ScrollView } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { ProductCard } from '@/components/ProductCard';
import { useProductsFetch } from '@/hooks/useProductFetch';
import { useState } from 'react';
import Pagination from '@/components/Pagination';

export default function HomeScreen() {
  const [skip, setSkip] = useState(0);
  const { productResponse } = useProductsFetch(skip);

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        {productResponse?.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        <Pagination
          total={productResponse?.total || 0}
          limit={productResponse?.limit || 0}
          skip={skip}
          onPageChange={(page) => {
            setSkip(page);
          }}
        />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingInline: 16,
    paddingBlock: 64,
    gap: 16,
  },
});
