import Pagination from '@/components/Pagination';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { usePostFetch } from '@/hooks/usePostFetch';
import { useThemeColor } from '@/hooks/useThemeColor';
import type { Post } from '@/types/post';
import { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

function PostCard({ post }: { post: Post }) {
  const borderColor = useThemeColor({}, 'border');
  const textMutedColor = useThemeColor({}, 'textMuted');

  return (
    <ThemedView style={[styles.postCard, { borderColor }]}>
      <ThemedText type="title">{post.title}</ThemedText>

      <ThemedText>{post.body}</ThemedText>

      <View style={[styles.reactions, { borderColor }]}>
        <View style={styles.reactionsBox}>
          <IconSymbol name="eye.fill" size={16} color={textMutedColor} />

          <ThemedText style={{ color: textMutedColor }}>
            {post.views}
          </ThemedText>
        </View>

        <View style={styles.reactionsBox}>
          <IconSymbol
            name="hand.thumbsup.fill"
            size={16}
            color={textMutedColor}
          />

          <ThemedText style={{ color: textMutedColor }}>
            {post.reactions.likes}
          </ThemedText>
        </View>

        <View style={styles.reactionsBox}>
          <IconSymbol
            name="hand.thumbsdown.fill"
            size={16}
            color={textMutedColor}
          />

          <ThemedText style={{ color: textMutedColor }}>
            {post.reactions.dislikes}
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

export default function BlogScreen() {
  const [skip, setSkip] = useState(0);
  const { postResponse } = usePostFetch(skip);

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        {postResponse?.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        <Pagination
          total={postResponse?.total || 0}
          limit={postResponse?.limit || 0}
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
    gap: 32,
  },
  postCard: {
    padding: 24,
    borderRadius: 32,
    borderWidth: 1,
    gap: 16,
  },
  reactions: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    paddingInline: 8,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  reactionsBox: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
});
