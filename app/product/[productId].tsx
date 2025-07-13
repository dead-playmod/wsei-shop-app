import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useCart } from '@/hooks/useCart';
import { useProductFetch } from '@/hooks/useProductFetch';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { Button, Image, ScrollView, StyleSheet, View } from 'react-native';

export default function ProductScreen() {
  const params = useLocalSearchParams<{ productId: string }>();
  const navigation = useNavigation();

  const productId = useMemo(() => params.productId, [params.productId]);
  const { product } = useProductFetch(productId);

  const imgBackgroundColor = useThemeColor({}, 'backgroundMuted');
  const borderColor = useThemeColor({}, 'border');
  const tint = useThemeColor({}, 'tint');

  const { addToCart } = useCart();

  useEffect(() => {
    navigation.setOptions({
      title: product?.title,
    });
  }, [navigation, params]);

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <Image
          source={{ uri: product?.thumbnail }}
          style={[styles.image, { backgroundColor: imgBackgroundColor }]}
        />

        <ThemedText type="title">{product?.title}</ThemedText>

        <View style={[styles.buySection, { borderColor }]}>
          <ThemedText type="defaultSemiBold">{product?.price} 💵</ThemedText>

          <Button
            title="Add to Cart"
            color={tint}
            onPress={() => {
              product && addToCart(product);
            }}
          />
        </View>

        <View style={styles.sections}>
          <ThemedText type="defaultSemiBold">Description:</ThemedText>

          <ThemedText>{product?.description}</ThemedText>
        </View>

        <View style={styles.sections}>
          <ThemedText type="defaultSemiBold">Images:</ThemedText>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ borderRadius: 16 }}
          >
            <View style={{ flexDirection: 'row', gap: 16 }}>
              {product?.images.map((image) => (
                <Image
                  key={image}
                  source={{ uri: image }}
                  style={{
                    width: 200,
                    height: 200,
                    objectFit: 'contain',
                    backgroundColor: imgBackgroundColor,
                    borderRadius: 16,
                  }}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    gap: 16,
  },
  image: {
    marginInline: 'auto',
    width: '100%',
    maxWidth: 400,
    aspectRatio: 1,
    borderRadius: 16,
  },
  buySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingBlock: 16,
  },
  sections: {
    flex: 1,
    gap: 8,
    paddingInline: 8,
  },
});
