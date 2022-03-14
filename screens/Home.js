import myColor from "../color";
import React, { useState, useEffect, useRef, useContext } from "react";
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
import { useNavigation } from "@react-navigation/native";
import {
  FontAwesome,
  SimpleLineIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import Loading from "../components/Loading";
import Empty from "../components/Empty";

import { Link } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import { getOneRestaurant, getAllCategory, getAllProduct } from "../service";
import { ResContext } from "../context/ResContext";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState();
  const [category, setCategory] = useState();
  const [products, setProducts] = useState();
  const resContext = useContext(ResContext);
  const navigation = useNavigation();

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

  useEffect(() => {
    if (resContext.data) {
      getAllProduct(resContext.data.idRestaurant, setProducts);
      getOneRestaurant(resContext.data.idRestaurant, setRestaurant);
      getAllCategory(resContext.data.idRestaurant, setCategory);
    }
  }, [resContext.data]);

  const navigateDetails = (item) => {
    navigation.navigate("Details", item);
  };

  const RenderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigateDetails(item)}
      >
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.itemSub}>{item.description}</Text>
          <Text>{item.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</Text>
        </View>
        <Image
          style={styles.itemImg}
          source={{
            uri: item.image,
          }}
        />
      </TouchableOpacity>
    );
  };

  const ItemDivider = () => {
    return <View style={styles.itemDivider} />;
  };

  const RenderBlock = ({ item }) => {
    var data = products.filter((product) => product.category === item.id);
    return (
      data.length != 0 && (
        <View style={styles.blockContainer}>
          <Text style={styles.blockTitle}>{item.name}</Text>
          <FlatList
            data={data}
            renderItem={RenderItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={ItemDivider}
          />
        </View>
      )
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
          <Text style={styles.headerTitle}>{restaurant?.name}</Text>
          <Text style={styles.headerAddress}>{restaurant?.address}</Text>
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
          <Text style={styles.tableName}>
            Tên bàn: {resContext?.data?.table}
          </Text>
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
          source={{ uri: restaurant?.image }}
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
          <TouchableOpacity onPress={() => navigation.navigate("Scan")}>
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
        data={category}
        renderItem={RenderBlock}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={BlockDivider}
        ListHeaderComponent={RenderHeader}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      />
      {(!restaurant || !category || !products) && <Loading />}
      {!resContext.data && <Empty />}
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
    height: "100%",
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 16,
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
