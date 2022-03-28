import myColor from "../color";
import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Loading from "../components/Loading";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import { OrderContext } from "../context/OrderContext";
import { ResContext } from "../context/ResContext";
import { postOneOrder } from "../service";

export default function Cart(props) {
  const navigation = useNavigation();
  const orderContext = useContext(OrderContext);
  const resContext = useContext(ResContext);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateToNote = () => {
    navigation.navigate("Note", note);
  };

  useEffect(() => {
    setNote(props.route.params);
  }, [props.route.params]);

  const totalPrice = orderContext.data.reduce(
    (total, currentValue) =>
      (total = total + currentValue.quantity * currentValue.price),
    0
  );
  const totalProduct = orderContext.data.reduce(
    (total, currentValue) => (total = total + currentValue.quantity),
    0
  );

  const deleteItem = (product) => {
    const index = orderContext.data.map((e) => e.id).indexOf(product.id);
    orderContext.data.splice(index, 1);
    orderContext.setData([...orderContext.data]);
  };

  const updateItem = (item) => {
    navigation.navigate("Details", item);
  };

  const sendOrder = () => {
    if (orderContext.data.length > 0) {
      setLoading(true);
      const arr = orderContext.data.map((el) => {
        return {
          id: el.id,
          name: el.name,
          price: el.price,
          quantity: el.quantity,
        };
      });
      const time = new Date();
      postOneOrder(resContext.data.idRestaurant, {
        data: arr,
        table: resContext.data.table,
        status: true,
        note: note ? note : "",
        createAt: time,
      }).then(() => {
        orderContext.setData([]);
        setNote("");
        setLoading(false);
        navigation.navigate("Success", {
          title: "Gửi đơn hàng thành công !!!",
        });
      });
    } else {
      navigation.navigate("Warning", {
        title: "Vui lòng chọn món !!!",
      });
    }
  };

  const RenderItem = ({ item }) => {
    const itemTotal = item.quantity * item.price;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => updateItem(item)}
      >
        <View style={styles.itemGroup}>
          <Text style={styles.itemQuantity}>{item.quantity}x</Text>
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
        <View style={styles.itemGroup}>
          <Text>
            {itemTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
          </Text>
          <TouchableOpacity onPress={() => deleteItem(item)}>
            <AntDesign
              style={styles.itemIcon}
              name="closecircle"
              size={18}
              color={myColor.greyTxt}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const ItemDivider = () => {
    return <View style={styles.itemDivider} />;
  };

  const RenderBlock = () => {
    return (
      <View style={styles.blockBox}>
        <ItemDivider />
        <TouchableOpacity
          style={styles.blockMess}
          onPress={() => navigateToNote()}
        >
          <Feather name="file-text" size={18} color={myColor.greyTxt} />
          {note ? (
            <Text style={{ marginLeft: 8 }}>{note}</Text>
          ) : (
            <Text style={styles.blockText}>
              Bạn có muốn nhắn gì tới nhà hàng không ?
            </Text>
          )}
        </TouchableOpacity>
        <ItemDivider />
        <View style={styles.blockTotal}>
          <Text>
            Tạm tính (
            {totalProduct.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} món)
          </Text>
          <Text>
            {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
          </Text>
        </View>
      </View>
    );
  };

  const RenderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        <View style={styles.footerContent}>
          <View style={styles.footerTotal}>
            <Text style={styles.footerTitle}>Tổng cộng</Text>
            <Text style={styles.footerValue}>
              {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
            </Text>
          </View>
          <FooterDivider />
          <TouchableOpacity style={styles.footerTxtBox}>
            <Text style={styles.footerTxt}>Thêm mã giảm giá</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.footerBtn} onPress={() => sendOrder()}>
          <Text style={styles.footerBtnTxt}>Đặt hàng</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const FooterDivider = () => {
    return <View style={styles.footerDivider} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text style={styles.header}>Trang giỏ hàng</Text>
      <TouchableOpacity
        style={styles.iconBack}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="arrow-back" size={24} color={myColor.black} />
      </TouchableOpacity>
      <FlatList
        data={orderContext.data}
        renderItem={RenderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemDivider}
        ListHeaderComponent={
          <Text style={styles.blockTitle}>Đơn hàng của bạn</Text>
        }
        ListFooterComponent={RenderBlock}
        style={styles.blockContainer}
      />
      <RenderFooter />
      {loading && <Loading />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: myColor.white,
    marginBottom: 1,
    paddingVertical: 8,
  },
  iconBack: {
    position: "absolute",
    top: 8,
    left: 16,
  },
  blockContainer: {
    paddingTop: 8,
  },
  blockBox: {
    paddingVertical: 18,
    backgroundColor: myColor.white,
    marginBottom: 64,
  },
  blockTitle: {
    color: myColor.greyTxt,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: myColor.white,
  },
  blockMess: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  blockText: {
    color: myColor.greyTxt,
    marginLeft: 8,
  },
  blockTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: myColor.white,
  },
  itemGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemQuantity: {
    color: myColor.greyTxt,
    marginRight: 8,
  },
  itemText: {
    fontSize: 16,
  },
  itemIcon: {
    marginLeft: 8,
    opacity: 0.3,
  },
  itemDivider: {
    height: 1,
    width: "100%",
    backgroundColor: myColor.greyBg,
  },
  footerContainer: {
    paddingHorizontal: 16,
    backgroundColor: myColor.white,
  },
  footerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  footerTotal: {
    width: "50%",
  },
  footerTitle: {
    color: myColor.greyTxt,
  },
  footerValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  footerTxtBox: {
    width: "50%",
  },
  footerTxt: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: myColor.orange,
  },
  footerBtn: {
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
  footerBtnTxt: {
    fontSize: 16,
    fontWeight: "bold",
    color: myColor.white,
  },
  footerDivider: {
    height: "100%",
    width: 1,
    backgroundColor: myColor.greyBg,
  },
});
