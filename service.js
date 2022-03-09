import { doc, query, collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export const getAllProduct = (callback) => {
  onSnapshot(
    collection(db, "restaurant", "JfxhZ1Tdn8q0JLZm1JvL", "menu"),
    (results) => {
      const docs = [];
      results.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      callback(docs);
    }
  );
};
