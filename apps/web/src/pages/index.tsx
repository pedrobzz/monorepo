/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useCreatePostMutation,
  usePostsQuery,
} from "../common/hooks/generated";
import {
  Button,
  Container,
  Divider,
  Group,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQueryClient } from "react-query";
import Post from "../common/components/Post";

const Home = (): JSX.Element => {
  const queryClient = useQueryClient();
  const { data, refetch, ...postsQuery } = usePostsQuery({});

  const createPost = useCreatePostMutation({
    onMutate: variables => {
      const randomId = (Math.random() * (99999 - 9999) + 9999).toFixed();
      const newData = [
        ...data.getPosts,
        {
          id: randomId,
          ...variables,
          createdAt: new Date().getTime().toString(),
        },
      ];
      console.log(randomId);
      queryClient.setQueryData(["Posts", {}], { getPosts: newData });
    },
    onSuccess: () => {
      refetch();
    },
  });
  const form = useForm({
    initialValues: {
      title: "",
      content: "",
    },
    // funciton
    validate: ({ title, content }) => ({
      title: (() => {
        if (title.length < 5) {
          return "Title must contain more than 5 characters.";
        }
        if (title.length > 25) {
          return "Title must contain less than 25 characters.";
        }

        if (!isNaN(Number(title))) {
          return "Title can't be a number.";
        }
      })(),
      // ternary
      content: !content
        ? null
        : content.length > 255
        ? "Content must contain less than 255 characters."
        : null,
    }),
  });
  return (
    <Container size="xs" px="xs">
      <Title sx={{ color: "red" }}>Create Posts</Title>
      <Divider my="sm" />
      <form
        onSubmit={form.onSubmit(async values => {
          createPost.mutate(values, {
            onSuccess: () => {
              values.title = "";
              values.content = "";
              refetch();
            },
          });
        })}
      >
        <TextInput
          required
          label="Post Title"
          placeholder="Post Title"
          {...form.getInputProps("title")}
        />
        <Textarea
          label="Post Content"
          placeholder="Content must contain less than 255 characters and can be nullable."
          {...form.getInputProps("content")}
        />
        <Group position="right" mt="md">
          <Button type="submit" loading={createPost.isLoading}>
            Submit
          </Button>
        </Group>
      </form>
      <Divider my="sm" />
      <Container>
        {data?.getPosts &&
          data.getPosts.map((_, p_index) => {
            const post = data.getPosts[data.getPosts.length - p_index - 1];
            return <Post key={post.id} post={post} />;
          })}
      </Container>
    </Container>
  );
};

export default Home;
