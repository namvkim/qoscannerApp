import React, { useContext } from "react";
import { Text } from "react-native";
import DataContext from "../context";

export default function Message() {
  const data = useContext(DataContext);

  console.log(data);
  return (
    <>
      <Text>message screen</Text>
    </>
  );
}
