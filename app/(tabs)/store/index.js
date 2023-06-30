import { Link, Redirect, Stack, useRouter } from "expo-router";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import MyComponent from "../../(Component)/CustomSearchBar";
import portein from "../../../assets/images/portien.jpg";
import { Card, Button } from "react-native-paper";
import Item from "../../(Component)/Item";
import { useState, useEffect } from "react";
import { Value, clockRunning } from "react-native-reanimated";
import ItemOdd from "../../(Component)/ItemOdd";

const Tab5Index = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  return (
    <View>
      <ScrollView style={styles.root}>
        <View style={styles.mealcontainer}>
          <Text style={styles.headertext}>STORE</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <View style={{ width: "48%" }}>
            <Item />
          </View>
          <View style={{ width: "48%" }}>
            <ItemOdd />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {},
  mealcontainer: {
    alignItems: "center",
    alignSelf: "center",
    width: "98%",
    backgroundColor: "#023047",
    marginTop: "10%",
    padding: 10,
    borderRadius: 10,
  },
  headertext: {
    fontSize: 30,
    color: "#fff",
    fontWeight: 700,
  },
  item: {
    width: "100%",
    // flexDirection: "row",
    // height: "20%",
    // justifyContent: "space-evenly",
    marginTop: "2%",
    padding: "2%",
  },
});
export default Tab5Index;
