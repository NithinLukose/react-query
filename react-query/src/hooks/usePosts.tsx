import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQueryClient,
} from "@tanstack/react-query";
import { POSTS } from "../constants";
import { PageParam, Posts } from "../types";
import { useEffect } from "react";

const fetchPosts = async ({
  pageParam,
}: {
  pageParam: PageParam;
}): Promise<Posts> => {
  try {
    const response = await fetch(
      `https://dummyjson.com/posts?limit=${pageParam.limit}&skip=${pageParam.skip}`
    );

    // Check if the response is not OK (status code not in the 200-299 range)
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    // Parse the response as JSON
    const data = await response.json();
    return {
      ...data,
      pageParam: {
        skip: pageParam.skip,
        limit: pageParam.limit,
      },
    };
  } catch (error) {
    // Catch network errors or other unexpected errors
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
  }
};

const usePosts = (limit: number, skip: number) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.setQueryData(
      [POSTS],
      (existingData: {
        pageParams: PageParam[];
        pages: UseInfiniteQueryResult<InfiniteData<Posts, unknown>, Error>[];
      }) =>
        existingData
          ? {
              pageParams: [existingData.pageParams[0]],
              pages: [existingData.pages[0]],
            }
          : undefined
    );
  }, []);
  const result = useInfiniteQuery({
    queryKey: [POSTS],
    queryFn: fetchPosts,
    initialPageParam: {
      limit,
      skip,
    },
    getNextPageParam: (lastPage) => {
      return {
        skip: lastPage.pageParam.skip + lastPage.pageParam.limit,
        limit: lastPage.pageParam.limit,
      };
    },
    // staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
    // retry: 1,
  });
  return result;
};
export default usePosts;
