import Color from "../color";
import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";

export default function Details() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Image
        style={styles.image}
        source={{
          uri: "https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1551438228969-H0FPV1FO3W5B0QL328AS/chup-anh-thuc-an-1.jpg",
        }}
      />
      <TouchableOpacity style={styles.btnCloseBox}>
        <MaterialIcons name="close" size={24} color={Color.white} />
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.nameBox}>
          <Text style={styles.name}>Details screen</Text>
          <Text style={styles.price}>Details screen</Text>
        </View>
        <Text style={styles.description}>Details screen</Text>
        <View style={styles.quantityGroup}>
          <TouchableOpacity>
            <Feather
              name="minus-circle"
              size={42}
              color={true ? Color.greyTxt : Color.orange}
              style={styles.btnQuantity}
            />
          </TouchableOpacity>
          <Text style={styles.quantity}>1</Text>
          <TouchableOpacity>
            <Feather
              name="plus-circle"
              size={42}
              color={Color.orange}
              style={styles.btnQuantity}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.btnSubmit, styles.btnShadow]}>
          <Text style={styles.btnSubmitTxt}>1 Món</Text>
          <Text style={styles.btnSubmitTxt}>Thêm</Text>
          <Text style={styles.btnSubmitTxt}>25.000đ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
  },
  btnCloseBox: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 20,
    position: "absolute",
    top: 16,
    left: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  nameBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  name: {
    fontWeight: "bold",
    fontSize: 24,
  },
  price: {
    fontSize: 16,
  },
  description: {
    width: "100%",
    color: Color.greyTxt,
  },
  quantityGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 60,
  },
  quantity: {
    fontWeight: "bold",
    marginHorizontal: 16,
    fontSize: 18,
  },
  btnQuantity: {
    opacity: 0.4,
  },
  btnSubmit: {
    position: "absolute",
    width: "100%",
    bottom: 36,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Color.orange,
  },
  btnSubmitTxt: {
    fontSize: 16,
    fontWeight: "bold",
    color: Color.white,
  },
  btnShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1.22,

    elevation: 2,
  },
});
