import Color from "../color";
import React from "react";
import { StyleSheet } from "react-native";
import { Text, SafeAreaView, StatusBar, Image } from "react-native";

export default function Loading() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Image style={styles.logo} source={require("../assets/loading.gif")} />
      <Text style={styles.text}>Đang tải...</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 500,
    backgroundColor: Color.white,
  },
  logo: {
    width: 80,
    height: 80,
  },
  text: {
    color: Color.greyTxt,
  },
});
