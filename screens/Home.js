import myColor from "../color";
import { querySnapshot} from '../service';
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  View,
  FlatList,
  Animated,
  TouchableOpacity,
} from "react-native";
import {
  FontAwesome,
  SimpleLineIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  const data = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];
  const type = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const scrollY = useRef(new Animated.Value(0)).current;
  const opacityMenu = scrollY.interpolate({
    inputRange: [0, 70],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const opacityImage = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const bannerAnt = {
    transform: [
      {
        scale: scrollY.interpolate({
          inputRange: [-200, 0],
          outputRange: [2, 1],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  console.log(querySnapshot);
  useEffect(() => {}, []);

  const RenderItem = () => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>Gà hầm hạt sen - bbq fadsfs</Text>
          <Text style={styles.itemSub}>sup gà</Text>
          <Text style={styles.itemPrice}>50.000đ</Text>
        </View>
        <Image
          style={styles.itemImg}
          source={{
            uri: "https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1551438228969-H0FPV1FO3W5B0QL328AS/chup-anh-thuc-an-1.jpg",
          }}
        />
      </View>
    );
  };

  const ItemDivider = () => {
    return <View style={styles.itemDivider} />;
  };

  const RenderBlock = () => {
    return (
      <View style={styles.blockContainer}>
        <Text style={styles.blockTitle}>Điểm tâm</Text>
        <FlatList
          data={data}
          renderItem={RenderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ItemDivider}
        />
      </View>
    );
  };

  const BlockDivider = () => {
    return <View style={styles.blockDivider} />;
  };

  const RenderHeader = () => {
    return (
      <View style={styles.headerBox}>
        <View style={styles.headerContent}>
          <Image
            style={styles.headerLogo}
            source={require("../assets/logo.png")}
          />
          <Text style={styles.headerSub}>Đối tác của QO Scanner</Text>
          <Text style={styles.headerTitle}>SUNNY’S BBQ</Text>
          <Text style={styles.headerAddress}>
            101B - Lê Hữu Trác - Sơn Trà - Đà Nẵng
          </Text>
        </View>
        <View style={styles.headerQuantity}>
          <FontAwesome
            name="star"
            size={20}
            color="#ECA64E"
            style={styles.headerStar}
          />
          <Text style={styles.headerQuantityText}> 3.9 (300+)</Text>
          <SimpleLineIcons
            name="bag"
            size={20}
            color="#ECA64E"
            style={styles.headerBag}
          />
          <Text style={styles.headerQuantityText}> 999+</Text>
          <Text style={styles.tableName}>Tên bàn: 32</Text>
        </View>
        <BlockDivider />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <LinearGradient
        colors={["rgba(0,0,0,0.8)", "transparent"]}
        end={{ x: 0, y: 0.3 }}
        style={[styles.imageLn]}
      >
        <Animated.Image
          style={[styles.image, { opacity: opacityImage }]}
          source={{
            uri: "https://www.kiotviet.vn/wp-content/uploads/2014/06/bi-quyet-xay-dung-hinh-anh-cua-hang-dien-thoai-moi-e1447237732926.jpg",
          }}
        />
      </LinearGradient>
      <View style={[styles.menu, styles.menuPosition]}>
        <Ionicons name="arrow-back" size={24} color={myColor.white} />
        <View style={styles.menuRight}>
          {false ? (
            <MaterialCommunityIcons
              name="heart"
              size={24}
              color={myColor.orange}
            />
          ) : (
            <MaterialCommunityIcons
              name="heart-outline"
              size={24}
              color={myColor.white}
            />
          )}
          <Ionicons
            name="search"
            size={24}
            color={myColor.white}
            style={styles.menuSearch}
          />
        </View>
      </View>
      <Animated.View style={[styles.menuScroll, { opacity: opacityMenu }]}>
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => console.log("arrow-back")}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.menuTitle} ellipsizeMode="tail" numberOfLines={1}>
            SUNNY’S BBQ
          </Text>
          <View style={styles.menuRight}>
            <TouchableOpacity onPress={() => console.log("heart")}>
              {false ? (
                <MaterialCommunityIcons
                  name="heart"
                  size={24}
                  color={myColor.orange}
                />
              ) : (
                <MaterialCommunityIcons
                  name="heart-outline"
                  size={24}
                  color="black"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("search")}>
              <Ionicons
                name="search"
                size={24}
                color="black"
                style={styles.menuSearch}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.menuTab}>
          <TouchableOpacity onPress={() => console.log("block 1")}>
            <Link to={{ screen: "#aa" }}>
              <Text>block 1</Text>
            </Link>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("block 2")}>
            <Text>block 2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("block 3")}>
            <Text>block 3</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.FlatList
        style={styles.content}
        contentContainerStyle={styles.contentStyles}
        data={type}
        renderItem={RenderBlock}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={BlockDivider}
        ListHeaderComponent={RenderHeader}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuScroll: {
    zIndex: 100,
    width: "100%",
    backgroundColor: myColor.white,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,

    elevation: 15,
  },
  menuTab: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexDirection: "row",
  },
  menu: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuPosition: {
    position: "absolute",
  },
  menuTitle: {
    marginLeft: 40,
    width: 180,
    fontWeight: "bold",
    textAlign: "center",
  },
  menuRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuSearch: {
    marginLeft: 16,
  },
  imageLn: {
    width: "100%",
    height: 200,
    position: "absolute",
    zIndex: 0,
  },
  image: {
    width: "100%",
    height: 200,
    zIndex: -1,
  },
  headerBox: {
    height: 140,
    alignItems: "center",
    backgroundColor: myColor.white,
    justifyContent: "flex-end",
  },
  headerContent: {
    flex: 1,
    width: "80%",
    borderRadius: 12,
    paddingVertical: 12,
    position: "absolute",
    top: -50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: myColor.white,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  headerLogo: {
    width: 20,
    height: 20,
  },
  headerSub: {
    fontSize: 14,
    fontWeight: "500",
    color: myColor.orange,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerAddress: {
    fontWeight: "500",
    color: myColor.greyTxt,
  },
  headerQuantity: {
    width: "100%",
    flexDirection: "row",
    paddingLeft: 12,
    paddingVertical: 24,
    alignItems: "center",
  },
  headerStar: {
    paddingHorizontal: 5,
  },
  headerBag: {
    marginLeft: 12,
  },
  headerQuantityText: {
    color: myColor.greyTxt,
  },
  tableName: {
    marginLeft: 12,
  },
  content: {
    flex: 1,
    zIndex: 10,
  },
  contentStyles: {
    paddingTop: 130,
  },
  blockContainer: {
    backgroundColor: myColor.white,
  },
  blockTitle: {
    fontSize: 18,
    padding: 12,
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  itemImg: {
    height: 80,
    width: 80,
    borderRadius: 8,
    marginLeft: 12,
  },
  itemContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    width: "100%",
  },
  itemSub: {
    fontWeight: "500",
    color: myColor.greyTxt,
  },
  itemPrice: {
    // fontSize: 16,
  },
  itemDivider: {
    height: 1,
    width: "100%",
    backgroundColor: myColor.greyBg,
  },
  blockDivider: {
    height: 8,
    width: "100%",
    backgroundColor: myColor.greyBg,
  },
});
