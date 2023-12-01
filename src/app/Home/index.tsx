import { useDispatch, useSelector } from "react-redux";
import { logout, selectUserInfo, setCredentials } from "@/store/slices/auth";
import { PropsWithChildren, useEffect } from "react";
import { Admin } from "./Admin";
import { User } from "./User";
import { usersApi } from "@/data/users.api";

const Home = () => {
  const user = useSelector(selectUserInfo)!;
  const dispatch = useDispatch();

  useEffect(() => {
    usersApi.getUser(user.login).then((data) => {
      dispatch(setCredentials(data));
    });
  }, []);

  const Wrapper = ({ children }: PropsWithChildren) => (
    <main className="container h-screen py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-secondary">Личный кабинет</h1>
        <button
          onClick={() => dispatch(logout())}
          className="px-8 py-2 button-secondary"
        >
          Выйти
        </button>
      </div>
      {children}
    </main>
  );

  if (user.role === "admin")
    return (
      <Wrapper>
        <Admin />
      </Wrapper>
    );

  return (
    <Wrapper>
      <User />
    </Wrapper>
  );
};

export { Home };
