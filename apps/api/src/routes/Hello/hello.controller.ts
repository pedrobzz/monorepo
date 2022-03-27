import { Router } from "express";

import { __prod__ } from "../../config/constants";

const helloRoute = Router();

helloRoute.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello, World! React Query!!!! hahahaha deryck 1!",
  });
});

export default helloRoute;
