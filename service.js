import { doc, getDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

const citiesRef = collection(db, "restaurant");
const getAllMenu = (res) => {
  onSnapshot(doc(db, "restaurant", "SF"), (doc) => {
    console.log("Current data: ", doc.data());
  });
};

export { citiesRef };
