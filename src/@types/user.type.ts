import { Timestamp } from "firebase/firestore";
import { CoursesID } from "./course.type";

export type TUser = {
  id: string;
  login: string;
  name: string;
  password: string;
  role: "user" | "admin";
  created: number;
  expired: number;
  courses: {
    ref: CoursesID;
    attempts: number;
    results: string[];
  }[];
};

export type TFirebaseUser = {
  [K in Exclude<keyof TUser, "id">]: K extends "expired" | "created"
    ? Timestamp
    : TUser[K];
};
