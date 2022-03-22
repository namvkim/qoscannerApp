import myColor from "../color";
import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Warning(props) {
  const navigation = useNavigation();
  const title = props.route.params.title;

  return (
    <View style={styles.container}>
      <AntDesign name="warning" size={72} color={myColor.warning} />
      <Text style={styles.text}>{title}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="chevron-back" size={18} color={myColor.white} />
        <Text style={styles.buttonTxt}>Trang chủ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: myColor.white,
  },
  text: {
    fontSize: 18,
    marginTop: 12,
  },
  button: {
    position: "absolute",
    bottom: 60,
    padding: 12,
    backgroundColor: myColor.orange,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1.22,

    elevation: 2,
  },
  buttonTxt: {
    fontSize: 16,
    fontWeight: "bold",
    color: myColor.white,
  },
});
