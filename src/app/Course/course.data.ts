import { TCourse } from "@/@types/course.type";
import { courseApi } from "@/data/course.api";
import { useEffect, useState } from "react";

export const useCourseData = (id: string) => {
  const [course, setCourse] = useState<TCourse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const data = await courseApi.getCourse(id);
      if (data instanceof Error) setError(data);
      else setCourse(data);
      setLoading(false);
    }

    getData();
  }, []);

  return { course, loading, error };
};
