export type Post = {
  id: number;
  title: string;
  body: string;
};

export type Posts = {
  posts: Post[];
  pageParam: {
    skip: number;
    limit: number;
  };
};

export type PageParam = {
  skip: number;
  limit: number;
};
