import express from "express";
import helloRoute from "./routes/Hello/hello.controller";
import cors from "cors";
const app = express();

app.use(cors());

app.use("/", helloRoute);

const server = app.listen(3001, () => {
  console.log("listening at 3001!");
});

export default server;
