import { createContext, useState } from "react";

export const DataContext = createContext();

export function ContextProvider({ children }) {
  const [data, setData] = useState({
    idRestaurant: "JfxhZ1Tdn8q0JLZm1JvL",
    table: "Bàn số 1",
  });
  return (
    <DataContext.Provider value={{ data: data, setData: setData }}>
      {children}
    </DataContext.Provider>
  );
}
