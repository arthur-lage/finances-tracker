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
        <div className="flex flex-col items-center justify-center min-h-screen from-emerald-950 to-emerald-800 bg-gradient-to-br">
          <div className="flex items-center flex-col gap-4">
            <h1 className="text-4xl uppercase font-bold font-nunito text-white">
              Finances Tracker
            </h1>
            <h2 className="text-2xl font-medium font-nunito text-zinc-200">
              Login
            </h2>
          </div>

          <form
            className="flex flex-col gap-6 mt-12 max-w-2xl w-full"
            onSubmit={handleSubmit(handleLogin)}
          >
            <div className="flex flex-col gap-2 w-full">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                {...register("email", { required: true })}
                placeholder="Email"
                id="email"
                type="email"
                className="w-full bg-zinc-900 placeholder:text-zinc-400 text-white border-2  focus:border-violet-400 border-zinc-600 transition-all duration-150 ease-out outline-none pl-3 py-2 rounded-md shadow-md font-nunito font-medium"
              />
              {errors.email ? <span>This field is required</span> : ""}
            </div>

            <div className="flex flex-col gap-2">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                {...register("password", { required: true })}
                placeholder="Password"
                type="password"
                className="w-full bg-zinc-900 placeholder:text-zinc-400 text-white border-2  focus:border-violet-400 border-zinc-600 transition-all duration-150 ease-out outline-none pl-3 py-2 rounded-md shadow-md font-nunito font-medium"
                id="password"
              />
              {errors.password ? <span>This field is required</span> : ""}
            </div>

            <button
              className="mt-4 shadow-md text-white bg-gradient-to-br from-purple-700 to-purple-500 border-2 border-transparent hover:border-violet-400 outline-none font-nunito font-bold py-3 hover:brightness-110 transition-all duration-150 ease-out rounded-md"
              type="submit"
            >
              Login
            </button>
          </form>

          <Link
            className="font-medium font-nunito text-white mt-6 hover:underline"
            to="/register"
          >
            Don't have an account yet? Create one
          </Link>
        </div>
      )}
    </>
  );
}
