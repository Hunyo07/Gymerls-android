import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { DatePickerModal, tr } from "react-native-paper-dates";
import { Button, List } from "react-native-paper";
import { useState, useEffect, useCallback } from "react";
import { DatePickerInput } from "react-native-paper-dates";
import { RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  IconButton,
  MD3Colors,
  TextInput,
  ActivityIndicator,
} from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { en, registerTranslation } from "react-native-paper-dates";

registerTranslation("en", en);

const Scheduleindex = () => {
  const [expanded, setExpanded] = React.useState(false);

  const [dateValue, setDateValue] = React.useState(new Date());
  const [openCalendar, setOpenCalendar] = React.useState(false);
  const [inputDate, setInputDate] = React.useState(new Date());
  const [username, setUsername] = useState("");
  const [reservationData, setReservationData] = useState([]);
  const [showAddNewReserve, setAddNewReserve] = useState(false);
  const [showSchedules, setShowSchedules] = useState(false);
  const [filter, setFilter] = useState("ALL");

  const [firstBatchIsDisabled, setFirstBatchIsDisabled] = useState(true);
  const [secondBatchIsDisabled, setSecondBatchIsDisabled] = useState(true);
  const [thirdBatchIsDisabled, setThirdBatchIsDisabled] = useState(true);
  const [fourthBatchIsDisabled, setFourthBatchIsDisabled] = useState(true);
  const [fifthBatchIsDisabled, setFifthBatchIsDisabled] = useState(true);
  const [lastBatchIsDisabled, setLastBatchIsDisabled] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [coachName, setCoachName] = useState("");
  const [notes, setNotes] = useState("");
  const [timeList, setTimeList] = useState("Select Option");

  const onRefresh = React.useCallback(() => {
    // dateSetter();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // console.log(secondBatchIsDisabled);
  // const formattedDateValue = dateValue.length.slice(0, 8);
  // console.log(items);
  // console.log(reservationData);
  const onDismissSingle = React.useCallback(() => {
    onRefresh();
    setOpenCalendar(false);
  }, [setOpenCalendar]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      onRefresh();
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
            setShowSchedules(true);
          } else {
            setShowSchedules(false);
          }
        });
    });
    // setIsLoading(false);
    // }, 1000);
    // return () => clearTimeout(timer);
  }, [refreshing]);

  // var formattedDateFilter = formatDate(dateValue);
  // console.log(formattedDateFilter);
  const handleOpenModalCreateReservation = () => {
    getReservationByDate(inputDate);
  };

  const createSchedule = () => {
    notes.length === 0
      ? alert("Please fill up the following fields")
      : coachName.length === 0
      ? alert("Please fill up the following fields")
      : timeList === "Select Option"
      ? alert("Please Select Option")
      : createReservation();
  };

  const createReservation = () => {
    fetch("https://gymerls-api-staging.vercel.app/api/create-reservation", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        notes: notes,
        reservation_date: formatDate(inputDate),
        status: "Pending",
        time_slot: timeList,
        coach_name: coachName,
        added_date: formatDate(new Date()),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        cancelFunctionSchedule();
        alert("Create Reservation Complete");
      });
  };

  const getReservationByDate = () => {
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
        // console.log(first_batch.length);
        // console.log(second_batch.length);

        first_batch.length === 10
          ? setFirstBatchIsDisabled(true)
          : setFirstBatchIsDisabled(false);

        second_batch.length === 10
          ? setSecondBatchIsDisabled(true)
          : setSecondBatchIsDisabled(false);

        third_batch.length === 10
          ? setThirdBatchIsDisabled(true)
          : setThirdBatchIsDisabled(false);

        fourth_batch.length === 10
          ? setFourthBatchIsDisabled(true)
          : setFourthBatchIsDisabled(false);

        fifth_batch.length === 10
          ? setFifthBatchIsDisabled(true)
          : setFifthBatchIsDisabled(false);

        last_batch.length === 10
          ? setLastBatchIsDisabled(true)
          : setLastBatchIsDisabled(false);
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
  const formatDate = (date) => {
    var dateToFormat = new Date(date);
    var year = dateToFormat.toLocaleString("default", { year: "numeric" });
    var month = dateToFormat.toLocaleString("default", { month: "2-digit" });
    var day = dateToFormat.toLocaleString("default", { day: "2-digit" });

    var formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  };

  const cancelFunctionSchedule = () => {
    setAddNewReserve(false);
    setTimeList("Select Option");
    setExpanded(false);
  };

  // const dateSetter = () => {
  var dateFIlter = formatDate(dateValue);
  //   // console.log(dateFIlter);
  // };

  // console.log();

  {
    reservationData.map((res) => {});
  }

  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
              backgroundColor: "white",
              borderRadius: 5,
              elevation: 10,
              paddingVertical: "2%",
              justifyContent: "space-evenly",
            }}
          >
            <View
              style={{
                // flex: 1,
                // marginLeft: "2%",
                justifyContent: "center",
              }}
            >
              <Button
                style={{
                  // width: "70%",
                  backgroundColor: "white",
                  borderWidth: 0.5,
                }}
                mode="outlined"
                icon="plus"
                textColor="black"
                size={24}
                onPress={() => {
                  setAddNewReserve(true);
                  handleOpenModalCreateReservation();
                }}
              >
                SCHEDULE
              </Button>
            </View>
            <View
              style={{
                // flex: 1,
                justifyContent: "center",
                // alignItems: "flex-end",
                // marginLeft: "5%",
              }}
            >
              <Button
                mode="outlined"
                textColor="black"
                icon="filter-variant"
                iconColor="black"
                size={24}
                onPress={() => console.log("Pressed")}
              >
                {filter}
              </Button>
            </View>
            <View
              style={{
                // flex: 1,
                justifyContent: "center",
              }}
            >
              <Button
                mode="outlined"
                textColor="black"
                backgroundColor="white"
                icon="calendar"
                size={24}
                onPress={() => setOpenCalendar(true)}
              >
                {dateFIlter}
              </Button>
            </View>
            {/* <Text>ADD NEW RESERVATION</Text> */}
          </View>
          {showSchedules ? (
            <>
              <View
                style={{
                  alignItems: "center",
                  marginTop: "20%",
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "grey" }}
                >
                  No data to show/.
                </Text>
              </View>
            </>
          ) : (
            <>
              <View style={{}}>
                {reservationData.map((res) => {
                  return (
                    <View key={res.id} style={{ paddingTop: "2%" }}>
                      <View
                        style={{
                          marginTop: "2%",
                          width: "15%",
                          marginRight: "13%",
                          alignSelf: "flex-end",
                          backgroundColor: "#fff",
                          borderTopLeftRadius: 5,
                          borderTopRightRadius: 5,
                          elevation: 20,
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
                          marginBottom: "5%",
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            elevation: 10,
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
                            elevation: 10,
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
            </>
          )}
        </View>
      </ScrollView>
      {/* <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
      /> */}
      {showAddNewReserve ? (
        <>
          <View
            style={{
              position: "absolute",
              width: "100%",
              zIndex: 1,
              backgroundColor: "transparent",
              marginTop: "25%",
            }}
          >
            <View
              style={{
                padding: "2%",
                elevation: 100,
                borderRadius: 5,
                backgroundColor: "white",
                width: "90%",
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
                locale="en"
                style={{
                  marginHorizontal: "2%",
                  marginVertical: "1%",
                  backgroundColor: "white",
                }}
                value={inputDate}
                onConfirm={handleOpenModalCreateReservation()}
                onChange={(d) => {
                  setTimeList("Select Option");
                  setInputDate(d);
                }}
                inputMode="start"
                mode="outlined"
              />

              <TextInput
                onChangeText={(t) => setNotes(t)}
                setValue={setNotes}
                style={{
                  marginHorizontal: "2%",
                  marginVertical: "1%",
                  backgroundColor: "white",
                }}
                label="Note*"
                mode="outlined"
                theme={{ colors: { text: "white", primary: "black" } }}
              />
              <View>
                <Text
                  style={{
                    marginHorizontal: "2%",
                    fontSize: 12,
                    color: "grey",
                    width: "100%",
                  }}
                >
                  Please select time slot
                </Text>
                <List.Accordion
                  titleStyle={{ fontWeight: "600" }}
                  title={timeList}
                  expanded={expanded}
                  onPress={() => {
                    expanded === true ? setExpanded(false) : setExpanded(true);
                  }}
                  theme={{ colors: { text: "white", primary: "black" } }}
                  style={{
                    marginVertical: "1%",
                    borderRadius: 5,
                    borderWidth: 0.5,
                    width: "95%",
                    alignSelf: "center",
                    backgroundColor: "#fff",
                    zIndex: 10,
                  }}
                >
                  <View
                    style={{
                      borderWidth: 0.5,
                      borderRadius: 5,
                      width: "95%",
                      alignSelf: "center",
                      position: "absolute",
                      backgroundColor: "white",
                      zIndex: 10,
                      marginTop: "20%",
                    }}
                  >
                    <List.Item
                      titleStyle={[
                        styles.listItem,
                        firstBatchIsDisabled === true
                          ? styles.listItemDisabled
                          : styles.listItem,
                      ]}
                      disabled={firstBatchIsDisabled}
                      style={{ height: 45, zIndex: 200 }}
                      title="7-9AM"
                      onPress={() => {
                        setTimeList("7-9AM");
                        setExpanded(false);
                      }}
                    />
                    <List.Item
                      titleStyle={[
                        styles.listItem,
                        secondBatchIsDisabled === true
                          ? styles.listItemDisabled
                          : styles.listItem,
                      ]}
                      disabled={secondBatchIsDisabled}
                      style={{ height: 45 }}
                      title="9-11AM"
                      onPress={() => {
                        setTimeList("9-11AM");
                        setExpanded(false);
                      }}
                    />
                    <List.Item
                      titleStyle={[
                        styles.listItem,
                        thirdBatchIsDisabled === true
                          ? styles.listItemDisabled
                          : styles.listItem,
                      ]}
                      disabled={thirdBatchIsDisabled}
                      style={{ height: 45 }}
                      title="1-3PM"
                      onPress={() => {
                        setTimeList("1-3PM");
                        setExpanded(false);
                      }}
                    />
                    <List.Item
                      titleStyle={[
                        styles.listItem,
                        fourthBatchIsDisabled === true
                          ? styles.listItemDisabled
                          : styles.listItem,
                      ]}
                      disabled={fourthBatchIsDisabled}
                      style={{ height: 45 }}
                      title="3-5PM"
                      onPress={() => {
                        setTimeList("3-5PM");
                        setExpanded(false);
                      }}
                    />
                    <List.Item
                      titleStyle={[
                        styles.listItem,
                        fifthBatchIsDisabled === true
                          ? styles.listItemDisabled
                          : styles.listItem,
                      ]}
                      disabled={fifthBatchIsDisabled}
                      style={{ height: 45 }}
                      title="5-7PM"
                      onPress={() => {
                        setTimeList("5-7PM");
                        setExpanded(false);
                      }}
                    />
                    <List.Item
                      titleStyle={[
                        styles.listItem,
                        lastBatchIsDisabled === true
                          ? styles.listItemDisabled
                          : styles.listItem,
                      ]}
                      disabled={lastBatchIsDisabled}
                      style={{ height: 45 }}
                      title="7-9PM"
                      onPress={() => {
                        setTimeList("7-9PM");
                        setExpanded(false);
                      }}
                    />
                  </View>
                </List.Accordion>
              </View>

              <TextInput
                label="Coach*"
                mode="outlined"
                onChangeText={(text) => setCoachName(text)}
                setValue={setCoachName}
                style={{
                  width: "95%",
                  alignSelf: "center",
                  backgroundColor: "white",
                  zIndex: -2,
                }}
                theme={{ colors: { text: "white", primary: "black" } }}
              />
              <View
                style={{
                  flexDirection: "row",
                  zIndex: -10,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    marginVertical: "2%",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      cancelFunctionSchedule();
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
                      createSchedule();
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
    backgroundColor: "white",
    marginTop: "10%",
    padding: 10,
    borderRadius: 10,
    elevation: 10,
  },
  headertext: {
    fontSize: 30,
    // color: "#fff",
    fontWeight: 700,
  },
  pending: {
    backgroundColor: "#FF7700",
    flex: 2,
    justifyContent: "center",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    elevation: 10,
  },
  confirmed: {
    flex: 2,
    justifyContent: "center",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#1A5D1A",
    elevation: 10,
  },
  completed: {
    backgroundColor: "#3AB0FF",
    flex: 2,
    justifyContent: "center",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    elevation: 10,
  },
  cancelled: {
    flex: 2,
    justifyContent: "center",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#C21010",
    elevation: 10,
  },
  declined: {
    flex: 2,
    justifyContent: "center",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#95389E",
    elevation: 10,
  },
  listItem: { fontSize: 12, fontWeight: "800", zIndex: 10 },
  listItemDisabled: {
    fontSize: 12,
    fontWeight: "800",
    color: "grey",
    zIndex: 10,
  },
});
export default Scheduleindex;
