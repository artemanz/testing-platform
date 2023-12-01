import { IoMdClose } from "react-icons/io";
type Props = {
  result: string;
  close(): void;
};

const Result = ({ result, close }: Props) => {
  return (
    <div className="fixed inset-0 grid place-content-center">
      <div onClick={close} className="fixed inset-0 bg-black/80" />

      <div className="relative px-12 py-12 text-2xl text-center bg-base">
        <div>
          <p>Ваш результат</p>
          <p className="mt-4 text-4xl"> {result}</p>
        </div>
        <button className="absolute top-2 right-2" onClick={close}>
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};

export { Result };
