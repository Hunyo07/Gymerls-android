import * as React from "react";
import { Card, Button, Provider } from "react-native-paper";
import portein from "../../assets/images/portien.jpg";
import { View, TouchableOpacity, Text } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Item = () => {
  const [product, setProducts] = useState([]);
  const [username, setUsername] = useState("");

  const formatDate = (date) => {
    var dateToFormat = new Date(date);
    var year = dateToFormat.toLocaleString("default", { year: "numeric" });
    var month = dateToFormat.toLocaleString("default", { month: "2-digit" });
    var day = dateToFormat.toLocaleString("default", { day: "2-digit" });

    var formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  };

  const storeDataUser = async () => {
    const valueUsername = await AsyncStorage.getItem("username");
    try {
      setUsername(valueUsername);
      return true;
    } catch (exception) {
      return false;
    }
  };

  useEffect(() => {
    storeDataUser();
    // GET METHOD
    fetch("https://gymerls-api.vercel.app/api/products")
      .then(function (response) {
        return response.json();
      })
      .then(function (product) {
        setProducts(product);
      });
  }, []);

  const addToCart = (product_name, image_url, description, price) => {
    const addedDate = formatDate(new Date());

    fetch("https://gymerls-api.vercel.app/api/add-to-cart", {
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
  };
  return (
    <View style={{}}>
      {product.map((product) => {
        return (
          <View
            key={product.id}
            style={{
              width: "90%",
              alignSelf: "center",
            }}
          >
            {product.id % 2 == 0 ? (
              <></>
            ) : (
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
                        borderColor: "black",
                        marginVertical: 1,
                        backgroundColor: "#fff",
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
                          paddingLeft: "1%",
                          backgroundColor: "#F9F9F9",
                          fontWeight: "bold",
                        }}
                      >
                        {product.description}
                      </Text>
                    </View>
                    <Text
                      style={{
                        paddingLeft: "1%",
                        backgroundColor: "#F9F9F9",
                        fontWeight: "bold",
                      }}
                    >
                      Price: {product.price}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        addToCart(
                          product.product_name,
                          product.image_url,
                          product.description,
                          product.price
                        )
                      }
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
                </View>
              </>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default Item;
