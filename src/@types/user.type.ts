import { Timestamp } from "firebase/firestore";

export type TUser = {
  id: string;
  login: string;
  name: string;
  password: string;
  role: "user" | "admin";
  expired: number;
  tests: {
    attempts: number;
    ref: string;
    name: string
    results: string[];
  }[];
};

export type TFirebaseUser = {
  [K in Exclude<keyof TUser, "id">]: K extends "expired" ? Timestamp : TUser[K];
};
