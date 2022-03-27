import { useContext, useEffect, useState } from "react";
import { Title } from "../common/components/Title";
import AppContext from "../common/context/appContext";
import axios from "axios";
const Home = (): JSX.Element => {
  const ctx = useContext(AppContext);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const updateMessage = async () => {
      const messageResponse = await axios.get("http://localhost:3001");
      setMessage(messageResponse.data["message"]);
    };

    updateMessage();
  }, [message]);
  return (
    <>
      <Title>My page</Title>
      <h3>Context Name: {ctx.name}</h3>
      <h3>Message: {message}</h3>
    </>
  );
};

export default Home;
