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
import Item from "../../(Component)/ItemInCart";
import { useState } from "react";

const Tab5Index = () => {
  const router = useRouter();

  const [QuantityValue, setQuantityValue] = useState("");
  const [Price, setPrice] = useState("");
  const [TotalPrice, setTotalPrice] = useState("");

  return (
    <ScrollView style={styles.root}>
      <View style={{ flex: 1 }}>
        <View style={styles.mealcontainer}>
          <Text style={styles.headertext}>CART</Text>
        </View>
        <View
          style={{ width: "90%", alignSelf: "center", marginVertical: "4%" }}
        >
          <Item
            Image={{
              uri: "https://5.imimg.com/data5/BI/FH/WF/SELLER-9367890/gym-body-protein-powder-nutrition-supplement-500g-500x500.jpg",
            }}
            Product={"Gym Body Powder"}
            // setPrice={setPrice}
            Price={120}
            setTotalPrice={setTotalPrice}
            setQuantityValue={setQuantityValue}
            QuantityValue={" 2"}
            QuantityValueOnChange={(text) => setQuantityValue(text)}
            TotalPrice={"240"}
            onPress={() => {}}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{ width: "90%", alignSelf: "center", marginVertical: "4%" }}
        >
          <Item
            Image={{
              uri: "https://cdn.shopify.com/s/files/1/0471/3332/7519/products/JYM5990325-61121_grey_465x.jpg?v=1658437032",
            }}
            Product={"Pro Gym"}
            // setPrice={setPrice}
            Price={140}
            setTotalPrice={setTotalPrice}
            setQuantityValue={setQuantityValue}
            QuantityValue={" 1"}
            QuantityValueOnChange={(text) => setQuantityValue(text)}
            TotalPrice={140}
            onPress={() => {}}
          />
        </View>
      </View>
    </ScrollView>
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
});
export default Tab5Index;
