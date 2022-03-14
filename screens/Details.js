import myColor from "../color";
import React, { useState, useContext, useEffect } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { OrderContext } from "../context/OrderContext";

export default function Details(props) {
  const product = props.route.params;
  const navigation = useNavigation();
  const orderContext = useContext(OrderContext);

  const [quantity, setQuantity] = useState(1);
  const total = quantity * product.price.toString();

  const onSubmit = async () => {
    const index = orderContext.data.map((e) => e.id).indexOf(product.id);
    if (index === -1) {
      orderContext.setData([
        ...orderContext.data,
        { ...product, quantity: quantity },
      ]);
    } else {
      orderContext.data[index].quantity = quantity;
      orderContext.setData([...orderContext.data]);
    }
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Image style={styles.image} source={{ uri: product.image }} />
      <TouchableOpacity
        style={styles.btnCloseBox}
        onPress={() => navigation.navigate("Home")}
      >
        <MaterialIcons name="close" size={24} color={myColor.white} />
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.nameBox}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>
            {product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
          </Text>
        </View>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.quantityGroup}>
          <TouchableOpacity
            onPress={() => setQuantity(quantity - 1)}
            disabled={quantity <= 1}
          >
            <Feather
              name="minus-circle"
              size={42}
              color={quantity === 1 ? myColor.greyTxt : myColor.orange}
              style={styles.btnQuantity}
            />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
            <Feather
              name="plus-circle"
              size={42}
              color={myColor.orange}
              style={styles.btnQuantity}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.btnSubmit, styles.btnShadow]}
          onPress={() => onSubmit()}
        >
          <Text style={[styles.btnSubmitTxt, { flex: 1 }]}>{quantity} Món</Text>
          <Text style={styles.btnSubmitTxt}>Thêm</Text>
          <Text style={[styles.btnSubmitTxt, { flex: 1, textAlign: "right" }]}>
            {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
          </Text>
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
    height: 230,
  },
  btnCloseBox: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 20,
    position: "absolute",
    top: 8,
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
    color: myColor.greyTxt,
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
    backgroundColor: myColor.orange,
  },
  btnSubmitTxt: {
    fontSize: 16,
    fontWeight: "bold",
    color: myColor.white,
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
