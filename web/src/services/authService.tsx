import { IUser } from "../interfaces/IUser";
import { api } from "../lib/api";

interface IRegister {
  name: string;
  email: string;
  password: string;
}

interface ILogin {
  email: string;
  password: string;
}

export const authService = {
  async authenticate(): Promise<{ user: IUser }> {
    try {
      const res = await api.get("/auth");

      if (res.status != 200) {
        throw new Error("Could not authenticate user");
      }

      return {
        user: res.data.user,
      };
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  },

  async register({
    name,
    email,
    password,
  }: IRegister): Promise<{ token: string }> {
    try {
      const res = await api.post("/auth", {
        name,
        email,
        password,
      });

      return {
        token: res.data.token,
      };
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  },

  async login({ email, password }: ILogin): Promise<{ token: string }> {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      return {
        token: res.data.token,
      };
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  },
};
