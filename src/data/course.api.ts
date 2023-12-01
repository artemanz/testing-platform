import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import { db } from "./db";
import { TCourse, TFirebaseCourse } from "@/@types/course.type";

class API {
  async getQuiz(id: string): Promise<TCourse["quiz"] | Error> {
    const course = await this.getCourse(id);
    if (course instanceof Error) return course;
    else return course.quiz;
  }

  async getCourse(id: string): Promise<TCourse | Error> {
    try {
      const snap = await getDoc(doc(db, "courses", id));

      if (!snap.exists()) throw new Error("Курс с таким ID не найден");
      const data = snap.data() as TFirebaseCourse;

      return { id: snap.id, ...data };
    } catch (error: any) {
      return error;
    }
  }

  async getCourses() {
    try {
      const snap = await getDocs(collection(db, "courses"));

      return snap.docs.map((s) => {
        const data = s.data() as TFirebaseCourse;
        return { id: s.id, ...data };
      });
    } catch (error) {
      return [];
    }
  }
}

export const courseApi = new API();
