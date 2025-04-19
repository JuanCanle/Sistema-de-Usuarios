import express from "express";
import publicRoute from "./routes/public.js";
import privateRoute from "./routes/private.js";
import cors from "cors";

import auth from "./middlewares/auth.js";

const server = express();

// Avisar ao express para devolver em json quando eu fizer um request
server.use(express.json());
// Habilitar o CORS para permitir requisições de qualquer dominio
server.use(cors());

server.use("/", publicRoute);
// Primeiro vai passar no auth para depois passar no privateRoute
server.use("/", auth, privateRoute);

server.listen(3333, () => {
  console.log("Server rodando");
});

// User: juan
// Password: RaBB7TjZqWJw90ZL
