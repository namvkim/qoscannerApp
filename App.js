import myColor from "./color";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  Entypo,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import Scan from "./screens/Scan";
import Home from "./screens/Home";
import Message from "./screens/Message";
import Setting from "./screens/Setting";
import Empty from "./screens/Empty";

import DataContext from "./context";

const MyTabs = () => {
  const Tab = createMaterialBottomTabNavigator();

  useEffect(() => {}, []);

  return (
    <Tab.Navigator
      initialRouteName="Scan"
      activeColor={myColor.orange}
      inactiveColor={myColor.greyTxt}
      barStyle={{ backgroundColor: myColor.white }}
    >
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
        name="Empty"
        component={Empty}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <DataContext.Provider value={""}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </DataContext.Provider>
  );
}
