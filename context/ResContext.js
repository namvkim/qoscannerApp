import { createContext, useState } from "react";

export const ResContext = createContext();

export function ResContextProvider({ children }) {
  const [data, setData] = useState({
    idRestaurant: "JfxhZ1Tdn8q0JLZm1JvL",
    table: "Bàn số 1",
  });
  return (
    <ResContext.Provider value={{ data: data, setData: setData }}>
      {children}
    </ResContext.Provider>
  );
}
