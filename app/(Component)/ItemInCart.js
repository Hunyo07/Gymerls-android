import * as React from "react";
import { Card, Button, Provider } from "react-native-paper";
import portein from "../../assets/images/portien.jpg";
import { View, TouchableOpacity, Text } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ItemInCart = () => {
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
    getData(function (callback) {
      fetch("https://gymerls-api.vercel.app/api/get-cart-by-id", {
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
          setProducts(result);
        });
    });
  }, [product]);
  const getData = async (callback) => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        // value previously stored
        setUsername(value);
        callback(value);
      } else {
      }
    } catch (e) {
      // error reading value
      // console.log(e);
    }
  };
  const addedDate = formatDate(new Date());
  return (
    <View style={{}}>
      {product.map((product) => {
        {
        }
        const removeInCart = () => {
          fetch("https://gymerls-api.vercel.app/api/delete-cart", {
            method: "PATCH",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              id: product.id,
            }),
          }).then(function (response) {
            return response.json();
          });
        };

        return (
          <View
            key={product.id}
            style={{
              width: "90%",
              alignSelf: "center",
            }}
          >
            {product !== 0 ? (
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

                    <View
                      style={{
                        backgroundColor: "#F9F9F9",
                      }}
                    >
                      <Text
                        style={{
                          paddingLeft: "2%",
                          fontWeight: "bold",
                          marginVertical: "2%",
                        }}
                      >
                        Quantity: {product.quantity}
                      </Text>
                      <Text
                        style={{
                          paddingLeft: "2%",
                          fontWeight: "bold",
                          marginVertical: "2%",
                        }}
                      >
                        {product.description}
                      </Text>

                      <Text
                        style={{
                          paddingLeft: "2%",
                          fontWeight: "bold",
                          marginVertical: "2%",
                        }}
                      >
                        Price: {product.price}
                      </Text>
                      <Text
                        style={{
                          paddingLeft: "2%",
                          backgroundColor: "#F9F9F9",
                          fontWeight: "bold",
                          marginVertical: "2%",
                        }}
                      >
                        Total: {product.price}
                      </Text>
                      <TouchableOpacity
                        onPress={() => removeInCart()}
                        style={{
                          backgroundColor: "#0079FF",
                          alignItems: "center",
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
                          REMOVE
                        </Text>
                      </TouchableOpacity>
                    </View>
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

export default ItemInCart;
