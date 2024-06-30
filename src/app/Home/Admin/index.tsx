import { TUser } from "@/@types/user.type";
import { usersApi } from "@/data/users.api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserCard } from "./UserCard";

type TForm = {
  login: string;
  password: string;
  name: string;
};

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<TUser[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<TForm>();

  const createUser = async (formData: TForm) => {
    const res = await usersApi.createUser(
      formData.login,
      formData.password,
      formData.name
    );

    if (res.error) {
      setError("root", { message: res.error });
    } else {
      setUsers([res as TUser, ...users]);
      reset();
    }
  };

  useEffect(() => {
    usersApi
      .getUsers()
      .then((data) => {
        if (!data) throw new Error();
        setUsers(data.filter((user) => user.role !== "admin"));
      })
      .catch()
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <div className="mt-8 loading loading-lg text-primary"></div>;

  return (
    <div className="mt-8">
      <div>
        <p className="text-xl">Добавить пользователя: </p>
        <form onSubmit={handleSubmit(createUser)} className="">
          <div className="flex flex-col flex-wrap gap-4 mt-4 lg:items-center lg:flex-row">
            <input
              {...register("login", { required: true })}
              className="input"
              type="text"
              placeholder="Логин"
            />
            <input
              {...register("name", { required: true })}
              className="input"
              type="text"
              placeholder="ФИО"
            />
            <input
              {...register("password", { required: true })}
              className="input"
              type="text"
              placeholder="Пароль"
            />
          </div>

          <button className="px-8 py-2 mt-4 button">Добавить</button>
        </form>
        <p className="mt-2 text-red-500">{errors.root?.message}</p>
      </div>

      <hr className="my-8" />

      <ul className="flex flex-col gap-8 list-none">
        {users.map((user) => (
          <UserCard
            key={user.id}
            users={users}
            setUsers={setUsers}
            user={user}
          />
        ))}
      </ul>
    </div>
  );
};

export { Admin };

/*
          <div className="flex flex-col gap-2 mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                checked={courses.includes("upravlenie-zakupkami")}
                onChange={(e) =>
                  e.target.checked
                    ? setCourses([...courses, "upravlenie-zakupkami"])
                    : setCourses(
                        courses.filter((c) => c !== "upravlenie-zakupkami")
                      )
                }
                className="checkbox checkbox-primary"
                type="checkbox"
              />
              Управление закупками
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                checked={courses.includes("antiterror-bezopasnost")}
                onChange={(e) =>
                  e.target.checked
                    ? setCourses([...courses, "antiterror-bezopasnost"])
                    : setCourses(
                        courses.filter((c) => c !== "antiterror-bezopasnost")
                      )
                }
                className="checkbox checkbox-primary"
                type="checkbox"
              />
              Антитеррористическая безопасность
            </label>
          </div> */
