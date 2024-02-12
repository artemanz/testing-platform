import { useNavigate, useParams } from "react-router-dom";
import { useCourseData } from "./course.data";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "@/store/slices/auth";
import { selectQuizStarted, startQuiz } from "@/store/slices/quiz";
// import { BsFiles } from "react-icons/bs";
import { RiFolderVideoLine, RiFile2Line } from "react-icons/ri";

const Course = () => {
  const navigate = useNavigate();
  const params = useParams<{ courseId: string }>();
  const user = useSelector(selectUserInfo)!;

  const dispatch = useDispatch();
  const quizStarted = useSelector(selectQuizStarted);
  const { course, error, loading } = useCourseData(params.courseId || "");

  const test = user.tests.find((test) => test.ref === params.courseId);

  if (loading)
    return (
      <main className="container grid h-screen place-content-center">
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
      <main className="container min-h-screen py-8">
        <header className="mb-8">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="px-4 py-2 button-secondary"
          >
            Назад
          </button>
        </header>
        <h1 className="text-4xl ">{course.title}</h1>

        <div className="grid md:grid-cols-[minmax(0,1fr)_20rem] grid-cols-1 mt-12 gap-12">
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
                    dispatch(startQuiz(params.courseId!));
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
                  href="#"
                >
                  <RiFile2Line size={32} />
                  <span>Материалы</span>
                </a>
              </li>

              <li>
                <a
                  className="flex items-center gap-4 p-4 transition-colors hover:bg-primary hover:text-white"
                  href="#"
                >
                  <RiFolderVideoLine size={32} />
                  <span>Вебинар</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>
    );
};

export { Course };
