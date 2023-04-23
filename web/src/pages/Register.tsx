import { Link, Navigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

export function Register() {
  const { isAuth, authenticateUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  async function handleRegister({ name, email, password }: Inputs) {
    try {
      const { token } = await authService.register({
        name,
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
          <h1>Register</h1>

          <form onSubmit={handleSubmit(handleRegister)}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                {...register("name", { required: true })}
                placeholder="name"
                id="name"
                type="text"
              />
              {errors.name ? <span>This field is required</span> : ""}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                {...register("email", { required: true })}
                placeholder="Email"
                id="email"
                type="email"
              />
              {errors.email ? <span>This field is required</span> : ""}
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Password"
                id="password"
              />
              {errors.password ? <span>This field is required</span> : ""}
            </div>

            <button type="submit">Register</button>
          </form>

          <Link to="/login">Already have an account? Login</Link>
        </div>
      )}
    </>
  );
}
