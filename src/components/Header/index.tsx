import { Link } from "react-router-dom";
import logo from "@/assets/bconsult-logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUserInfo } from "@/store/slices/auth";

const Header = () => {
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  return (
    <header>
      <div className="container flex items-center justify-between py-4">
        <Link to="/">
          <img className="w-36 lg:w-60" src={logo} alt="Bconsult" />
        </Link>

        <div className="flex items-center gap-5">
          <div className="flex-col hidden lg:flex">
            <small>пн-пт: с 10:00-21:00 сб,вс: выходной</small>
            <a
              className="text-2xl transition-colors hover:text-primary"
              href="tel:+74994040905"
            >
              +7 (499) 404-09-05
            </a>
          </div>

          {user ? (
            <button
              onClick={() => dispatch(logout())}
              className="px-8 py-2 button-secondary"
            >
              Выйти
            </button>
          ) : (
            <Link to={"/login"} className="px-8 py-2 button-secondary">
              Войти
            </Link>
          )}
        </div>
      </div>

      {/* <div
    className="h-[15rem] text-white bg-no-repeat bg-cover"
    style={{ backgroundImage: `url(${bg})` }}
  >
    <div className="container flex flex-col items-start h-full py-8 lg:py-12">
      <a
        className="text-lg transition-colors hover:text-primary"
        href="https://bconsult.ru/"
      >
        ← на сайт бконсалт
      </a>
      <h1 className="mt-auto text-2xl lg:text-4xl">
        «БИЗНЕС КОНСАЛТ» — КОМПЛЕКС УСЛУГ ДЛЯ БИЗНЕСА
      </h1>
    </div>
  </div> */}
    </header>
  );
};

export { Header };
