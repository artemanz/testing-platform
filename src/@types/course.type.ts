export type TCourse = {
  id: string;
  about: string;
  title: string;
  quiz: {
    id: number;
    text: string;
    answer: number | number[];
    options: { id: number; value: string }[];
  }[];
};

export type TFirebaseCourse = Omit<TCourse, "id">;
