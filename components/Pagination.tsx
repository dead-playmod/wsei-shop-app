import React, { useCallback } from 'react';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Button, Pressable, StyleSheet } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';

type PaginationProps = {
  total: number;
  limit: number;
  skip: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  total,
  limit,
  skip,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit) + 1;

  const handlePageChange = (page: number) => {
    onPageChange((page - 1) * limit);
  };

  const textColor = useThemeColor({}, 'text');
  const textMutedColor = useThemeColor({}, 'textMuted');
  const backgroundMutedColor = useThemeColor({}, 'backgroundMuted');
  const borderColor = useThemeColor({}, 'border');

  const pressableStyle =
    (disabled: boolean) =>
    ({ pressed }: { pressed: boolean }) => ({
      opacity: pressed ? 0.5 : 1,
      ...(disabled ? { opacity: 0.4 } : {}),
      padding: 8,
      backgroundColor: backgroundMutedColor,
      borderColor: borderColor,
      borderWidth: 1,
      borderRadius: '100%',
    });

  if (!totalPages) {
    return null;
  }

  return (
    <ThemedView style={styles.pagination}>
      <Pressable
        onPress={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={pressableStyle(currentPage === 1)}
      >
        <IconSymbol
          name="chevron.left"
          size={24}
          color={currentPage === 1 ? textMutedColor : textColor}
        />
      </Pressable>

      <ThemedText type="title">
        Page {currentPage} of {totalPages}
      </ThemedText>

      <Pressable
        onPress={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={pressableStyle(currentPage === totalPages)}
      >
        <IconSymbol
          name="chevron.right"
          size={24}
          color={currentPage === totalPages ? textMutedColor : textColor}
        />
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
});
