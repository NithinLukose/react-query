import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { POSTS } from "../constants";

const fetchPost = async ({
  queryKey,
}: QueryFunctionContext<[string, number]>) => {
  const [_key, id] = queryKey;
  try {
    const response = await fetch(`https://jsonplaceholder.org/posts/${id}`);

    // Check if the response is not OK (status code not in the 200-299 range)
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    // Parse the response as JSON
    const data = await response.json();
    return data;
  } catch (error) {
    // Catch network errors or other unexpected errors
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
  }
};

const usePost = (id: number) => {
  const result = useQuery({
    queryKey: [POSTS, id],
    queryFn: fetchPost,
    enabled: !!id, // Fetch only when postId is truthy
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
    retry: 1,
  });
  return result;
};

export default usePost;
