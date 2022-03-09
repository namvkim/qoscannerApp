import { doc, query, collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export const getAllProduct = (idRes, callback) => {
  onSnapshot(collection(db, "restaurant", idRes, "menu"), (results) => {
    const docs = [];
    results.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    callback(docs);
  });
};
