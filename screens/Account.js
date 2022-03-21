import myColor from "../color";
import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Account() {
  const navigation = useNavigation();

  const Item = ({ title, path }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(path)}
        style={styles.itemContainer}
      >
        <Text>{title}</Text>
        <Ionicons name="chevron-forward" size={18} color={myColor.greyTxt} />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tài khoản của bạn</Text>
      <TouchableOpacity
        style={styles.iconBack}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="arrow-back" size={24} color={myColor.black} />
      </TouchableOpacity>
      <Item title="Quét mã QR" path="Scan" />
      <Item title="Mã giảm giá" path="MyTabs" />
      <Item title="Hỗ trợ" path="MyTabs" />
      <Item title="Cài đặt" path="MyTabs" />
      <Item title="Đăng xuất" path="MyTabs" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: myColor.greyBg,
  },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: myColor.white,
    marginBottom: 8,
    paddingVertical: 8,
    width: "100%",
  },
  iconBack: {
    position: "absolute",
    top: 8,
    left: 16,
  },
  itemContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 1,
    backgroundColor: myColor.white,
  },
});
