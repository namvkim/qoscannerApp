import myColor from "../color";
import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function Note(props) {
  const navigation = useNavigation();
  const [note, setNote] = useState(props.route.params);

  const navigateToCart = () => {
    navigation.navigate("Cart", note);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text style={styles.header}>Lưu ý tới nhà hàng</Text>
      <TouchableOpacity style={styles.close} onPress={() => navigateToCart()}>
        <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>
      <TextInput
        style={styles.textBox}
        autoFocus
        placeholder="Ví dụ: không hành lá,..."
        multiline
        numberOfLines={5}
        onChangeText={setNote}
        value={note}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigateToCart()}>
        <Text style={styles.buttonTxt}>Xác nhận</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: "center",
    backgroundColor: myColor.white,
  },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 1,
    paddingVertical: 8,
  },
  close: {
    position: "absolute",
    top: 8,
    left: 16,
  },
  textBox: {
    width: "100%",
  },
  button: {
    position: "absolute",
    bottom: 24,
    width: "100%",
    paddingVertical: 12,
    backgroundColor: myColor.orange,
    borderRadius: 4,
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
