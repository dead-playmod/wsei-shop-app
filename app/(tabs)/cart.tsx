import { type CartItem } from '@/atoms/cartAtom';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import { useCart } from '@/hooks/useCart';
import { useThemeColor } from '@/hooks/useThemeColor';
import { act, useMemo } from 'react';
import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

function CartItemAction(props: { icon: IconSymbolName; action: () => void }) {
  const { icon, action } = props;
  const borderColor = useThemeColor({}, 'border');
  const textMutedColor = useThemeColor({}, 'textMuted');

  return (
    <Pressable
      android_ripple={{ color: borderColor, radius: 24 }}
      onPress={action}
    >
      <View
        style={{
          padding: 8,
          paddingTop: 10,
          width: 48,
          height: 48,
          borderRadius: '100%',
          borderWidth: 1,
          borderColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconSymbol
          name={icon}
          size={24}
          color={textMutedColor}
          style={{ marginBottom: 4 }}
        />
      </View>
    </Pressable>
  );
}

function CartItem(props: CartItem) {
  const { product, quantity } = props;

  const backgroundColor = useThemeColor({}, 'backgroundMuted');
  const borderColor = useThemeColor({}, 'border');
  const textMutedColor = useThemeColor({}, 'textMuted');

  const { removeFromCart, addToCart } = useCart();
  const price = useMemo(
    () => (product.price * quantity).toFixed(2),
    [product, quantity]
  );

  const actions = [
    {
      key: 'remove',
      icon: 'trash.fill',
      action: () => removeFromCart(product.id),
    },
    {
      key: 'minus',
      icon: 'minus',
      action: () => addToCart(product, -1),
    },
    {
      key: 'add',
      icon: 'plus',
      action: () => addToCart(product, 1),
    },
  ] as const;

  return (
    <ThemedView style={[styles.item, { backgroundColor }]}>
      <View style={{ flex: 1, flexDirection: 'row', gap: 16 }}>
        <Image
          source={{ uri: product.thumbnail }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 8,
            borderWidth: 1,
            borderColor,
          }}
        />

        <View style={{ flexShrink: 1 }}>
          <ThemedText type="defaultSemiBold">{product.title}</ThemedText>

          <ThemedText>count: {quantity}</ThemedText>
          <ThemedText>price: {price} 💵</ThemedText>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          gap: 16,
          justifyContent: 'space-around',
        }}
      >
        {actions.map((action) => (
          <CartItemAction
            key={`${action.key}-${product.id}`}
            icon={action.icon}
            action={action.action}
          />
        ))}
      </View>
    </ThemedView>
  );
}

export default function CartScreen() {
  const { cart } = useCart();

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Cart</ThemedText>

        <View style={{ gap: 16, paddingInline: 8 }}>
          {cart.map((item) => (
            <CartItem key={item.product.id} {...item} />
          ))}
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingInline: 16,
    paddingBlock: 64,
    gap: 32,
  },
  item: {
    gap: 16,
    alignItems: 'center',
    paddingBlock: 16,
    paddingInline: 20,
    borderRadius: 16,
  },
});
