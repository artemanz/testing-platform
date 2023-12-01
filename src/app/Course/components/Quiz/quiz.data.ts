import { TCourse } from "@/@types/course.type";
import { courseApi } from "@/data/course.api";
import { useEffect, useState } from "react";

export const useQuizData = (id: string) => {
  const [quiz, setQuiz] = useState<TCourse["quiz"] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const data = await courseApi.getQuiz(id);
      if (data instanceof Error) setError(data);
      else setQuiz(data);
      setLoading(false);
    }

    getData();
  }, []);

  return { quiz, loading, error };
};
