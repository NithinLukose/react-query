import { ErrorBoundary } from "react-error-boundary";
// import usePost from "../hooks/usePost";
import Post from "./Post";
import usePost from "../hooks/usePost";

const PostDetails = ({ id }: { id: number }) => {
  const { data: post, isLoading, error, isPaused, isFetching } = usePost(id);
  if (isLoading || isPaused || isFetching) {
    return <div>Loading ...</div>;
  }
  if (error) {
    return <div>something went wrong {error.message}</div>;
  }
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Post post={post} />
    </ErrorBoundary>
  );
};

export default PostDetails;
