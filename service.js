import {
  getDoc,
  doc,
  query,
  collection,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";

export const getOneRestaurant = async (idRes) => {
  const docRef = doc(db, "restaurant", idRes);
  const document = await getDoc(docRef);
  return document.data();
};

export const getAllCategory = async (idRes) => {
  const collectionRef = collection(db, "restaurant", idRes, "category");
  const results = await getDocs(collectionRef);
  const documents = [];
  results.forEach((document) => {
    documents.push({ ...document.data(), id: document.id });
  });
  return documents;
};

export const getAllProduct = (idRes, callback) => {
  onSnapshot(collection(db, "restaurant", idRes, "menu"), (results) => {
    const documents = [];
    results.forEach((document) => {
      documents.push({ ...document.data(), id: document.id });
    });
    callback(documents);
  });
};
