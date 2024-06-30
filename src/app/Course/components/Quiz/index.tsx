import { Navigate, useParams } from "react-router-dom";
import { useQuizData } from "./quiz.data";
import { Test } from "./Test";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/store/slices/auth";
import { selectQuizStarted } from "@/store/slices/quiz";

const Quiz = () => {
  const params = useParams<{ courseId: string }>();
  const { quiz, loading, error } = useQuizData(params.courseId!);
  const user = useSelector(selectUserInfo)!;
  const quizStarted = useSelector(selectQuizStarted);
  const test = user.courses.find((t) => t.ref === params.courseId);

  if (!test?.attempts || params.courseId !== quizStarted)
    return <Navigate to={`/course/${params.courseId}`} />;

  if (loading)
    return (
      <main className="container grid h-screen place-content-center">
        <div className="loading loading-lg"></div>
      </main>
    );

  if (error || !quiz)
    return (
      <div className="container grid h-screen place-content-center">
        Error...
      </div>
    );

  return <Test quiz={quiz} />;
};
export { Quiz };
