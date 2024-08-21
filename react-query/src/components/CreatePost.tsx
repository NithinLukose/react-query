import { useState } from "react";
import { PageParam, Post, Posts } from "../types";
import useCreatePost from "../hooks/useCreatePost";
import {
  InfiniteData,
  UseInfiniteQueryResult,
  useQueryClient,
} from "@tanstack/react-query";
import { POSTS } from "../constants";

const CreatePost = () => {
  const [post, setPost] = useState<Omit<Post, "id">>({ title: "", body: "" });
  const queryClient = useQueryClient();
  const resetFormFields = () => {
    setPost({ title: "", body: "" });

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
    queryClient.invalidateQueries({ queryKey: [POSTS] });
  };
  const mutation = useCreatePost(resetFormFields);
  return (
    <form
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formElements = form.elements as typeof form.elements & {
          title: HTMLInputElement;
          body: HTMLInputElement;
        };
        const title = formElements.title.value;
        const body = formElements.body.value;
        if (title && body) {
          mutation.mutate({
            title,
            body,
          });
        }
      }}
    >
      <input
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        id="title"
      />
      <textarea
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        id="body"
      />
      <input type="submit" value="submit" />
    </form>
  );
};

export default CreatePost;
