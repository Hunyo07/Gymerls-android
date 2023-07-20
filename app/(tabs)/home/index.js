import { Link, Redirect, Stack, useRouter } from "expo-router";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { AuthStore } from "../../../store";
import Guyjumpingrope3 from "../../../assets/images/Guyjumpingrope3.png";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomInput from "../../(Component)/CustomInput";
import SideProfile from "../../(Component)/SideProfile";
import { ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Tab1Index = () => {
  const router = useRouter();
  const [mealPlanning, setMealPlanning] = useState([]);
  const [username, setUsername] = useState("");
  const [newReservationData, setNewReservationData] = useState([]);
  const [showSchedToday, setShowSchedToday] = useState(true);

  const formatDate = (date) => {
    var dateToFormat = new Date(date);
    var year = dateToFormat.toLocaleString("default", { year: "numeric" });
    var month = dateToFormat.toLocaleString("default", { month: "2-digit" });
    var day = dateToFormat.toLocaleString("default", { day: "2-digit" });

    var formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  };

  useEffect(() => {
    const formattedDate = formatDate(new Date());
    getDataSchedules(function (callback) {
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
        .then((res) => res.json())
        .then((result) => {
          setNewReservationData(result);
          newReservationData.length !== 0
            ? setShowSchedToday(true)
            : setShowSchedToday(false);
        });
    });

    getData(function (callback) {
      fetch("https://gymerls-api-staging.vercel.app/api/meal-plan", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: callback,
        }),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (meals) {
          setMealPlanning(meals);
        });
    });
  }, [newReservationData]);

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
  const getDataSchedules = async (sched) => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        setUsername(value);
        sched(value);
      } else {
      }
    } catch (e) {}
  };
  //   const logOut = async () => {
  //     AuthStore.update((s) => {
  //       s.isLoggedIn = true;
  //     });
  //     router.replace("/login");
  //     try {
  //         await AsyncStorage.removeItem('username');
  //         return true;
  //     }
  //     catch(exception) {
  //         return false;
  //     }
  // }
  // const onLogoutPressed = () =>{
  //   console.warn('Logout');
  // }

  return (
    <View>
      <ScrollView style={{ width: "100%" }}>
        <View>
          <View style={styles.container}>
            <View style={styles.textcontainer}>
              <Text style={styles.textuser}>Hi,{username} !</Text>
              <View style={styles.container}></View>
            </View>
            <View style={styles.togglebutton}>
              <TouchableOpacity
                onPress={() => {
                  router.push("../../(Component)/SideProfile");
                }}
              >
                <View style={styles.icon}>
                  <MaterialCommunityIcons
                    name="account-circle"
                    size={44}
                    color="black"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={styles.sectioncontainer}>
              <View style={styles.sectiontextcontainer}>
                <Text style={styles.sectiontext}>
                  Today is Great Day to be fit!
                </Text>
              </View>
              <View style={styles.personcontainer}>
                <Image source={Guyjumpingrope3} style={styles.jumpingrope} />
              </View>
            </View>
          </View>
        </View>

        <View>
          <View
            style={{
              marginHorizontal: "3%",
              borderRadius: 5,
              paddingTop: "2%",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "EncodeSansSemiCondensed_700Bold",
                backgroundColor: "white",
                padding: "3%",
                borderRadius: 5,
                marginBottom: "2%",
                color: "#444",
                elevation: 5,
                textAlignVertical: "center",
              }}
            >
              <MaterialIcons name="schedule" size={26} color="#444" /> Todays
              Schedules!
            </Text>
          </View>

          <View>
            {showSchedToday ? (
              <>
                <View
                  style={{
                    backgroundColor: "white",
                    width: "95%",
                    borderRadius: 5,
                    alignSelf: "center",
                    elevation: 5,
                    marginBottom: "3%",
                  }}
                >
                  {newReservationData.map((res) => {
                    return (
                      <View key={res.id} style={{ paddingTop: "2%" }}>
                        <View
                          style={{
                            width: "93%",
                            flexDirection: "row",
                            alignSelf: "center",
                            marginBottom: "5%",
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              backgroundColor: "#1687A7",
                              padding: "3%",
                              borderBottomLeftRadius: 10,
                              borderTopLeftRadius: 10,
                              elevation: 2,
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
                                // padding: "5%",
                                // color: "white",
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
                              elevation: 3,
                              flex: 4,
                              padding: "2%",
                              backgroundColor: "#FFFFFF",
                              flexDirection: "column",
                            }}
                          >
                            {/* <View style={{ flexDirection: "column" }}> */}
                            <View style={{ flex: 4, justifyContent: "center" }}>
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
                                  // height: 20,
                                  // alignSelf:"flex-start"
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
            ) : (
              <>
                <View
                  style={{
                    paddingHorizontal: "2%",
                    marginHorizontal: "5%",
                    backgroundColor: "#fff",
                    borderRadius: 5,
                    marginBottom: "5%",
                  }}
                >
                  <Text
                    style={{
                      padding: "3%",
                      alignSelf: "center",
                      fontFamily: "EncodeSansSemiCondensed_600SemiBold",
                      fontSize: 18,
                      color: "grey",
                    }}
                  >
                    No schedules today/.
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {},
  container: {
    flexDirection: "row",
  },
  textcontainer: {
    flex: 2,
    alignItems: "center",
    marginTop: "10%",
    marginLeft: "6%",
    marginBottom: "4%",
    // backgroundColor: "white",
    padding: "1%",
    borderRadius: 5,
    // elevation: 10,
  },
  textuser: {
    fontSize: 40,
    fontWeight: 600,
    color: "#444",
  },
  togglebutton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
    marginLeft: "10%",
    marginBottom: "4%",
    padding: "1%",
    borderRadius: 5,
  },
  sectioncontainer: {
    flexDirection: "row",
    height: 200,
    width: "90%",
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "#023047",
    elevation: 10,
    paddingRight: 5,
    justifyContent: "center",
  },
  sectiontextcontainer: {
    flex: 3,
    marginLeft: "5%",
    alignSelf: "center",
  },
  sectiontext: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  jumpingrope: {
    height: 50,
    flex: 3,
    width: 130,
  },
  icon: {
    width: "100%",
    backgroundColor: "transparent",
    borderRadius: 50,
  },
  pending: {
    backgroundColor: "#ed6c02",
    flex: 2,
    justifyContent: "center",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    elevation: 2,
  },
  confirmed: {
    flex: 2,
    justifyContent: "center",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#2e7d32",
    elevation: 2,
  },
  completed: {
    backgroundColor: "#1976d2",
    flex: 2,
    justifyContent: "center",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    elevation: 2,
  },
  cancelled: {
    flex: 2,
    justifyContent: "center",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#d32f2f",
    elevation: 2,
  },
  declined: {
    flex: 2,
    justifyContent: "center",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#9c27b0",
    elevation: 2,
  },
});
export default Tab1Index;
