import { Link, useNavigate, useParams } from "react-router-dom";
import { useCourseData } from "./course.data";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, updateAttempts } from "@/store/slices/auth";
import { selectQuizStarted, startQuiz } from "@/store/slices/quiz";
import { RiFile2Line } from "react-icons/ri";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import bg from "@/assets/bg.jpg";

const Course = () => {
  const navigate = useNavigate();
  const params = useParams<{ courseId: string }>();
  const user = useSelector(selectUserInfo)!;

  useEffect(() => {
    if (!user.courses.find((c) => c.ref === params.courseId)) navigate("/");
  }, []);

  const dispatch = useDispatch();
  const quizStarted = useSelector(selectQuizStarted);
  const { course, error, loading } = useCourseData(params.courseId || "");

  const test = user.courses.find((course) => course.ref === params.courseId);

  if (loading)
    return (
      <main className="grid h-screen place-content-center">
        <div className="loading loading-lg"></div>
      </main>
    );

  if (error || !course) {
    return (
      <div className="container grid h-screen place-content-center">
        Error...
      </div>
    );
  }

  if (course)
    return (
      <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
        <Header />
        <main>
          <div
            className="text-white bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${bg})` }}
          >
            <div className="container relative flex items-center min-h-[15rem] py-20">
              <Link
                className="absolute text-lg transition-colors top-6 hover:text-primary"
                to={"/"}
              >
                ← Назад
              </Link>
              <h1 className="text-4xl">{course.title}</h1>
            </div>
          </div>

          <div className="container grid md:grid-cols-[minmax(0,1fr)_20rem] grid-cols-1 mt-8 gap-12">
            <div>
              <div
                className="leading-relaxed [&_ul]:pl-8 [&_ul]:list-disc [&_span]:font-bold [&_span]:text-primary"
                dangerouslySetInnerHTML={{ __html: course.about }}
              ></div>
              <div className="flex flex-col gap-8 mt-8 md:flex-row md:items-center">
                {test && test.attempts > 0 && (
                  <button
                    disabled={!!quizStarted && params.courseId !== quizStarted}
                    onClick={() => {
                      if (!quizStarted) dispatch(updateAttempts(course.id));
                      dispatch(startQuiz(course.id));
                      navigate("quiz");
                    }}
                    className="px-4 py-2 button"
                  >
                    {quizStarted === params.courseId
                      ? "Продолжить тестирование"
                      : "Начать тестирование"}
                  </button>
                )}
                {test && <p>Осталось попыток: {test.attempts}</p>}
              </div>
              {quizStarted && params.courseId !== quizStarted && (
                <p className="text-red-500">Вы уже начали другой тест</p>
              )}
              <div className="mt-8">
                <p className="text-2xl ">Результаты:</p>

                {test?.results.length ? (
                  <ul className="mt-4 ">
                    {test.results.map((res, idx) => (
                      <li className="grid grid-cols-2 text-center" key={idx}>
                        <div className="py-2 border">Попытка № {idx + 1}</div>
                        <div className="py-2 border">{res}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4">Результатов пока нет</p>
                )}
              </div>
            </div>

            <div className="row-start-1 py-4 border md:row-start-auto">
              <h2 className="px-4 text-xl ">Файлы:</h2>
              <hr className="my-4" />
              <ul className="flex flex-col">
                <li>
                  <a
                    className="flex items-center gap-4 p-4 transition-colors hover:bg-primary hover:text-white"
                    href={course.link}
                    target="_blank"
                  >
                    <RiFile2Line size={32} />
                    <span>Материалы</span>
                  </a>
                </li>

                {/* <li>
                  <a
                    className="flex items-center gap-4 p-4 transition-colors hover:bg-primary hover:text-white"
                    href="#"
                  >
                    <RiFolderVideoLine size={32} />
                    <span>Вебинар</span>
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
};

export { Course };
