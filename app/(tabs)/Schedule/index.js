import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  RefreshControl,
} from "react-native";
import React from "react";
import { DatePickerModal, es, tr } from "react-native-paper-dates";
import { Button, List } from "react-native-paper";
import { useState, useEffect, useCallback, useRef } from "react";
import { DatePickerInput } from "react-native-paper-dates";
const { width } = Dimensions.get("window");

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  IconButton,
  MD3Colors,
  TextInput,
  ActivityIndicator,
} from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
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
  const [showSchedules, setShowSchedules] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");
  const [newReservationData, setNewReservationData] = useState([]);
  const [membershipType, setMembershipType] = useState("");
  const [firstBatchIsDisabled, setFirstBatchIsDisabled] = useState(true);
  const [secondBatchIsDisabled, setSecondBatchIsDisabled] = useState(true);
  const [thirdBatchIsDisabled, setThirdBatchIsDisabled] = useState(true);
  const [fourthBatchIsDisabled, setFourthBatchIsDisabled] = useState(true);
  const [fifthBatchIsDisabled, setFifthBatchIsDisabled] = useState(true);
  const [lastBatchIsDisabled, setLastBatchIsDisabled] = useState(true);
  const [showSchedByMemberTypeShip, setShowSchedByMemberTypeShip] =
    useState(true);

  const [refreshing, setRefreshing] = React.useState(false);
  const [coachName, setCoachName] = useState("");
  const [notes, setNotes] = useState("");
  const [timeList, setTimeList] = useState("Select Option");

  const citiesDropdownRef = useRef();

  const onRefresh = React.useCallback(() => {
    setFilterStatus("All");
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const onDismissSingle = React.useCallback(() => {
    onFilterStatus();
    onRefresh();
    setOpenCalendar(false);
  }, [setOpenCalendar]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      onFilterStatus();
      onRefresh();
      setOpenCalendar(false);
      setDateValue(params.date);
    },
    [setOpenCalendar, setDateValue]
  );
  const setterFilterOptions = [
    "All",
    "Pending",
    "Confirmed",
    "Cancelled",
    "Declined",
    "Completed",
  ];

  const getUserData = async (membership_type) => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        setMembershipType(value);
        membership_type(value);
      } else {
      }
    } catch (e) {}
  };

  useEffect(() => {
    var formattedDate = formatDate(dateValue);

    getUserData(function (membership_type) {
      fetch("https://gymerls-api-staging.vercel.app/api/get-user-by-username", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: membership_type,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          res[0].membership_type !== "Premium"
            ? setShowSchedByMemberTypeShip(false)
            : setShowSchedByMemberTypeShip(true);
        });
    });
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
          if (filterStatus === "All") {
            setNewReservationData(data);
            reservationData.length !== 0
              ? setShowSchedules(false)
              : setShowSchedules(true);
          }
          setReservationData(data);
        });
    });
  }, [refreshing, reservationData]);

  const onFilterStatus = (selectedItem) => {
    const newData = reservationData.filter((item) => {
      return item.status === selectedItem;
    });
    if (selectedItem == "All") {
      onRefresh();
    }
    setNewReservationData(newData);
    if (newData.length === 0) {
      setShowSchedules(true);
    } else {
      setShowSchedules(false);
    }
  };

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
      : formatDate(new Date()) <= formatDate(inputDate)
      ? createReservation()
      : alert("Cannot make reservation on " + formatDate(inputDate));
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
        var first_batch = [];
        var second_batch = [];
        var third_batch = [];
        var fourth_batch = [];
        var fifth_batch = [];
        var last_batch = [];

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

  var dateFIlter = formatDate(dateValue);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.mealcontainer}>
          <Text style={styles.headertext}>SCHEDULE</Text>
        </View>
        {showSchedByMemberTypeShip ? (
          <>
            <View
              style={{
                justifyContent: "center",
                flex: 1,
                alignItems: "center",
              }}
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
                width: "100%",
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
                  marginBottom: "5%",
                  justifyContent: "space-evenly",
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <Button
                    style={{
                      backgroundColor: "white",
                      borderWidth: 1,
                      borderColor: "grey",
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
                    Sched
                  </Button>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <SelectDropdown
                    data={setterFilterOptions}
                    onSelect={(selectedItem, index) => {
                      setFilterStatus(selectedItem);
                      onFilterStatus(selectedItem);
                    }}
                    defaultButtonText={"All"}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return filterStatus;
                      // return selectedItem;
                    }}
                    defaultValueByIndex={0}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={(isOpened) => {
                      return (
                        <FontAwesome
                          name={isOpened ? "chevron-up" : "chevron-down"}
                          color={"#444"}
                          size={18}
                        />
                      );
                    }}
                    dropdownIconPosition={"right"}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                  />
                </View>
                <View
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <Button
                    style={{
                      backgroundColor: "white",
                      borderWidth: 1,
                      borderColor: "grey",
                    }}
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
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "grey",
                      }}
                    >
                      No data to show/.
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  <View>
                    {newReservationData.map((res) => {
                      return (
                        <View key={res.id} style={{ paddingTop: "2%" }}>
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
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={{
                                  fontWeight: "700",
                                  fontSize: 30,
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
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: "#444",
                                  alignSelf: "center",
                                  fontWeight: "700",
                                }}
                              >
                                {res.time_slot}
                              </Text>
                            </View>
                            <View
                              style={{
                                elevation: 10,
                                flex: 4,
                                padding: "2%",
                                backgroundColor: "#FFFFFF",
                                flexDirection: "column",
                              }}
                            >
                              <View
                                style={{ flex: 4, justifyContent: "center" }}
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
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  borderTopWidth: 1,
                                  borderColor: "grey",
                                  justifyContent: "center",
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 12,
                                    fontWeight: "600",
                                    color: "#444",
                                  }}
                                >
                                  {res.coach_name}
                                </Text>
                              </View>
                            </View>
                            {/* </View> */}
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
                              ]}
                            >
                              <Text
                                style={{
                                  alignSelf: "center",
                                  color: "#ffff",

                                  fontFamily: "EncodeSansSemiCondensed_700Bold",
                                  letterSpacing: 1,
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
          </>
        ) : (
          <>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginVertical: "20%",
              }}
            >
              <Text
                style={{
                  fontFamily: "EncodeSansSemiCondensed_700Bold",
                  fontSize: 18,
                  color: "grey",
                }}
              >
                Upgrade to premuim now!
              </Text>
            </View>
          </>
        )}
      </ScrollView>

      {showAddNewReserve ? (
        <>
          <View
            style={{
              position: "absolute",
              width: "100%",
              zIndex: 1,
              backgroundColor: "transparent",
              marginVertical: "20%",
              elevation: 500,
            }}
          >
            <View
              style={{
                padding: "2%",
                elevation: 100,
                borderRadius: 5,
                backgroundColor: "white",
                width: "90%",
                marginVertical: "20%",
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
                  marginVertical: "4%",
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
                    <Text style={{ fontWeight: 600, color: "#444" }}>
                      CANCEL
                    </Text>
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
                    <Text style={{ fontWeight: 600, color: "#444" }}>
                      CREATE
                    </Text>
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
    backgroundColor: "#ed6c02",
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
    backgroundColor: "#2e7d32",
    elevation: 10,
  },
  completed: {
    backgroundColor: "#1976d2",
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
    backgroundColor: "#d32f2f",
    elevation: 10,
  },
  declined: {
    flex: 2,
    justifyContent: "center",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#9c27b0",
    elevation: 10,
  },
  listItem: { fontSize: 12, fontWeight: "800", zIndex: 10 },
  listItemDisabled: {
    fontSize: 12,
    fontWeight: "800",
    color: "grey",
    zIndex: 10,
  },

  dropdown1BtnStyle: {
    width: 134,
    // flex: 5,
    height: 43,
    backgroundColor: "#FFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "grey",
  },
  dropdown1BtnTxtStyle: {
    color: "black",
    textAlign: "left",
    fontSize: 15,
    fontWeight: "500",
  },
  dropdown1DropdownStyle: {
    backgroundColor: "white",
    borderRadius: 5,
  },
  // dropdown1RowStyle: {
  //   backgroundColor: "#EFEFEF",
  //   borderBottomColor: "#C5C5C5",
  // },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left", fontWeight: "500" },
  // divider: { width: 12 },
  // dropdown2BtnStyle: {
  //   flex: 1,
  //   height: 50,
  //   backgroundColor: "#FFF",
  //   // borderRadius: 8,
  //   borderWidth: 1,
  //   borderColor: "#444",
  // },
  // dropdown2BtnTxtStyle: { color: "#444", textAlign: "left" },
  // dropdown2DropdownStyle: { backgroundColor: "#EFEFEF" },
  // dropdown2RowStyle: {
  //   backgroundColor: "#EFEFEF",
  //   borderBottomColor: "#C5C5C5",
  // },
  // dropdown2RowTxtStyle: { color: "#444", textAlign: "left" },
});
export default Scheduleindex;
