import { create } from 'node:domain';
import { AppError } from '../../shared/errors/app.error.js';
import { hashPassword } from '../../shared/utils/password.util.js';
import { userRepository } from './user.repository.js';
import type { UpdateUserInput, UserResponse } from './user.types.js';
import { UserCreateInput } from '../../generated/prisma/models.js';

export const userService = {
  fetchUserById: async (id: string) => {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new AppError(404, 'USER_NOT_FOUND', 'User was not found.');
    }
    return user;
  },

  createUser: async (userInput: UserCreateInput) => {
    const passwordHash = await hashPassword(userInput.password);
    const user = await userRepository.create(userInput, passwordHash);
    return user;
  },

  updateUser: async (id: string, input: UpdateUserInput) => {
    const passwordHash = input.password ? await hashPassword(input.password) : undefined;
    return userRepository.updateById(id, input, passwordHash);
  },

  fetchAllUser: async () => {
    return userRepository.findManyUser();
  },

  deleteUser: (id: string) => userRepository.deleteById(id),
};
