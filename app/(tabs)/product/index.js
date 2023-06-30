import { Link, Redirect, Stack, useRouter } from "expo-router";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import ItemInCart from "../../(Component)/ItemInCart";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

const Tab5Index = () => {
  const [show, setShow] = useState("");

  return (
    <View>
      <View>
        <ScrollView style={styles.root}>
          <View style={{ flex: 1 }}>
            <View style={styles.mealcontainer}>
              <Text style={styles.headertext}>CART</Text>
            </View>
            <ItemInCart />
          </View>

          <TouchableOpacity
            style={{
              alignSelf: "center",
              backgroundColor: "#0079FF",
              width: "95%",
              alignItems: "center",
              borderRadius: 5,
              marginTop: "4%",
            }}
            onPress={() => {}}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                marginVertical: "3%",
                color: "white",
              }}
            >
              PLACE ORDER
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
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
});
export default Tab5Index;
