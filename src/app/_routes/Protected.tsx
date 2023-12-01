import { logout, selectUserInfo } from "@/store/slices/auth";
import { PropsWithChildren, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children }: PropsWithChildren) {
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.expired < Date.now()) {
      dispatch(logout());
      return navigate("/login");
    }
  }, [user]);
  if (!user) return null;
  return <>{children}</>;
}

export { Protected };
