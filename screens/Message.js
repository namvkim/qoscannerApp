import myColor from "../color";
import React, { useState, useContext } from "react";
import {
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { postOneMessage } from "../service";
import { ResContext } from "../context/ResContext";

import Empty from "../components/Empty";

export default function Message() {
  const navigation = useNavigation();
  const resContext = useContext(ResContext);
  const [mess, setMess] = useState("");

  const data = [
    {
      id: 1,
      txt: "thêm đá",
    },
    {
      id: 2,
      txt: "thêm ly",
    },
    {
      id: 3,
      txt: "thêm nước mắm",
    },
    {
      id: 4,
      txt: "thêm đũa",
    },
    {
      id: 5,
      txt: "thêm thìa",
    },
    {
      id: 6,
      txt: "thêm giấy lau",
    },
  ];

  const sendMess = () => {
    postOneMessage(resContext.data.idRestaurant, {
      content: mess,
      status: true,
      table: resContext.data.table,
    }).then(() => {
      setMess("");
    });
    // navigation.navigate("Home");
  };

  const SubjectBtn = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.sjBtn}
        onPress={() => setMess(mess + item.txt + ", ")}
      >
        <Text style={styles.sjTxt}>{item.txt}</Text>
      </TouchableOpacity>
    );
  };

  return !resContext.data ? (
    <Empty />
  ) : (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text style={styles.header}>Yêu cầu tới nhà hàng</Text>
      <TouchableOpacity style={styles.close}>
        <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>
      <TextInput
        style={styles.textBox}
        placeholder="Ví dụ: thêm đá,..."
        multiline
        numberOfLines={5}
        onChangeText={setMess}
        value={mess}
      />
      <FlatList
        data={data}
        renderItem={SubjectBtn}
        keyExtractor={(item) => item.id}
        style={styles.sjBox}
        numColumns={2}
      />
      <TouchableOpacity style={styles.button} onPress={() => sendMess()}>
        <Text style={styles.buttonTxt}>Gửi yêu cầu</Text>
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
    bottom: 0,
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
  sjBox: {
    width: "100%",
  },
  sjBtn: {
    borderColor: myColor.orange,
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 4,
    marginRight: 4,
  },
  sjTxt: {
    paddingVertical: 12,
    paddingHorizontal: 36,
    textAlign: "center",
  },
});
