import myColor from "../color";
import React from "react";
import {
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";

export default function Cart() {
  const data = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    // { id: 5 },
    // { id: 6 },
    // { id: 7 },
    // { id: 8 },
    // { id: 9 },
    // { id: 10 },
    // { id: 11 },
    // { id: 12 },
  ];

  const RenderItem = () => {
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <View style={styles.itemGroup}>
          <Text style={styles.itemQuantity}>1x</Text>
          <Text style={styles.itemText}>Cháo giò heo</Text>
        </View>
        <View style={styles.itemGroup}>
          <Text style={styles.itemText}>20000đ</Text>
          <TouchableOpacity>
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
        <TouchableOpacity style={styles.blockMess}>
          <Feather name="file-text" size={18} color={myColor.greyTxt} />
          <Text style={styles.blockText}>
            Bạn có muốn nhắn gì tới nhà hàng không ?
          </Text>
        </TouchableOpacity>
        <ItemDivider />
        <View style={styles.blockTotal}>
          <Text>Tạm tính (2 món)</Text>
          <Text>195000đ</Text>
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
            <Text style={styles.footerValue}>223000đ</Text>
          </View>
          <FooterDivider />
          <TouchableOpacity style={styles.footerTxtBox}>
            <Text style={styles.footerTxt}>Thêm mã giảm giá</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.footerBtn}>
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
      <Text style={styles.header}>Trang thanh toán</Text>
      <TouchableOpacity style={styles.iconBack}>
        <Ionicons name="arrow-back" size={24} color={myColor.black} />
      </TouchableOpacity>
      <FlatList
        data={data}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconBack: {
    position: "absolute",
    top: 8,
    left: 16,
  },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: myColor.white,
    marginBottom: 1,
    paddingVertical: 8,
  },
  blockContainer: {
    paddingVertical: 8,
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
