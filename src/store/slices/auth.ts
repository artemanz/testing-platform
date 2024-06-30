import { CoursesID } from "@/@types/course.type";
import { TUser } from "@/@types/user.type";
import { usersApi } from "@/data/users.api";
import { createSlice } from "@reduxjs/toolkit";

const userInfo = localStorage.getItem("user");

type TState = { userInfo: TUser | null };

const initialState: TState = {
  userInfo: userInfo ? JSON.parse(userInfo) : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: { payload: TUser | null }) => {
      state.userInfo = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    updateAttempts: (state, { payload }: { payload: CoursesID }) => {
      const test = state.userInfo?.courses.find((t) => t.ref === payload);

      if (test) test.attempts--;

      localStorage.setItem("user", JSON.stringify(state.userInfo));
      usersApi.updateUser(state.userInfo!);
    },
    updateResults: (
      state,
      { payload }: { payload: { courseId: string; result: string } }
    ) => {
      const test = state.userInfo?.courses.find(
        (t) => t.ref === payload.courseId
      );

      if (test) test.results.push(payload.result);

      localStorage.setItem("user", JSON.stringify(state.userInfo));
      usersApi.updateUser(state.userInfo!);
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout, updateResults, updateAttempts } =
  authSlice.actions;
export const selectUserInfo = ({ auth }: { auth: TState }) => auth.userInfo;
