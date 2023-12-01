import { TCourse } from "@/@types/course.type";
import { courseApi } from "@/data/course.api";
import { selectUserInfo } from "@/store/slices/auth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const User = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<TCourse[]>([]);
  const user = useSelector(selectUserInfo);
  if (!user) return null;

  useEffect(() => {
    courseApi
      .getCourses()
      .then((courses) => {
        if (!courses) throw new Error("Ошибка при загрузке курсов");
        setCourses(courses);
      })
      .catch()
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="mt-8 loading loading-lg"></div>;

  return (
    <div className="mt-8">
      {courses.length ? (
        <div>
          <h2 className="text-2xl">{user.name}</h2>
          <p className="mt-8 text-xl">Ваши курсы:</p>
          <ul className="mt-4">
            {courses.map((t) => (
              <li key={t.id}>
                <Link
                  className="flex flex-col p-4 transition-colors border hover:bg-white/10"
                  to={`/course/${t.id}`}
                >
                  <p className="text-xl font-bold text-accent">{t.title}</p>
                  <p className="mt-4">
                    Дата заключения договора:{" "}
                    <time dateTime="01.11.2023">01.11.2023</time>
                  </p>
                  <p>
                    Период обучения:{" "}
                    <time dateTime="01.11.2023">14.11.2023</time>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Нет доступных курсов</p>
      )}
    </div>
  );
};

export { User };
