import { useMutation } from "@tanstack/react-query";
import { Post } from "../types";

const createNewPost = async (newPost: Omit<Post, "id">) => {
  console.log(newPost);
  const response = await fetch("https://dummyjson.com/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...newPost,
      userId: 5,
    }),
  });
  return await response.json();
};

const useCreatePost = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: createNewPost,
    onSuccess,
  });
};

export default useCreatePost;
