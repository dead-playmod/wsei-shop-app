import { StyleSheet, ScrollView } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { ProductCard } from '@/components/ProductCard';
import { useProductsFetch } from '@/hooks/useProductFetch';

export default function HomeScreen() {
  const { productResponse } = useProductsFetch();

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        {productResponse?.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
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
