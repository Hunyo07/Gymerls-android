import { Link, Redirect, Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { block } from "react-native-reanimated";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, MD2Colors, Button } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";

const Tab4Index = ({ disabled }) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [showError, setShowError] = useState(false);
  const [mealPlanning, setMealPlanning] = useState("");
  const [show, setShow] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    getData(function (callback) {
      fetch("https://gymerls.cyclic.app/api/meal-plan", {
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
          if (meals.length === 0) {
            console.log("wala ka pang kaen!");
            setShowError(true);
            setShow(true);
            setTimeout(() => {
              setShow(false);
            }, 300);
          } else {
            setShow(true);
            setTimeout(() => {
              setShow(false);
            }, 300);
            setShowError(false);
          }
          setMealPlanning(meals);
        });
    });
  }, []);

  const getData = async (callback) => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        setUsername(value);
        callback(value);
      } else {
        console.log("walang makuha boy!");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const routeToSunday = (count) => {
    if (count === 2) {
      // setIsDisabled(true)
      router.push("dailymeals/sunday");
      console.log(count);
    } else {
      // setIsDisabled(false)
      console.log(count);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.activityindicator}>
        <ActivityIndicator
          animating={show}
          size={"large"}
          color={MD2Colors.grey900}
        />
      </View>
      <View style={styles.mealcontainer}>
        <Text style={styles.headertext}>MEAL PLAN</Text>
      </View>

      <View style={styles.weekcontainer}>
        {showError ? (
          <>
            <View>
              <Text
                style={{
                  fontFamily: "EncodeSansSemiCondensed_700Bold",
                  color: "grey",
                }}
              >
                It looks like you don't have meal plan yet.
              </Text>
              <Text
                style={{
                  fontFamily: "EncodeSansSemiCondensed_700Bold",
                  color: "grey",
                }}
              >
                Please contact your coach.
              </Text>
            </View>
          </>
        ) : (
          <>
            <TouchableOpacity
              disabled={isDisabled}
              style={styles.linkcontainer}
              onPress={() => {
                var count = 1;
                router.push("../meal/sunday");
                // routeToSunday(count);
              }}
            >
              <Text style={styles.text}>Sunday</Text>
              <Text style={styles.icon}>
                {" "}
                <AntDesign name="rightcircleo" size={24} color="black" />{" "}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              leOpacity
              style={styles.linkcontainer}
              onPress={() => {
                router.push("../meal/monday");
              }}
            >
              <Text style={styles.text}>Monday</Text>
              <Text style={styles.icon}>
                <AntDesign name="rightcircleo" size={24} color="black" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkcontainer}
              onPress={() => {
                router.push("../meal/tuesday");
              }}
            >
              <Text style={styles.text}>Tuesday</Text>
              <Text style={styles.icon}>
                <AntDesign name="rightcircleo" size={24} color="black" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkcontainer}
              onPress={() => {
                router.push("../meal/wednesday");
              }}
            >
              <Text style={styles.text}>Wednesday</Text>
              <Text style={styles.icon}>
                <AntDesign name="rightcircleo" size={24} color="black" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkcontainer}
              onPress={() => {
                router.push("../meal/thursday");
              }}
            >
              <Text style={styles.text}>Thursday</Text>
              <Text style={styles.icon}>
                <AntDesign name="rightcircleo" size={24} color="black" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkcontainer}
              onPress={() => {
                router.push("../meal/friday");
              }}
            >
              <Text style={styles.text}>Friday</Text>
              <Text style={styles.icon}>
                <AntDesign name="rightcircleo" size={24} color="black" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkcontainer}
              onPress={() => {
                router.push("../meal/saturday");
              }}
            >
              <Text style={styles.text}>Saturday</Text>
              <Text style={styles.icon}>
                <AntDesign name="rightcircleo" size={24} color="black" />
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  mealcontainer: {
    alignItems: "center",
    alignSelf: "center",
    width: "98%",
    backgroundColor: "#023047",
    marginVertical: 40,
    padding: 10,
    borderRadius: 10,
  },
  headertext: {
    fontSize: 30,
    color: "#fff",
    fontWeight: 700,
  },
  daystext: {
    fontSize: 25,
    marginVertical: 10,
    borderRadius: 10,
    fontWeight: "bold",
    marginLeft: 20,
    backgroundColor: "red",
    width: "70%",
    // textAlign:'right',
  },
  linkcontainer: {
    backgroundColor: "#fff",
    width: "92%",
    borderRadius: 10,
    marginVertical: 8,
    flexDirection: "row",
    borderColor: "#fff",
    borderWidth: 1,
    elevation: 10,
  },
  text: {
    fontSize: 25,
    marginVertical: 10,
    borderRadius: 10,
    fontWeight: "bold",
    marginLeft: 20,
    // backgroundColor:'red',
    width: "70%",
    flex: 4,
  },
  weekcontainer: {
    flex: 1,
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 13,
    justifyContent: "space-evenly",
    marginBottom: 20,
    elevation: 3,
  },
  icon: {
    marginVertical: 15,
    // backgroundColor:'blue',
    // width:'90%',
    textAlign: "right",
    alignSelf: "flex-end",
    flex: 2,
    marginRight: 20,
    // paddingVertical:3,
  },
  activityindicator: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    height: "100%",
  },
});

export default Tab4Index;
