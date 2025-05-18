import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';

import { Colors } from '@/constants/Colors';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Product } from '@/types/product';
import { useRouter } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';

type Props = ViewProps & {
  product: Product;
};

export function ProductCard({ product, style, ...rest }: Props) {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'backgroundMuted');

  const onNavigate = () => {
    router.push({
      pathname: '/product/[productId]',
      params: { productId: product.id.toString() },
    });
  };

  return (
    <TouchableOpacity onPress={onNavigate}>
      <ThemedView
        style={[styles.container, { backgroundColor }, style]}
        {...rest}
      >
        <Image source={{ uri: product.thumbnail }} style={styles.image} />

        <View style={styles.info}>
          <ThemedText>{product.title}</ThemedText>

          <ThemedText style={styles.price}>{product.price} 💵</ThemedText>
        </View>
      </ThemedView>
    </TouchableOpacity>
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
