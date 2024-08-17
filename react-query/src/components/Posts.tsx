import usePosts from "../hooks/usePosts";
import Post from "./Post";

const Posts = ({ onSelectPost }: { onSelectPost: (id: number) => void }) => {
  const { data: posts, isLoading, error } = usePosts();

  const selectPost = (id: number) => {
    onSelectPost(id);
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (error) {
    return <div>something went wrong {error.message}</div>;
  }
  return (
    <div>
      {posts?.map((post) => (
        <div
          key={post.id}
          style={{ cursor: "pointer" }}
          onClick={() => selectPost(post.id)}
        >
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
