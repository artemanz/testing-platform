import { useSelector } from "react-redux";
import { selectUserInfo } from "@/store/slices/auth";
import { Admin } from "./Admin";
import { User } from "./User";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import bg from "@/assets/bg.jpg";

const Home = () => {
  const user = useSelector(selectUserInfo)!;

  if (user.role === "admin")
    return (
      <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
        <Header />
        <main className="py-8">
          <div className="container">
            <Admin />
          </div>
        </main>

        <Footer />
      </div>
    );

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <main>
        <div
          className="h-[15rem] text-white bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="container flex items-center h-full">
            <h1 className="text-4xl">Личный кабинет</h1>
          </div>
        </div>

        <div className="container py-8">
          <User />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export { Home };
