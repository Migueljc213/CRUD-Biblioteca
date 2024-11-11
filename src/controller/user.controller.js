import userServices from "../service/user.services.js";
import { loginService } from "../service/auth.services.js";

async function createUserController(req, res) {
  const newUser = req.body;

  try {
    const user = await userServices.createUserService(newUser);
    res.status(201).send({ user });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

async function findAllUsersController(req, res) {
  try {
    const users = await userServices.findAllUsersService();
    return res.status(200).send({ users });
  } catch (error) {
    return res.status(404).send(error.message);
  }
}

async function updateUserController(req, res) {
  const { id } = req.params;
  const newUser = req.body;

  try {
    const user = await userServices.updateUserService(newUser, id);
    res.send({ user });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function deleteUserController(req, res) {
  const { id } = req.params;
  try {
    const message = await userServices.deleteUserService(id);
    res.send({ message });
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function loginUserController(req, res) {
  const { email, password } = req.body;
  try {
    const token = await loginService(email, password);
    res.status(201).send({ token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}
export default {
  createUserController,
  findAllUsersController,
  updateUserController,
  deleteUserController,
  loginUserController,
};
