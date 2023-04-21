import { verify } from "argon2";
import { prisma } from "../lib/prisma";
import { server } from "..";

interface IAuthenticateUser {
  id: string;
}

interface IAuthRegister {
  name: string;
  email: string;
  password: string;
}

interface IAuthLogin {
  email: string;
  password: string;
}

export const authService = {
  async auth({ id }: IAuthenticateUser) {
    const userExists = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new Error("Could not find user");
    }

    return {
      name: userExists.name,
      email: userExists.email,
    };
  },

  async register({ name, email, password }: IAuthRegister): Promise<string> {
    const emailExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (emailExists) {
      throw new Error("This email is already being used");
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return server.jwt.sign({ id: user.id });
  },

  async login({ email, password }: IAuthLogin): Promise<string> {
    const currentUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!currentUser) {
      throw new Error("Invalid email or password");
    }

    const arePasswordsMatching = await verify(currentUser.password, password);

    if (!arePasswordsMatching) {
      throw new Error("Invalid email or password");
    }

    return server.jwt.sign({ id: currentUser.id });
  },
};
