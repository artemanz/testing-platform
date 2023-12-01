import { usersApi } from "@/data/users.api";
import { TForm } from "./@types";

export const submit = async (formData: TForm) => {
  const res: any = await usersApi.login(formData);
  if (res.error) throw new Error(res.error);
  if (res.expired < Date.now()) throw new Error("Закончилось время сессии");
  else return res;
};
