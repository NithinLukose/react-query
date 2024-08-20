import { Fragment } from "react/jsx-runtime";
import usePosts from "../hooks/usePosts";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";

const Posts = ({ onSelectPost }: { onSelectPost: (id: number) => void }) => {
  const limit = 50;

  const { data, isLoading, error, fetchNextPage, hasNextPage } = usePosts(
    limit,
    0
  );

  const selectPost = (id: number) => {
    onSelectPost(id);
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (error) {
    return <div>something went wrong {error.message}</div>;
  }

  const allItems = data?.pages.flatMap((page) => page.posts) || [];
  return (
    <div>
      <InfiniteScroll
        dataLength={allItems.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<h4>Loading...</h4>}
      >
        {data?.pages?.map(({ posts }, i) => (
          <Fragment key={i}>
            {posts.map((post) => (
              <div
                key={post.id}
                style={{ cursor: "pointer" }}
                onClick={() => selectPost(post.id)}
              >
                <Post post={post} />
              </div>
            ))}
          </Fragment>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Posts;
