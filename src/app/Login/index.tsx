import { RegisterOptions, useForm } from "react-hook-form";
import { submit } from "./submit";
import { TForm } from "./@types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/auth";

const loginInputProps: RegisterOptions<TForm, "login"> | undefined = {
  required: true,
};
const passwordInputProps: RegisterOptions<TForm, "password"> | undefined = {
  required: true,
};

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<TForm>();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = handleSubmit(async (formData) => {
    try {
      setLoading(true);
      const user = await submit(formData);
      dispatch(setCredentials(user));
      navigate("/");
    } catch (error: any) {
      setError("root", { message: error.message });
    } finally {
      setLoading(false);
    }
  });

  return (
    <main className="grid h-screen grid-cols-1 place-content-center">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-sm px-8 py-4 mx-auto border border-gray-500 shadow-md"
      >
        <h1 className="text-4xl text-center ">ВОЙТИ</h1>
        <div className="flex flex-col gap-4 mt-4">
          <input
            {...register("login", loginInputProps)}
            type="text"
            className="input"
            placeholder="Логин"
          />
          <input
            {...register("password", passwordInputProps)}
            type="password"
            className="input"
            placeholder="Пароль"
          />
        </div>
        {errors.root && (
          <p className="mt-2 text-center text-red-500">
            {errors.root?.message}
          </p>
        )}
        <button className="px-8 py-2 mx-auto mt-8 button">
          {loading ? <span className="loading"></span> : "Войти"}
        </button>
      </form>
    </main>
  );
};

export { Login };
