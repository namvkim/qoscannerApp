"use strict";
import myColor from "../color";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import BarcodeMask from "react-native-barcode-mask";

import { ResContext } from "../context/ResContext";

export default function Scan() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const resContext = useContext(ResContext);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const arr = data.split("/");
    resContext.setData({ idRestaurant: arr[0], table: arr[1] });
    navigation.reset({
      index: 0,
      routes: [{ name: "MyTabs" }],
    });
  };

  const navigateToMyTabs = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "MyTabs" }],
    });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        type={BarCodeScanner.Constants.Type.back}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        style={StyleSheet.absoluteFillObject}
      />
      <BarcodeMask edgeColor="#62B1F6" showAnimatedLine />
      <Text style={styles.title}>Quét mã QR</Text>
      {resContext.data && (
        <TouchableOpacity
          style={styles.btnClose}
          onPress={() => navigateToMyTabs()}
        >
          <AntDesign name="close" size={36} color={myColor.white} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: myColor.black,
  },
  title: {
    fontSize: 24,
    color: myColor.white,
    opacity: 0.5,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    position: "absolute",
    top: 40,
  },
  btnClose: {
    position: "absolute",
    bottom: 40,
    padding: 12,
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
});
