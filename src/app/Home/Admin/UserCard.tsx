import { CoursesID } from "@/@types/course.type";
import { TUser } from "@/@types/user.type";
import { usersApi } from "@/data/users.api";
import { formatTimestamp } from "@/utils/convertDateTime";
import { useState } from "react";

type Props = {
  user: TUser;
  users: TUser[];
  setUsers: React.Dispatch<React.SetStateAction<TUser[]>>;
};

const ConvertedDate = ({ timestamp }: { timestamp: number }) => {
  const { days, hours, minutes } = formatTimestamp(timestamp);
  if (timestamp < 0) return "Сессия окончена";

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

const UserCard = ({ user, users, setUsers }: Props) => {
  const [userUpdateLoading, setUserUpdateLoading] = useState(false);

  const deleteUser = async () => {
    setUserUpdateLoading(true);
    const res = await usersApi.deleteUser(user.login);
    if (res) setUsers(users.filter((u) => u !== user));
    setUserUpdateLoading(false);
  };

  const openCourse = async (course: CoursesID) => {
    setUserUpdateLoading(true);

    switch (course) {
      case "upravlenie-zakupkami":
        user.courses.push({
          ref: "upravlenie-zakupkami",
          attempts: 3,
          results: [],
        });
        await usersApi.updateUser(user);
        setUsers(users);

        break;
      case "antiterror-bezopasnost":
        user.courses.push({
          ref: "antiterror-bezopasnost",
          attempts: 3,
          results: [],
        });
        await usersApi.updateUser(user);
        setUsers(users);

        break;
      default:
        return;
    }

    setUserUpdateLoading(false);
  };

  const closeCourse = async (course: CoursesID) => {
    setUserUpdateLoading(true);

    switch (course) {
      case "upravlenie-zakupkami":
        user.courses = user.courses.filter(
          (c) => c.ref !== "upravlenie-zakupkami"
        );
        await usersApi.updateUser(user);
        setUsers(users);

        break;
      case "antiterror-bezopasnost":
        user.courses = user.courses.filter(
          (c) => c.ref !== "antiterror-bezopasnost"
        );
        await usersApi.updateUser(user);
        setUsers(users);

        break;
      default:
        return;
    }

    setUserUpdateLoading(false);
  };

  return (
    <li
      style={{ opacity: userUpdateLoading ? 0.5 : 1 }}
      className="flex flex-col justify-between gap-4 p-2 border lg:flex-row"
      key={user.id}
    >
      <div className="text-lg">
        <p>
          ФИО: <span className="font-bold">{user.name}</span>
        </p>
        <p>
          Логин: <span className="font-bold">{user.login}</span>
        </p>
        <p>
          Пароль: <span className="font-bold">{user.password}</span>
        </p>

        <ConvertedDate timestamp={(user.expired as number) - Date.now()} />

        <div className="mt-8">
          <p className="font-bold">Список курсов</p>
          <ul className="flex flex-col gap-4 mt-2">
            <li className="flex items-center gap-2 flew-wrap before:content-['•']">
              <span>Управление закупками</span>
              {user.courses.find((t) => t.ref === "upravlenie-zakupkami") ? (
                <button
                  onClick={() => closeCourse("upravlenie-zakupkami")}
                  className="px-4 ml-2 button-danger"
                >
                  Закрыть
                </button>
              ) : (
                <button
                  onClick={() => openCourse("upravlenie-zakupkami")}
                  className="px-4 ml-2 button"
                >
                  Открыть
                </button>
              )}
            </li>
            <li className="flex items-center gap-2 flew-wrap before:content-['•']">
              <span>Антитеррористическая безопасность</span>
              {user.courses.find((t) => t.ref === "antiterror-bezopasnost") ? (
                <button
                  onClick={() => closeCourse("antiterror-bezopasnost")}
                  className="px-4 ml-2 button-danger"
                >
                  Закрыть
                </button>
              ) : (
                <button
                  onClick={() => openCourse("antiterror-bezopasnost")}
                  className="px-4 ml-2 button"
                >
                  Открыть
                </button>
              )}
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <p className="font-bold">Результаты тестирования:</p>
          <div className="grid grid-cols-3 mt-4 font-bold text-center">
            <div className="p-2 border">Название курса</div>
            <div className="p-2 border">Оценки</div>
            <div className="p-2 border">Осталось попыток</div>
          </div>
          <ul>
            {user.courses.map((test) => (
              <li className="grid grid-cols-3 text-center" key={test.ref}>
                <div className="p-2 border">{test.ref}</div>
                <div className="p-2 border">
                  {test.results.length
                    ? test.results.map((r, i) => (
                        <span className="px-2 mr-2 border" key={i}>
                          {r}
                        </span>
                      ))
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
          disabled={userUpdateLoading}
          className="w-full px-4 py-2 button-secondary disabled:bg-transparent"
          onClick={() => deleteUser()}
        >
          Удалить
        </button>
      </div>
    </li>
  );
};

export { UserCard };
