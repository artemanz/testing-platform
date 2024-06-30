import { RegisterOptions, useForm } from "react-hook-form";
import { submit } from "./submit";
import { TForm } from "./@types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/auth";
import bg from "@/assets/bg.jpg";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="flex flex-col">
        <div
          className="h-[15rem] text-white bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="container flex items-center h-full">
            <h1 className="text-4xl">
              «БИЗНЕС КОНСАЛТ» — КОМПЛЕКС УСЛУГ ДЛЯ БИЗНЕСА
            </h1>
          </div>
        </div>

        <div className="container grid flex-grow grid-cols-1 py-8 place-content-center">
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export { Login };
