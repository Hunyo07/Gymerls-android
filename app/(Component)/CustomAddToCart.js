import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomAddToCart = ({ text, onPress }) => {
  const [isDisable, setIsDisabled] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [username, setUsername] = useState("");
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (cartItem.length == []) {
      setIsDisabled(false);
      setPressed(false);
    }
    storeDataUser(function (callback) {
      fetch("https://gymerls-api-staging.vercel.app/api/get-cart-by-id", {
        method: "POST",
        headers: {
          "Content-type": " application/json",
        },
        body: JSON.stringify({
          username: callback,
          status: "cart",
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          setCartItem(result);
        });
    });
  }, []);

  const storeDataUser = async (callback) => {
    const valueUsername = await AsyncStorage.getItem("username");
    try {
      setUsername(valueUsername);
      callback(valueUsername);
      return true;
    } catch (exception) {
      return false;
    }
  };
  // console.log(cartItem);
  const addToCart = () => {
    setIsDisabled(true);
    setPressed(true);
  };

  return (
    <View>
      <View style={styles.root}>
        <Pressable
          // style={{
          //   backgroundColor: "blue",
          //   borderRadius: 2,
          //   alignItems: "center",
          // }}
          onPressIn={() => {
            addToCart();
          }}
          disabled={isDisable}
          onPress={onPress}
          testOnly_pressed={pressed}
          // setPressed={pressed}
          // theme={{ colors: { text: "white", primary: "black" } }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#9AC5F4" : "#0A6EBD",
            },
            {
              borderRadius: 3,
            },
            styles.wrapperCustom,
          ]}
          // style={styles.textcontainer}
        >
          {({ pressed }) => (
            <Text style={styles.text}>
              {pressed ? "ALREADY IN CART" : "ADD TO CART"}
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  textcontainer: {
    alignItems: "center",
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 8,
    paddingVertical: 8,
  },
  text: {
    fontSize: 15,
    fontWeight: 600,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: "4%",
  },
});

export default CustomAddToCart;
