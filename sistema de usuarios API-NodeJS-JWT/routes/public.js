import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const router = express.Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;
// Cadastrar
router.post("/cadastro", async (req, res) => {
  try {
    const user = req.body;

    // Nível de segurança da senha
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const userDB = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: hashPassword,
      },
    });
    res.status(201).json(userDB);
  } catch (error) {
    res.status(500).json({ error: "Erro no servidor, tente novamente" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = req.body;

    const userDB = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    // COmparar as senhas tanto a do banco de dados quanto a que o usuário digitou
    const isMatch = await bcrypt.compare(user.password, userDB.password);

    //Conferir se o usuário existe e se a senha está correta
    if (!userDB) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    if (!isMatch) {
      return res.status(400).json({ error: "Senha incorreta" });
    }

    // Gerar o token JWT (Autenticação)
    const token = jwt.sign({ id: userDB.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ error: "Erro no servidor, tente novamente" });
  }
});
export default router;
