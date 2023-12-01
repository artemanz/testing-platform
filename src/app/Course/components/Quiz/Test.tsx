import { TCourse } from "@/@types/course.type";
import { updateResults } from "@/store/slices/auth";
import {
  answerQuestion,
  finishQuiz,
  initAnswers,
  selectAnswers,
} from "@/store/slices/quiz";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Result } from "./Result";

export const Test = ({ quiz }: { quiz: TCourse["quiz"] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const currentQuiz = quiz[currentIndex];
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const answers = useSelector(selectAnswers);

  useEffect(() => {
    if (!answers) {
      const initialAnswers = quiz.reduce<Record<number, number | number[]>>(
        (acc, q) => {
          acc[q.id] = Array.isArray(q.answer) ? [] : 0;
          return acc;
        },
        {}
      );

      dispatch(initAnswers(initialAnswers));
    }
  }, []);

  const finishTest = async () => {
    let result = 0;
    for (let i in quiz) {
      const question = quiz[i];
      if (Array.isArray(question.answer)) {
        const answer = answers![question.id] as number[];
        if (
          answer.every((a) => (question.answer as number[]).includes(a)) &&
          answer.length === question.answer.length
        )
          result++;
      } else if (question.answer === answers![question.id]) result++;
    }

    setResult(`${result} / ${quiz.length}`);
  };

  if (!answers) return null;

  return (
    <main className="container h-screen py-8">
      <div className="flex flex-col w-full h-full">
        <p className="text-2xl font-secondary">
          ВОПРОС: {currentQuiz.id} / {quiz.length}
        </p>
        <div className="p-2 mt-4 border">{currentQuiz.text}</div>

        <ul className="flex flex-col gap-8 mt-8 grow">
          {currentQuiz.options.map((option) => (
            <li key={option.id}>
              <label className="flex items-center gap-2 cursor-pointer">
                {Array.isArray(currentQuiz.answer) ? (
                  <input
                    checked={(answers[currentQuiz.id] as number[]).includes(
                      option.id
                    )}
                    className="checkbox checkbox-accent"
                    type="checkbox"
                    onChange={(e) => {
                      let answer = [...(answers[currentQuiz.id] as number[])];
                      if (e.target.checked) answer.push(option.id);
                      else answer = answer.filter((a) => option.id !== a);

                      dispatch(
                        answerQuestion({
                          questionId: currentQuiz.id,
                          answer: answer,
                        })
                      );
                    }}
                  />
                ) : (
                  <input
                    className="radio radio-accent"
                    type="radio"
                    name={String(currentQuiz.id)}
                    onChange={() =>
                      dispatch(
                        answerQuestion({
                          questionId: currentQuiz.id,
                          answer: option.id,
                        })
                      )
                    }
                    checked={answers[currentQuiz.id] === option.id}
                  />
                )}
                <span>{option.value}</span>
              </label>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-12 mt-12">
          <button
            disabled={currentIndex === 0}
            className="w-24 h-8 button"
            onClick={() => {
              setCurrentIndex(currentIndex - 1);
            }}
          >
            Назад
          </button>
          <nav className="flex flex-wrap justify-center gap-2">
            {quiz.map((q, idx) => (
              <button
                className={idx === currentIndex ? "text-accent" : ""}
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
              >
                {q.id}
              </button>
            ))}
          </nav>
          {currentIndex === quiz.length - 1 ? (
            <button onClick={() => finishTest()} className="w-24 h-8 button">
              Завершить
            </button>
          ) : (
            <button
              className="w-24 h-8 button"
              onClick={() => {
                setCurrentIndex(currentIndex + 1);
              }}
            >
              Вперед
            </button>
          )}
        </div>
      </div>

      {result && (
        <Result
          result={result}
          close={() => {
            setResult(null);
            dispatch(finishQuiz());
            dispatch(
              updateResults({
                courseId: params.courseId!,
                result: result,
              })
            );
            navigate(`/course/${params.courseId}`);
          }}
        />
      )}
    </main>
  );
};
