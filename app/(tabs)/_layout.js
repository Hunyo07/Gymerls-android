import { Tabs } from "expo-router";
import { Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
// 🏠
// ⚙️

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: "#EBEBEB",
        tabBarStyle: { height: "7%", borderRadius: 10 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: () => (
            <Text>
              <Entypo name="home" size={30} color="black" />
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="meal"
        options={{
          title: "Meal",
          tabBarIcon: () => (
            <Text>
              <MaterialIcons name="set-meal" size={30} color="black" />
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: "store",
          tabBarIcon: () => (
            <Text>
              <Entypo name="shop" size={30} color="black" />
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="product"
        options={{
          title: "Product",
          tabBarIcon: () => (
            <Text>
              <Entypo name="shopping-cart" size={30} color="black" />
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: "Settings",
          tabBarIcon: () => (
            <Text>
              <Ionicons name="settings" size={30} color="black" />
            </Text>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
