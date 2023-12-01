import { TUser } from "@/@types/user.type";
import { usersApi } from "@/data/users.api";
import { formatTimestamp } from "@/utils/convertDateTime";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ConvertedDate = ({ timestamp }: { timestamp: number }) => {
  const { days, hours, minutes } = formatTimestamp(timestamp);
 if (timestamp < 0) return "Сессия окончена"

  return (
    <p>
      До окончания сессии:
      <span className="font-bold">
        {" "}
        {days} дней, {hours} часов, {minutes} минут
      </span>
    </p>
  );
};

type TForm = {
  login: string;
  password: string;
  name: string;
};

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<TUser[]>([]);

  const deleteUser = async (user: TUser) => {
    const res = await usersApi.deleteUser(user.login);
    if (res) setUsers(users.filter((u) => u !== user));
  };

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
      setUsers([...users, res as TUser]);
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

  if (loading) return <div className="mt-8 loading loading-lg"></div>;

  return (
    <div className="mt-8">
      <ul className="flex flex-col gap-8 list-none">
        {users.map((user) => (
          <li className="flex flex-col justify-between gap-4 p-2 border lg:flex-row" key={user.id}>
            <div className="text-lg">
              <p>
                ФИО: <span className="font-bold"> {user.name}</span>
              </p>
              <p>
                Логин: <span className="font-bold"> {user.login}</span>
              </p>
              <p>
                Пароль: <span className="font-bold"> {user.password}</span>
              </p>

              <ConvertedDate
                timestamp={(user.expired as number) - Date.now()}
              />

              <div className="mt-4">
                <p>Результаты тестирования:</p>
                <div className="grid grid-cols-3 mt-4 font-bold text-center">
                  <div className="p-2 border">Название курса</div>
                  <div className="p-2 border">Оценки</div>
                  <div className="p-2 border">Осталось попыток</div>
                </div>
                <ul>
                  {user.tests.map((test) => (
                    <li className="grid grid-cols-3 text-center" key={test.ref}>
                      <div className="p-2 border">{test.name}</div>
                      <div className="p-2 border">
                        {test.results.length
                          ? test.results.map((r,i) => <span className="px-2 mr-2 border" key={i}>{r}</span>)
                          : "Отсутствует"}
                      </div>
                      <div className="p-2 border">{test.attempts}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex items-center">
              <button
                className="w-full px-4 py-2 button-secondary"
                onClick={() => deleteUser(user)}
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
      <hr className="my-8" />

      <div>
        <p className="text-xl">Добавить пользователя: </p>
        <form
          onSubmit={handleSubmit(createUser)}
          className="flex flex-col flex-wrap gap-4 mt-4 lg:items-center lg:flex-row"
        >
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
          <button className="px-8 py-2 button">Добавить</button>
        </form>
        <p className="mt-2 text-red-500">{errors.root?.message}</p>
      </div>
    </div>
  );
};

export { Admin };
