import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { DatePickerModal } from "react-native-paper-dates";
import { Button } from "react-native-paper";
import { useState, useEffect, useCallback } from "react";
import { DatePickerInput } from "react-native-paper-dates";
import {} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IconButton, MD3Colors, TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

import { en, registerTranslation } from "react-native-paper-dates";

registerTranslation("en", en);

const Scheduleindex = () => {
  const [dateValue, setDateValue] = React.useState(new Date());
  const [openCalendar, setOpenCalendar] = React.useState(false);
  const [inputDate, setInputDate] = React.useState(new Date());
  const [username, setUsername] = useState("");
  const [reservationData, setReservationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddNewReserve, setAddNewReserve] = useState(false);

  const [firstBatchIsDisabled, setFirstBatchIsDisabled] = useState(true);
  const [secondBatchIsDisabled, setSecondBatchIsDisabled] = useState(true);
  const [thirdBatchIsDisabled, setThirdBatchIsDisabled] = useState(true);
  const [fourthBatchIsDisabled, setFourthBatchIsDisabled] = useState(true);
  const [fifthBatchIsDisabled, setFifthBatchIsDisabled] = useState(true);
  const [lastBatchIsDisabled, setLastBatchIsDisabled] = useState(true);

  const [items, setItems] = useState([
    { label: "7-9AM", value: "7-9AM", disabled: firstBatchIsDisabled },
    { label: "9-11AM", value: "9-11AM", disabled: secondBatchIsDisabled },
    { label: "1-3PM", value: "1-3PM", disabled: thirdBatchIsDisabled },
    { label: "3-5PM", value: "3-5PM", disabled: fourthBatchIsDisabled },
    { label: "5-7PM", value: "5-7PM", disabled: fifthBatchIsDisabled },
    { label: "7-9PM", value: "7-9PM", disabled: lastBatchIsDisabled },
  ]);

  // console.log(secondBatchIsDisabled);
  // const formattedDateValue = dateValue.length.slice(0, 8);
  // console.log(items);
  // console.log(reservationData);
  const onDismissSingle = React.useCallback(() => {
    setOpenCalendar(false);
  }, [setOpenCalendar]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpenCalendar(false);
      setDateValue(params.date);
    },
    [setOpenCalendar, setDateValue]
  );
  useEffect(() => {
    // const timer = setTimeout(() => {
    var formattedDate = formatDate(dateValue);
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

  // var formattedDateFilter = formatDate(dateValue);
  // console.log(formattedDateFilter);
  const handleOpenModalCreateReservation = () => {
    getReservationByDate(inputDate);
  };

  const getReservationByDate = (date) => {
    // var formattedDate = formatDate(new Date());
    var formattedDate = formatDate(inputDate);
    fetch(
      "https://gymerls-api-staging.vercel.app/api/get-reservation-by-date-and-status-is-confirmed",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          reservation_date: formattedDate,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        var first_batch = [];
        var second_batch = [];
        var third_batch = [];
        var fourth_batch = [];
        var fifth_batch = [];
        var last_batch = [];
        // console.log(data);

        for (let item of data) {
          if (item.time_slot === "7-9AM") {
            first_batch.push(item);
            // console.log(item);
          } else if (item.time_slot === "9-11AM") {
            second_batch.push(item);
          } else if (item.time_slot === "1-3PM") {
            third_batch.push(item);
          } else if (item.time_slot === "3-5PM") {
            fourth_batch.push(item);
          } else if (item.time_slot === "5-7PM") {
            fifth_batch.push(item);
          } else {
            last_batch.push(item);
          }
        }
        // console.log(second_batch);
        console.log(first_batch.length);

        // first_batch.length === 10
        //   ? setFirstBatchIsDisabled(false)
        //   : setFirstBatchIsDisabled(true);

        // second_batch.length === 10
        //   ? setSecondBatchIsDisabled(true)
        //   : setSecondBatchIsDisabled(false);

        // third_batch.length === 10
        //   ? setThirdBatchIsDisabled(true)
        //   : setThirdBatchIsDisabled(false);

        // fourth_batch.length === 10
        //   ? setFourthBatchIsDisabled(true)
        //   : setFourthBatchIsDisabled(false);

        // fifth_batch.length === 10
        //   ? setFifthBatchIsDisabled(true)
        //   : setFifthBatchIsDisabled(false);

        // last_batch.length === 10
        //   ? setLastBatchIsDisabled(true)
        //   : setLastBatchIsDisabled(false);
      });
  };

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

  const [open, setOpen] = useState(false);
  const [timeSlot, setTimeSlot] = useState(inputDate);

  // console.log(inputDate);

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
          style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
        >
          <DatePickerModal
            locale="en"
            mode="single"
            visible={openCalendar}
            onDismiss={onDismissSingle}
            date={dateValue}
            onConfirm={onConfirmSingle}
          />
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
                onPress={() => {
                  setAddNewReserve(true);
                  setFirstBatchIsDisabled(false);
                  handleOpenModalCreateReservation();
                }}
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
                onPress={() => setOpenCalendar(true)}
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
              <TextInput
                style={{
                  marginHorizontal: "2%",
                  marginVertical: "3%",
                  backgroundColor: "white",
                }}
                label="Note*"
                mode="outlined"
                theme={{ colors: { text: "white", primary: "black" } }}
              />
              <DropDownPicker
                style={{ zIndex: 2 }}
                containerStyle={{
                  width: "95%",
                  alignSelf: "center",
                  zIndex: 200,
                }}
                disabledItemLabelStyle={{
                  opacity: 0.5,
                }}
                closeAfterSelecting={true}
                open={open}
                value={timeSlot}
                items={items}
                setOpen={setOpen}
                setValue={setTimeSlot}
                setItems={setItems}
              />
              <Text style={{ color: "grey", fontSize: 12, marginLeft: "3%" }}>
                Please select time slot
              </Text>
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
        <></>
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
