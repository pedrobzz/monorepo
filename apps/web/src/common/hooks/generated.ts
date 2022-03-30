/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from "react-query";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      ...{
        headers: { credentials: "include", "content-type": "application/json" },
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: "Mutation";
  createPost: Post;
  deletePost: Scalars["Boolean"];
  updatePost: Post;
};

export type MutationCreatePostArgs = {
  content?: InputMaybe<Scalars["String"]>;
  title: Scalars["String"];
};

export type MutationDeletePostArgs = {
  id: Scalars["Float"];
};

export type MutationUpdatePostArgs = {
  content?: InputMaybe<Scalars["String"]>;
  id: Scalars["Float"];
  title?: InputMaybe<Scalars["String"]>;
};

export type Post = {
  __typename?: "Post";
  content?: Maybe<Scalars["String"]>;
  createdAt: Scalars["String"];
  id: Scalars["Float"];
  title: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  getPost?: Maybe<Post>;
  getPosts: Array<Post>;
};

export type QueryGetPostArgs = {
  id: Scalars["Float"];
};

export type CreatePostMutationVariables = Exact<{
  title: Scalars["String"];
  content?: InputMaybe<Scalars["String"]>;
}>;

export type CreatePostMutation = {
  __typename?: "Mutation";
  createPost: {
    __typename?: "Post";
    id: number;
    title: string;
    content?: string | null;
  };
};

export type DeletePostMutationVariables = Exact<{
  deletePostId: Scalars["Float"];
}>;

export type DeletePostMutation = {
  __typename?: "Mutation";
  deletePost: boolean;
};

export type PostsQueryVariables = Exact<{ [key: string]: never }>;

export type PostsQuery = {
  __typename?: "Query";
  getPosts: Array<{
    __typename?: "Post";
    id: number;
    title: string;
    content?: string | null;
    createdAt: string;
    updatedAt: string;
  }>;
};

export const CreatePostDocument = `
    mutation CreatePost($title: String!, $content: String) {
  createPost(title: $title, content: $content) {
    id
    title
    content
  }
}
    `;
export const useCreatePostMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreatePostMutation,
    TError,
    CreatePostMutationVariables,
    TContext
  >,
) =>
  useMutation<
    CreatePostMutation,
    TError,
    CreatePostMutationVariables,
    TContext
  >(
    ["CreatePost"],
    (variables?: CreatePostMutationVariables) =>
      fetcher<CreatePostMutation, CreatePostMutationVariables>(
        CreatePostDocument,
        variables,
      )(),
    options,
  );
export const DeletePostDocument = `
    mutation DeletePost($deletePostId: Float!) {
  deletePost(id: $deletePostId)
}
    `;
export const useDeletePostMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    DeletePostMutation,
    TError,
    DeletePostMutationVariables,
    TContext
  >,
) =>
  useMutation<
    DeletePostMutation,
    TError,
    DeletePostMutationVariables,
    TContext
  >(
    ["DeletePost"],
    (variables?: DeletePostMutationVariables) =>
      fetcher<DeletePostMutation, DeletePostMutationVariables>(
        DeletePostDocument,
        variables,
      )(),
    options,
  );
export const PostsDocument = `
    query Posts {
  getPosts {
    id
    title
    content
    createdAt
    updatedAt
  }
}
    `;
export const usePostsQuery = <TData = PostsQuery, TError = unknown>(
  variables?: PostsQueryVariables,
  options?: UseQueryOptions<PostsQuery, TError, TData>,
) =>
  useQuery<PostsQuery, TError, TData>(
    variables === undefined ? ["Posts"] : ["Posts", variables],
    fetcher<PostsQuery, PostsQueryVariables>(PostsDocument, variables),
    options,
  );
