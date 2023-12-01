import { createSlice } from "@reduxjs/toolkit";

const isQuizStarted = localStorage.getItem("quiz_started")
  ? JSON.parse(localStorage.getItem("quiz_started")!)
  : false;

const initialAnswers = localStorage.getItem("answers")
  ? JSON.parse(localStorage.getItem("answers")!)
  : null;

type TState = {
  answers: Record<number, number | number[]> | null;
  isQuizStarted: boolean;
};

type TAnswerPayload = {
  questionId: number;
  answer: number[] | number;
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    answers: initialAnswers,
    isQuizStarted,
  } as TState,
  reducers: {
    answerQuestion: (
      state: TState,
      { payload }: { payload: TAnswerPayload }
    ) => {
      state.answers![payload.questionId] = payload.answer;
      localStorage.setItem("answers", JSON.stringify(state.answers));
    },
    initAnswers: (state, { payload }: { payload: TState["answers"] }) => {
      state.answers = payload;
      localStorage.setItem("answers", JSON.stringify(state.answers));
    },
    startQuiz: (state) => {
      localStorage.setItem("quiz_started", JSON.stringify(true));
      return { ...state, isQuizStarted: true };
    },
    finishQuiz: (state) => {
      localStorage.removeItem("quiz_started");
      localStorage.removeItem("answers");
      return { ...state, answers: null, isQuizStarted: false };
    },
  },
});

export const { answerQuestion, finishQuiz, startQuiz, initAnswers } =
  quizSlice.actions;
export const selectQuizStarted = ({ quiz }: { quiz: TState }) =>
  quiz.isQuizStarted;
export const selectAnswers = ({ quiz }: { quiz: TState }) => quiz.answers;
