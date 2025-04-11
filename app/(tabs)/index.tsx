import { Image, StyleSheet, Platform, ScrollView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ProductCard } from '@/components/ProductCard';
import { useProductFetch } from '@/hooks/useProductFetch';
import { useEffect } from 'react';

export default function HomeScreen() {
  const { productResponse } = useProductFetch();

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
