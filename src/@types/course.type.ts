export type CoursesID = "upravlenie-zakupkami" | "antiterror-bezopasnost";

export type TCourse = {
  id: CoursesID;
  about: string;
  title: string;
  link: string
  quiz: {
    id: number;
    text: string;
    answer: number | number[];
    options: { id: number; value: string }[];
  }[];
};

export type TFirebaseCourse = Omit<TCourse, "id">;
