import * as React from "react";
import { Card, Button, Provider } from "react-native-paper";
import portein from "../../assets/images/portien.jpg";
import { View, TouchableOpacity, Text, Pressable } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { IconButton, Colors } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { clockRunning, sub } from "react-native-reanimated";

const ItemInCart = () => {
  const [product, setProducts] = useState([]);
  const [username, setUsername] = useState("");
  const [Show, setShow] = useState(false);

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
          // setProducts(result);
          setCart(result);
          // findSumUsingReduce(result);
        });
      // let t = 0;
      // result.map(({ sub_total }) => (t = t + sub_total));
      // setGrandtotal(t);
    });
  }, []);

  // function findSumUsingReduce(result) {
  //   const s = result.reduce((s, { price }) => s + price, 0);
  //   return s;
  // }

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
  const [cart, setCart] = useState([]);
  // const [item, setItem] = useState("");
  const [grandTotal, setGrandtotal] = useState(0);

  const incrementQuantity = (userId) => {
    // cart.find((item) => {
    //   userId === item.id;
    //   item.quantity++;
    //   console.log(item);
    //   // setCart(item);
    // });

    // setCart((cart) => {
    //   cart.map((item) => {
    //     if (userId === item.id) {
    //       item.quantity++;
    //       item.sub_total = item.quantity * item.price;
    //     }
    //     setCart(item);
    //     // mappingPrice();
    //     console.log(item);
    //     return item;
    //   });
    // });

    // setCart.map((item) => {
    //   if (userId === item.id) {
    //     item.quantity++;
    //     // item.sub_total = item.quantity * item.price;
    //   }
    //   console.log(item);

    //   return item;
    //   // setCart(item);
    //   // // mappingPrice();
    //   // console.log(item);
    //   // return item;
    // });
    // findSumUsingReduce(cartItem);
    cart.map((item) => {
      if (userId === item.id) {
        item.quantity++;
        // item.sub_total = item.quantity * item.price;
      }
      console.log(item);
      setCart(item);
      return item;
      // setCart(item);
      // mappingPrice();
    });
  };

  return (
    <View style={{}}>
      {Show ? (
        <>
          <View style={{ alignItems: "center", marginVertical: "20%" }}>
            <Text
              style={{
                fontFamily: "EncodeSansSemiCondensed_700Bold",
                color: "grey",
              }}
            >
              MAKE YOUR PURCHASE
              <Ionicons name="cart-outline" size={24} color="grey" />.
            </Text>
          </View>
        </>
      ) : (
        <>{/* <Text>Ate</Text> */}</>
      )}

      {cart.map((item) => {
        {
          /* {
        }
        const removeInCart = () => {
          fetch("https://gymerls-api.vercel.app/api/delete-cart", {
            method: "PATCH",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              id: item.id,
            }),
          }).then(function (response) {
            return response.json();
          });
        }; */
        }

        return (
          <View
            key={item.id}
            style={{
              width: "90%",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                marginTop: "10%",
                marginBottom: "5%",
              }}
            >
              <Card>
                <Card.Cover
                  source={{ uri: item.image_url }}
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
                    {item.product_name}
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
                    {item.description}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: "2%",
                      fontWeight: "bold",
                      marginVertical: "1%",
                      width: "100%",
                    }}
                  >
                    Quantity{" "}
                    <TouchableOpacity>
                      <Entypo
                        name="minus"
                        size={20}
                        color="black"
                        onPress={() => {}}
                      />
                    </TouchableOpacity>
                    {"   "}
                    <Text>{item.quantity}</Text>
                    {"   "}
                    <TouchableOpacity
                      onPress={() => {
                        incrementQuantity(item.id);
                      }}
                    >
                      <Entypo name="plus" size={20} color="black" />
                    </TouchableOpacity>
                  </Text>

                  <Text
                    style={{
                      paddingLeft: "2%",
                      fontWeight: "bold",
                      marginVertical: "2%",
                    }}
                  >
                    Price: {item.price}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: "2%",
                      backgroundColor: "#F9F9F9",
                      fontWeight: "bold",
                      marginVertical: "2%",
                    }}
                  >
                    Total: {item.price}
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
          </View>
        );
      })}
    </View>
  );
};

export default ItemInCart;
