import { createContext, useState } from "react";

export const OrderContext = createContext();

export function OrderContextProvider({ children }) {
  const [data, setData] = useState([]);
  return (
    <OrderContext.Provider value={{ data: data, setData: setData }}>
      {children}
    </OrderContext.Provider>
  );
}
