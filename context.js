import { createContext, useState } from "react";

const DataContext = createContext();

export default function ContextProvider({ children }) {
  const [data, setData] = useState();
  return (
    <DataContext.Provider value={{ data: data, setData: setData }}>
      {children}
    </DataContext.Provider>
  );
}

export { DataContext };
