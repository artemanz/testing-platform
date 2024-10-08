import { TFirebaseUser, TUser } from "@/@types/user.type";
import {
  getDocs,
  query,
  collection,
  where,
  Timestamp,
  deleteDoc,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "./db";

class API {
  async createUser(login: string, password: string, name: string) {
    try {
      let newUser: TUser | TFirebaseUser | null = await this.getUser(login);

      if (newUser) throw new Error("Пользователь уже существует");

      const currentDate = new Date();
      const expiredDate = new Date();
      expiredDate.setDate(expiredDate.getDate() + 14);

      newUser = {
        login,
        name,
        password,
        created: Timestamp.fromDate(currentDate),
        expired: Timestamp.fromDate(expiredDate),
        role: "user",
        courses: [],
      };

      // if (tests.includes("upravlenie-zakupkami"))
      //   newUser.tests.push({
      //     attempts: 3,
      //     name: "Управление закупками",
      //     ref: "upravlenie-zakupkami",
      //     results: [],
      //   });

      // if (tests.includes("antiterror-bezopasnost"))
      //   newUser.tests.push({
      //     attempts: 3,
      //     name: "Антитеррористическая безопасность",
      //     ref: "antiterror-bezopasnost",
      //     results: [],
      //   });

      const docRef = await addDoc(collection(db, "users"), newUser);

      return {
        id: docRef.id,
        ...newUser,
        expired: expiredDate.getTime(),
        created: currentDate.getTime(),
      };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async deleteUser(login: string) {
    try {
      const snap = await getDocs(
        query(collection(db, "users"), where("login", "==", login))
      );

      if (snap.empty) return false;

      const doc = snap.docs[0].ref;
      await deleteDoc(doc);
      return true;
    } catch (error) {
      return null;
    }
  }

  async login({ login, password }: { login: string; password: string }) {
    try {
      const snap = await getDocs(
        query(collection(db, "users"), where("login", "==", login))
      );

      if (snap.empty) throw new Error("Неверный логин");
      else {
        const [s] = snap.docs;
        const data = s.data() as TFirebaseUser;

        if (password !== data.password) throw new Error("Неверный пароль");

        return {
          id: s.id,
          ...data,
          expired: data.expired.toDate().getTime(),
          created: data.created.toDate().getTime(),
        };
      }
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async getUser(login: string) {
    try {
      const snap = await getDocs(
        query(collection(db, "users"), where("login", "==", login))
      );

      if (snap.empty) throw new Error();

      const [s] = snap.docs;
      const data = s.data() as TFirebaseUser;
      return {
        ...data,
        id: s.id,
        expired: data.expired.toDate().getTime(),
        created: data.created.toDate().getTime(),
      };
    } catch (error) {
      return null;
    }
  }

  async getUsers() {
    try {
      const snap = await getDocs(collection(db, "users"));

      if (snap.empty) return [];
      return snap.docs
        .map((s) => {
          const data = s.data() as TFirebaseUser;
          return {
            ...data,
            id: s.id,
            expired: data.expired.toDate().getTime(),
            created: data.created.toDate().getTime(),
          };
        })
        .reverse();
    } catch (error) {
      return null;
    }
  }

  async updateUser(user: TUser) {
    try {
      const updatedUser = { ...user };
      await setDoc(doc(db, "users", updatedUser.id), {
        ...updatedUser,
        expired: Timestamp.fromDate(new Date(updatedUser.expired)),
        created: Timestamp.fromDate(new Date(updatedUser.created)),
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const usersApi = new API();
