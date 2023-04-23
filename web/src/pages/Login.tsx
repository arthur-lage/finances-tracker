import { useForm } from "react-hook-form";
import { authService } from "../services/authService";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type Inputs = {
  email: string;
  password: string;
};

export function Login() {
  const { isAuth, authenticateUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  async function handleLogin({ email, password }: Inputs) {
    try {
      const { token } = await authService.login({
        email,
        password,
      });

      localStorage.setItem("finances-tracker::token", token);

      authenticateUser();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {isAuth() ? (
        <Navigate to="/" />
      ) : (
        <div>
          <h1>Login</h1>

          <form
            className="flex flex-col gap-8"
            onSubmit={handleSubmit(handleLogin)}
          >
            <div className="flex flex-col gap-4">
              <label htmlFor="email">Email</label>
              <input
                {...register("email", { required: true })}
                placeholder="Email"
                id="email"
                type="email"
              />
              {errors.email ? <span>This field is required</span> : ""}
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor="password">Password</label>
              <input
                {...register("password", { required: true })}
                placeholder="Password"
                type="password"
                id="password"
              />
              {errors.password ? <span>This field is required</span> : ""}
            </div>

            <button type="submit">Login</button>
          </form>

          <Link to="/register">Don't have an account yet? Create one</Link>
        </div>
      )}
    </>
  );
}
