import { Link, Navigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { FormButton } from "../components/FormButton";
import { useState } from "react";
import { AuthLoading } from "../components/AuthLoading";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

export function Register() {
  const { isAuth, authenticateUser, isAuthenticatingUser } = useAuth();
  const [isTryingToRegister, setIsTryingToRegister] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  async function handleRegister({ name, email, password }: Inputs) {
    try {
      setIsTryingToRegister(true);

      const { token } = await authService.register({
        name,
        email,
        password,
      });

      localStorage.setItem("finances-tracker::token", token);

      authenticateUser();
    } catch (err) {
      console.error(err);
    } finally {
      setIsTryingToRegister(false);
    }
  }

  return (
    <>
      {isAuth() ? (
        <Navigate to="/" />
      ) : (
        <div className="bg-app">
          <div className="min-h-screen fade-in flex flex-col items-center justify-center">
            {isAuthenticatingUser ? <AuthLoading /> : ""}

            <div className="flex items-center flex-col gap-4">
              <h1 className="app-title">Finances Tracker</h1>
              <h2 className="text-2xl font-medium font-jost text-white">
                Register
              </h2>
            </div>

            <form
              className="px-[19px] flex flex-col gap-[15px] mt-12 max-w-[352px] w-full"
              onSubmit={handleSubmit(handleRegister)}
            >
              <div className="flex flex-col w-full gap-4">
                <label className="form-label" htmlFor="name">
                  name
                </label>
                <input
                  {...register("name", { required: true })}
                  placeholder="name"
                  id="name"
                  type="text"
                  className={`w-full bg-zinc-900 placeholder:text-zinc-400 text-white border-2 focus:border-white transition-all duration-150 ease-out outline-none pl-3 h-[50px] rounded-md shadow-md font-jost font-medium text-lg ${
                    errors.name ? "border-red-500" : "border-input-border"
                  }`}
                />
              </div>
              <div className="flex flex-col w-full gap-4">
                <label className="form-label" htmlFor="email">
                  email
                </label>
                <input
                  {...register("email", { required: true })}
                  placeholder="Email"
                  id="email"
                  type="email"
                  className={`w-full bg-zinc-900 placeholder:text-zinc-400 text-white border-2 focus:border-white transition-all duration-150 ease-out outline-none pl-3 h-[50px] rounded-md shadow-md font-jost font-medium text-lg ${
                    errors.email ? "border-red-500" : "border-input-border"
                  }`}
                />
              </div>
              <div className="flex flex-col w-full gap-4">
                <label className="form-label" htmlFor="password">
                  password
                </label>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="Password"
                  id="password"
                  className={`w-full bg-zinc-900 placeholder:text-zinc-400 text-white border-2 focus:border-white transition-all duration-150 ease-out outline-none pl-3 h-[50px] rounded-md shadow-md font-jost font-medium text-lg ${
                    errors.password ? "border-red-500" : "border-input-border"
                  }`}
                />
              </div>

              <FormButton
                isLoading={isTryingToRegister}
                type="submit"
                title="Register"
              />
            </form>

            <Link
              className="text-[20px] text-center px-4 font-jost text-white mt-[30px] hover:underline"
              to="/login"
            >
              Already have an account? Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
