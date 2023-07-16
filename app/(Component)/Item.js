import * as React from "react";
import { Card, Provider } from "react-native-paper";
import portein from "../../assets/images/portien.jpg";
import {
  View,
  TouchableOpacity,
  Button,
  Text,
  Pressable,
  RefreshControl,
} from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAddToCart from "./CustomAddToCart";

const Item = () => {
  const [product, setProducts] = useState([]);
  const [username, setUsername] = useState("");
  const [cartItem, setCartItem] = useState([]);
  const [isDisable, setAddToCartButtonIsDisabled] = useState(false);

  const formatDate = (date) => {
    var dateToFormat = new Date(date);
    var year = dateToFormat.toLocaleString("default", { year: "numeric" });
    var month = dateToFormat.toLocaleString("default", { month: "2-digit" });
    var day = dateToFormat.toLocaleString("default", { day: "2-digit" });

    var formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  };

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

  useEffect(() => {
    // GET METHOD
    // console.log(product);
    fetch("https://gymerls-api-staging.vercel.app/api/products")
      .then(function (response) {
        return response.json();
      })
      .then(function (product) {
        setProducts(product);
      });

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
      // console.log(cartItem);
    });
  }, [cartItem]);

  const onPressOuts = () => {
    alert("1 item added in your cart");
  };

  const addToCart = (product_name, image_url, description, price, id) => {
    const addedDate = formatDate(new Date());
    if (id === id) {
      fetch("https://gymerls-api-staging.vercel.app/api/add-to-cart", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          product_name: product_name,
          image_url: image_url,
          description: description,
          price: price,
          quantity: 1,
          sub_total: price,
          status: "cart",
          added_date: addedDate,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
        });
    } else {
      console.log(error);
    }
  };

  // const onPressOut = () => {
  //   setAddToCartButtonIsDisabled(true);
  // };

  // var idNum = 1;

  return (
    <View style={{}}>
      {product.map((product) => {
        {
          /* if (idNum === product.id) {
          console.log(product.product_name);
        } else {
        } */
        }

        return (
          <View
            key={product.id}
            style={{
              width: "90%",
              alignSelf: "center",
            }}
          >
            {product.id % 2 == 0 ? (
              <>
                <View
                  style={{
                    width: "100%",
                    marginTop: "10%",
                    marginBottom: "5%",
                  }}
                >
                  <Card>
                    <Card.Cover
                      source={{ uri: product.image_url }}
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
                        marginVertical: 1,
                        backgroundColor: "#fff",
                        borderColor: "grey",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "EncodeSansSemiCondensed_700Bold",
                        }}
                      >
                        {product.product_name}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          paddingLeft: "2%",
                          backgroundColor: "#F9F9F9",
                          fontWeight: "500",
                        }}
                      >
                        {product.description}
                      </Text>
                    </View>
                    <Text
                      style={{
                        paddingLeft: "2%",
                        paddingVertical: "2%",
                        color: "#023047",
                        backgroundColor: "#F9F9F9",
                        fontWeight: "700",
                      }}
                    >
                      ₱ {product.price}
                    </Text>

                    <CustomAddToCart
                      onPress={() => {
                        addToCart(
                          product.product_name,
                          product.image_url,
                          product.description,
                          product.price,
                          product.id
                        );
                      }}
                    />
                  </Card>
                </View>
              </>
            ) : (
              <></>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default Item;
