import myColor from "./color";
import { useEffect } from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  Entypo,
  MaterialIcons,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";

import Home from "./screens/Home";
import Cart from "./screens/Cart";
import Scan from "./screens/Scan";
import Message from "./screens/Message";
import Setting from "./screens/Setting";
import Details from "./screens/Details";
import Note from "./screens/Note";

import { ResContextProvider } from "./context/ResContext";
import { OrderContextProvider } from "./context/OrderContext";

LogBox.ignoreLogs(["Setting a timer"]);

const MyTabs = () => {
  const Tab = createMaterialBottomTabNavigator();

  useEffect(() => {}, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={myColor.orange}
      inactiveColor={myColor.greyTxt}
      barStyle={{ backgroundColor: myColor.white }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: "Giỏ hàng",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="shopping-bag" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={Scan}
        options={{
          tabBarLabel: "Quét mã",
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-qr-code" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          tabBarLabel: "Tin nhắn",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="message" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          tabBarLabel: "Cài đặt",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MyStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="MyTabs">
      <Stack.Screen
        name="MyTabs"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Note"
        component={Note}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <ResContextProvider>
      <OrderContextProvider>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </OrderContextProvider>
    </ResContextProvider>
  );
}
