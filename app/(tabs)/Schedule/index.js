import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { DatePickerModal } from "react-native-paper-dates";
import { Button } from "react-native-paper";
import { useState, useEffect, useCallback } from "react";
import { DatePickerInput } from "react-native-paper-dates";
import { TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IconButton, MD3Colors } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { en, registerTranslation } from "react-native-paper-dates";

registerTranslation("en", en);

const Scheduleindex = () => {
  const [inputDate, setInputDate] = React.useState(undefined);
  const [username, setUsername] = useState("");
  const [reservationData, setReservationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddNewReserve, setAddNewReserve] = useState(false);

  useEffect(() => {
    // const timer = setTimeout(() => {
    var formattedDate = formatDate(new Date());
    // var formattedDate = inputDate;
    getData(function (callback) {
      fetch(
        "https://gymerls-api-staging.vercel.app/api/get-reservation-by-username-and-date",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username: callback,
            reservation_date: formattedDate,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setReservationData(data);
          if (data.length === 0) {
            // setTableHasNoData(true);
          } else {
            // setTableHasNoData(false);
          }
        });
    });
    // setIsLoading(false);
    // }, 1000);
    // return () => clearTimeout(timer);
  }, []);

  const getData = async (callback) => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        setUsername(value);
        callback(value);
      } else {
      }
    } catch (e) {}
  };

  const formatDate = (date) => {
    var dateToFormat = new Date(date);
    var year = dateToFormat.toLocaleString("default", { year: "numeric" });
    var month = dateToFormat.toLocaleString("default", { month: "2-digit" });
    var day = dateToFormat.toLocaleString("default", { day: "2-digit" });

    var formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  };

  const dateToday = formatDate(new Date());

  return (
    <View>
      <ScrollView style={{}}>
        <View style={styles.mealcontainer}>
          <Text style={styles.headertext}>SCHEDULE</Text>
        </View>

        <View
          style={{
            borderRadius: 5,
            width: "98%",
            alignSelf: "center",
            marginTop: "2%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 3, marginLeft: "2%", marginTop: "1%" }}>
              <IconButton
                backgroundColor="white"
                icon="plus"
                iconColor="black"
                size={24}
                onPress={() => setAddNewReserve(true)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <IconButton
                backgroundColor="white"
                icon="filter-variant"
                iconColor="black"
                size={24}
                onPress={() => console.log("Pressed")}
              />
            </View>
            <View style={{ flex: 1 }}>
              <IconButton
                backgroundColor="white"
                icon="calendar"
                iconColor="black"
                size={24}
                onPress={() => console.log("Pressed")}
              />
            </View>
            {/* <Text>ADD NEW RESERVATION</Text> */}
          </View>

          {reservationData.map((res) => {
            return (
              <View key={res.id} style={{ elevation: 20, paddingTop: "2%" }}>
                <View
                  style={{
                    marginTop: "2%",
                    width: "15%",
                    marginRight: "13%",
                    alignSelf: "flex-end",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      padding: "5%",
                      // color: "white",
                      fontSize: 14,
                      alignSelf: "center",
                      fontWeight: "700",
                    }}
                  >
                    {res.time_slot}
                  </Text>
                </View>
                <View
                  style={{
                    width: "90%",
                    flexDirection: "row",
                    alignSelf: "center",
                    marginBottom: "2%",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "#1687A7",
                      padding: "3%",
                      borderBottomLeftRadius: 10,
                      borderTopLeftRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 26,
                        color: "#FEFCF3",
                        alignSelf: "center",
                      }}
                    >
                      {res.reservation_date.slice(8, 10)}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "500",
                        fontSize: 10,
                        color: "#ffff",
                        alignSelf: "center",
                      }}
                    >
                      {res.reservation_date.slice(0, 7)}
                    </Text>
                    {/* <Text
                      style={{
                        fontWeight: "500",
                        fontSize: 10,
                        color: "#ffff",
                        alignSelf: "center",
                      }}
                    >
                      {res.time_slot}
                    </Text> */}
                  </View>
                  <View
                    style={{
                      flex: 4,
                      padding: "2%",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 14,
                        margin: "2%",
                      }}
                    >
                      {res.notes}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "500",
                        color: "grey",
                        // alignSelf:"flex-start"
                      }}
                    >
                      {res.coach_name}
                    </Text>
                  </View>
                  <View
                    style={[
                      res.status,
                      res.status === "Pending"
                        ? styles.pending
                        : res.status === "Confirmed"
                        ? styles.confirmed
                        : res.status === "Cancelled"
                        ? styles.cancelled
                        : res.status === "Completed"
                        ? styles.completed
                        : styles.declined,
                      // res.status === "Completed"
                      //   ? styles.completed
                      //   : styles.cancelled
                    ]}
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        color: "#ffff",
                        fontWeight: "500",
                      }}
                    >
                      {res.status}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {showAddNewReserve ? (
        <>
          <View
            style={{
              height: "100%",
              position: "absolute",
              width: "100%",
              zIndex: 2,
              backgroundColor: "transparent",
            }}
          >
            <View
              style={{
                padding: "2%",
                elevation: 20,
                borderRadius: 5,
                backgroundColor: "white",
                width: "90%",
                marginTop: "20%",
                alignSelf: "center",
              }}
            >
              <View style={{ marginHorizontal: "3%" }}>
                <Text style={{ fontSize: 18 }}>CREATE NEW RESERVATION</Text>
              </View>
              <View style={{ marginHorizontal: "3%" }}>
                <Text style={{ color: "grey" }}>Fill up all fields</Text>
              </View>

              <DatePickerInput
                // style={{ width: "90%", borderRadius: 5 }}
                locale="en"
                // label="date"
                style={{
                  marginHorizontal: "2%",
                  marginVertical: "3%",
                  backgroundColor: "white",
                }}
                value={inputDate}
                onChange={(d) => setInputDate(d)}
                inputMode="start"
                mode="outlined"
              />

              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    flex: 1,
                    marginVertical: "2%",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setAddNewReserve(false);
                    }}
                  >
                    <Text>CANCEL</Text>
                    {/* <Entypo name="chevron-small-left" size={45} /> */}
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginVertical: "2%",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      console.log("CREATE");
                    }}
                  >
                    <Text>CREATE</Text>
                    {/* <Entypo name="chevron-small-left" size={45} /> */}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </>
      ) : (
        <>
          <Text>false</Text>
        </>
      )}
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
  pending: {
    backgroundColor: "#FF7700",
    flex: 2,
    justifyContent: "center",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  confirmed: {
    flex: 2,
    justifyContent: "center",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#1A5D1A",
  },
  completed: {
    backgroundColor: "#3AB0FF",
    flex: 2,
    justifyContent: "center",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  cancelled: {
    flex: 2,
    justifyContent: "center",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#C21010",
  },
  declined: {
    flex: 2,
    justifyContent: "center",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#95389E",
  },
});
export default Scheduleindex;
