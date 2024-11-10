import jwt from "jsonwebtoken";
import userRepositories from "../repositories/user.repositories.js";
import bcrypt from "bcrypt";
import "dotenv/config";

function generateJWT(id) {
  if (!process.env.SECRET_JWT) {
    throw new Error("JWT secret is not defined in environment variables");
  }
  return jwt.sign({ id }, process.env.SECRET_JWT, { expiresIn: 86400 }); // expiresIn corrigido
}

async function loginService(email, password) {
  const user = await userRepositories.findUserByEmailRepository(email);
  if (!user) throw new Error("Invalid User");
  console.log(user)
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid User");
  return generateJWT(user.id);
}

export { generateJWT, loginService };
