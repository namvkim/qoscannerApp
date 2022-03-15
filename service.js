import {
  getDoc,
  addDoc,
  doc,
  collection,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";

export const getOneRestaurant = async (idRes, callback) => {
  const docRef = doc(db, "restaurant", idRes);
  const document = await getDoc(docRef);
  callback(document.data());
};

export const getAllCategory = async (idRes, callback) => {
  const collectionRef = collection(db, "restaurant", idRes, "category");
  const results = await getDocs(collectionRef);
  const documents = [];
  results.forEach((document) => {
    documents.push({ ...document.data(), id: document.id });
  });
  callback(documents);
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

export const postOneOrder = async (idRes, order) => {
  await addDoc(collection(db, "restaurant", idRes, "order"), order);
};

export const postOneMessage = async (idRes, mess) => {
  await addDoc(collection(db, "restaurant", idRes, "message"), mess);
};
