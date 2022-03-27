/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Title } from "../common/components/Title";
import AppContext from "../common/context/appContext";
import axios from "axios";

// import { gql, useQuery } from "@apollo/client";
import client from "../common/libs/ApolloClient";
import { useQuery } from "react-query";

const Home = (): JSX.Element => {
  const ctx = useContext(AppContext);
  // const getPosts = gql`
  //   query Post {
  //     getPosts {
  //       title
  //       id
  //       content
  //     }
  //   }
  // `;
  // const { data: posts, refetch } = useQuery(getPosts, { pollInterval: 1000 });
  const posts = [
    {
      id: 1,
      title: "lalala",
      content: "123",
    },
  ];

  const test = useQuery(
    "query",
    async () => {
      const data = await axios.get("http://localhost:3003");
      return data.data;
    },
    {
      refetchOnWindowFocus: true,
      refetchInterval: 1000,
    },
  );
  return (
    <>
      <Title>My page</Title>
      <h3>Context Name: {ctx.name}</h3>
      <h3>Message: {test?.data?.message}</h3>
      <div style={{ display: "flex" }}>
        {posts &&
          posts.map(post => {
            return (
              <div
                key={post.id}
                style={{ border: "1px solid red", margin: "5px" }}
              >
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Home;
