import { Image, StyleSheet, View, ViewProps } from 'react-native';

import { Colors } from '@/constants/Colors';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Product } from '@/types/product';

type Props = ViewProps & {
  product: Product;
};

export function ProductCard({ product, style, ...rest }: Props) {
  return (
    <ThemedView style={[styles.container, style]} {...rest}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />

      <View style={styles.info}>
        <ThemedText>{product.title}</ThemedText>

        <ThemedText style={styles.price}>{product.price} 💵</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    paddingBlock: 16,
    paddingInline: 20,
    borderRadius: 16,
    backgroundColor: Colors.dark.backgroundMuted,
  },
  info: {
    flex: 1,
  },
  price: {
    color: Colors.dark.textMuted,
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: 'black',
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.dark.border,
  },
});
