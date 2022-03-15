import { createContext, useState } from "react";

export const ResContext = createContext();

export function ResContextProvider({ children }) {
  const [data, setData] = useState();
  return (
    <ResContext.Provider value={{ data: data, setData: setData }}>
      {children}
    </ResContext.Provider>
  );
}
