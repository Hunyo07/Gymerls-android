import * as React from "react";
import { Card, Button } from "react-native-paper";
import portein from "../../assets/images/portien.jpg";
import { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  setQuamtityValue,
} from "react-native";

const Item = ({
  Image,
  Product,
  Price,
  setPrice,
  setTotalPrice,
  setQuantityValue,
  QuantityValue,
  TotalPrice,
  onPress,
  value,
  QuantityValueOnChange,
}) => {
  // const [Price, setPrice] = useState("");

  // console.log(QuantityValue);

  return (
    <Card style={{ width: "100%", height: "50%" }}>
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
      <View style={{ flexDirection: "row" }}>
        <Text
          value={value}
          style={{
            paddingVertical: "1%",
            width: "18%",
            height: 30,
            backgroundColor: "#F9F9F9",
            paddingLeft: "2%",
          }}
        >
          Quantity :
        </Text>
        <TextInput
          editable={false}
          inputMode="numeric"
          // setValue={}
          value={QuantityValue}
          onChangeText={(Text) => setQuantityValue(Text)}
          style={{
            backgroundColor: "#F9F9F9",
            width: "82%",
            fontSize: 15,
            color: "black",
          }}
        />
      </View>
      <Text
        style={{
          paddingLeft: "2%",
          backgroundColor: "#F9F9F9",
          fontSize: 15,
          paddingVertical: "2%",
        }}
        setValue={setPrice}
        Value={Price}
      >
        Price: {Price}
      </Text>
      <Text
        style={{
          paddingLeft: "2%",
          backgroundColor: "#F9F9F9",
          fontSize: 15,
          paddingVertical: "2%",
        }}
        setValue={setTotalPrice}
        Value={TotalPrice}
      >
        TotalPrice: {TotalPrice}
      </Text>
      <TouchableOpacity
        onPress={onPress}
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
          Order Now
        </Text>
      </TouchableOpacity>
    </Card>
  );
};
export default Item;
