export type PostResponse = {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
};

export type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reactions;
  views: number;
  userId: number;
};

export type Reactions = {
  likes: number;
  dislikes: number;
};
