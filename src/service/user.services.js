import userRepository from "../repositories/user.repositories.js";
import { generateJWT } from "./auth.services.js";
import bcrypt from "bcrypt";

async function createUserService(newUser) {
  const foundUser = await userRepository.findUserByEmailRepository(
    newUser.email
  );
  if (foundUser) {
    throw new Error("User alredy exists!");
  }
  const passHash = await bcrypt.hash(newUser.password, 10);
  const user = await userRepository.createUserRepository({
    ...newUser,
    password: passHash,
  });
  if (!user) throw new Error("Error creating User");
  return user;
}

async function findUserByEmailService(email) {
  const user = await userRepository.findUserByEmailRepository(email);
  if (!user) {
    throw new Error("USer alredy exists!");
  }
  return user;
}

async function findAllUsersService() {
  const users = await userRepository.findAllUsersRepository();
  return users;
}

async function updateUserService(newUser, userId) {
  if (!userId) {
    throw new Error("User ID is required");
  }
  const user = await userRepository.findUserByIdRespositoy(userId);

  if (!user) throw new Error("User not found");
  if (newUser.password) {
    newUser.password = await bcrypt.hash(newUser.password, 10);
  }
  const userUpdated = userRepository.updateUserRepository(newUser, userId);
  return userUpdated;
}

async function deleteUserService(userId) {
  const user = await userRepository.findUserByIdRespositoy(userId);
  if (!user) throw new Error("User not found");
  const message = await userRepository.deleteUserRepositoty(userId);
  return message;
}
export default {
  createUserService,
  findAllUsersService,
  updateUserService,
  deleteUserService,
  findUserByEmailService,
};
