/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Paper,
  Grid,
  Avatar,
  Title,
  ActionIcon,
  Box,
  Text,
} from "@mantine/core";
import React, { memo } from "react";
import { useQueryClient } from "react-query";
import { X } from "tabler-icons-react";
import {
  PostsQuery,
  useDeletePostMutation,
  usePostsQuery,
} from "../../hooks/generated";

const Post: React.FC<{
  post: PostsQuery["getPosts"][0];
}> = ({ post }): JSX.Element => {
  const queryClient = useQueryClient();
  const { data, refetch } = usePostsQuery();

  const deletePost = useDeletePostMutation({
    onMutate: variables => {
      const newData = data.getPosts.filter(
        p => p.id !== variables.deletePostId,
      );
      queryClient.setQueryData(["Posts", {}], { getPosts: newData });
    },
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      alert("Opa deu erro");
    },
  });
  const now = new Date(Number(post.createdAt)).toISOString();
  const [year, month, day] = now.split("T")[0].split("-");
  const [hours, minutes, secs] = now.split("T")[1].split(":");
  return (
    <Paper key={post.id} p={10} shadow={"xs"} my={5}>
      <Grid align={"center"} justify={"space-between"} m={0}>
        <Box sx={{ display: "flex", gap: 10 }}>
          <Avatar
            src="https://thispersondoesnotexist.com/image"
            radius={"xl"}
          />
          <Box>
            <Title order={5}>{post.title}</Title>
            <Text
              size="xs"
              color="gray"
            >{`${day}/${month}/${year} ${hours}:${minutes}:${secs.substring(
              0,
              2,
            )}`}</Text>
          </Box>
        </Box>
        <ActionIcon
          onClick={async () => {
            deletePost.mutate(
              { deletePostId: post.id },
              {
                onSuccess: () => {
                  refetch();
                },
              },
            );
          }}
        >
          <X />
        </ActionIcon>
      </Grid>

      <Text>{post.content}</Text>
    </Paper>
  );
};

export default memo(Post);
