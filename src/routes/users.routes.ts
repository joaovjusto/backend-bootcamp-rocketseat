import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

interface UserTemp {
  name: string;
  email: string;
  password?: string;
}

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    }) as UserTemp;

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: (err as Error).message });
  }
});

export default usersRouter;
