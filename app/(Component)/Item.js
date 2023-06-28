import * as React from "react";
import { Card, Button } from "react-native-paper";
import portein from "../../assets/images/portien.jpg";
import { View, TouchableOpacity, Text } from "react-native";

const Item = ({ Image, Product, Price }) => (
  <Card style={{ width: "46%" }}>
    <Card.Cover
      source={Image}
      resizeMode="contain"
      style={{ backgroundColor: "#fff" }}
    />
    <View
      style={{
        width: "100%",
        alignItems: "center",
        paddingVertical: "2%",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "black",
        marginVertical: 1,
        backgroundColor: "#fff",
      }}
    >
      <Text
        Value={Product}
        style={{
          fontFamily: "EncodeSansSemiCondensed_700Bold",
        }}
      >
        {Product}
      </Text>
    </View>
    <Text style={{ backgroundColor: "#F9F9F9" }} Value={Price}>
      Price: {Price}
    </Text>
    <TouchableOpacity
      style={{
        backgroundColor: "#0079FF",
        alignItems: "center",
        // borderRadius: 5,
      }}
    >
      <Text
        style={{
          fontSize: 15,
          marginVertical: "3%",
          color: "white",
          fontFamily: "EncodeSansSemiCondensed_700Bold",
        }}
      >
        ADD TO CART
      </Text>
    </TouchableOpacity>
  </Card>
);

export default Item;
