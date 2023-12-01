import s from "./style.module.scss"

const Loader = () => {
  return <div className="fixed inset-0 grid bg-base place-content-center">
    <div className={s.loader}></div>
  </div>;
};

export { Loader };
