import { usersApi } from "@/data/users.api";
import { selectUserInfo, setCredentials } from "@/store/slices/auth";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const RootProvider = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      if (user) {
        await usersApi.getUser(user.login).then((data) => {
          dispatch(setCredentials(data));
        });
      } else navigate("/login");
      setLoading(false);
    })();
  }, []);

  if (loading)
    return (
      <main className="grid h-screen place-content-center">
        <div className="loading loading-lg text-primary"></div>
      </main>
    );
  else return <Outlet />;
};

export { RootProvider };
