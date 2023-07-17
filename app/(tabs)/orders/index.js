import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthStore } from "../../../store";
import { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";

const orders = () => {
  const [username, setUsername] = useState("");
  const [transaction, setTransaction] = useState([]);
  const [transactShow, setTransactShow] = useState(false);

  const formatDate = (date) => {
    var dateToFormat = new Date(date);
    var year = dateToFormat.toLocaleString("default", { year: "numeric" });
    var month = dateToFormat.toLocaleString("default", { month: "2-digit" });
    var day = dateToFormat.toLocaleString("default", { day: "2-digit" });

    var formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  };
  useEffect(() => {
    storeDataPass(function (callback) {
      fetch(
        "https://gymerls-api-staging.vercel.app/api/get-transaction-by-username",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username: callback,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setTransaction(data);
          if (data.length === []) {
            setTransactShow(true);
          } else {
            setTransactShow(false);
          }
          // console.log(data);
        });
    });
  }, [transaction]);
  const storeDataPass = async (callback) => {
    AuthStore.update((s) => {
      s.isLoggedIn = false;
    });
    const valueUsername = await AsyncStorage.getItem("username");
    try {
      callback(valueUsername);
      setUsername(valueUsername);
      return true;
    } catch (exception) {
      return false;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.mealcontainer}>
        <Text style={styles.headertext}>ORDERS</Text>
      </View>
      <ScrollView
        style={{
          // backgroundColor: "#1D5D9B",
          borderRadius: 5,
          width: "98%",
          alignSelf: "center",
        }}
      >
        <View style={{ marginVertical: "4%" }}>
          {transactShow ? (
            <>
              <View style={{ alignItems: "center", padding: "20%" }}>
                <Text style={{ fontWeight: 500, color: "grey" }}>
                  No data available/.
                </Text>
              </View>
            </>
          ) : (
            <>
              {transaction.map((trans) => {
                return (
                  <View key={trans.id} style={{}}>
                    <View style={{ elevation: 20 }}>
                      <View
                        style={{
                          width: "90%",
                          flexDirection: "row",
                          alignSelf: "center",
                          marginTop: "2%",
                          borderRadius: 10,
                          padding: "2%",
                          backgroundColor: "#fff",
                        }}
                      >
                        <View
                          style={{
                            width: "90%",
                            flex: 3,
                            padding: "2%",
                          }}
                        >
                          <Text
                            style={{ marginVertical: "1%", fontWeight: "400" }}
                          >
                            {trans.fullname}
                          </Text>
                          <Text
                            style={{
                              fontWeight: 600,
                              marginVertical: "1%",
                              fontSize: 16,
                            }}
                          >
                            {trans.items}
                          </Text>
                          <Text
                            style={{
                              marginVertical: "1%",
                              fontSize: 16,
                            }}
                          >
                            <Text style={{ fontSize: 14 }}>₱</Text>{" "}
                            {trans.total}
                          </Text>

                          <Text
                            style={{
                              fontWeight: 600,
                              marginVertical: "1%",
                              color: "grey",
                            }}
                          >
                            {trans.method}
                          </Text>
                          <Text
                            style={{
                              fontWeight: 400,
                              color: "grey",
                              padding: "2%",
                              backgroundColor: "#ebebeb",
                              borderRadius: 2,
                            }}
                          >
                            {trans.address}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            // alignItems: "center",
                          }}
                        >
                          <View
                            style={[
                              styles.status,
                              trans.status === "Pending"
                                ? styles.pending
                                : styles.confirmed,
                            ]}
                          >
                            <Text style={{ fontWeight: 600, color: "white" }}>
                              {trans.status}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontWeight: 400,
                              marginVertical: "1%",
                              fontSize: 13,
                              alignSelf: "center",
                            }}
                          >
                            {formatDate(trans.transaction_date)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </>
          )}
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
    marginBottom: "2%",
    padding: 10,
    borderRadius: 10,
  },
  headertext: {
    fontSize: 30,
    color: "#fff",
    fontWeight: 700,
  },
  status: {
    alignItems: "center",
    borderRadius: 5,
  },
  pending: {
    padding: "4%",
    borderRadius: 5,
    backgroundColor: "#FF7700",
  },
  confirmed: {
    padding: "4%",

    backgroundColor: "#1A5D1A",
    borderRadius: 5,
  },
});

export default orders;
