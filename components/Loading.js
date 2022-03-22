import Color from "../color";
import React from "react";
import { StyleSheet } from "react-native";
import { Text, SafeAreaView, StatusBar, Image } from "react-native";

export default function Loading() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Image style={styles.logo} source={require("../assets/icon.png")} />
      <Text style={styles.text}>Vui lòng đợi một xíu...</Text>
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
    width: 24,
    height: 24,
    marginBottom: 8,
  },
  text: {
    color: Color.greyTxt,
  },
});
