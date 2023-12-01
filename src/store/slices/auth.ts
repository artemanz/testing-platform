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
    updateResults: (
      state,
      { payload }: { payload: { courseId: string; result: string } }
    ) => {
      const test = state.userInfo?.tests.find(
        (t) => t.ref === payload.courseId
      );

      if (test) {
        test.attempts--;
        test.results.push(payload.result);
      }
      localStorage.setItem("user", JSON.stringify(state.userInfo));
      usersApi.updateUser(state.userInfo!);
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logout, updateResults } = authSlice.actions;
export const selectUserInfo = ({ auth }: { auth: TState }) => auth.userInfo;
