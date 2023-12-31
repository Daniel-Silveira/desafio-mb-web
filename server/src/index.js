import "./db/index.js";
import express from "express";
import cors from "cors";
import userRoutes from "./user/user.routes.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("", userRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
