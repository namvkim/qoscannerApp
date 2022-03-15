import myColor from "../color";
import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default function Setting() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Setting screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColor.greyBg,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
  },
});
