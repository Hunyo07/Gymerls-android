import { Link, Redirect, Stack, useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Entypo } from "@expo/vector-icons";
import CustomInput from "../../(Component)/CustomInput";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

const Tab4Index = () => {
  const router = useRouter();
  const [mealPlanning, setMealPlanning] = useState([]);
  const [username, setUsername] = useState("");
  const [show, setShow] = useState("");

  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
      router.push("./saturday");
    }, 100);
    getData(function (callback) {
      fetch("https://gymerls-api.vercel.app/api/meal-plan", {
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
  }, []);

  const getData = async (callback) => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        setUsername(value);
        callback(value);
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.gobackbutton}>
        <TouchableOpacity
          onPress={() => {
            router.push("../meal");
          }}
        >
          <Entypo name="chevron-small-left" size={45} />
        </TouchableOpacity>
      </View>
      <View style={styles.activityindicator}>
        <ActivityIndicator
          animating={show}
          size={"large"}
          color={MD2Colors.grey900}
        />
      </View>
      {mealPlanning.map((meals) => {
        return (
          <View key={meals.id}>
            <View style={styles.elavation}>
              <Text style={styles.headertext}>SATURDAY</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.breakfasttext}>
                <MaterialIcons name="free-breakfast" size={26} color="black" />{" "}
                BREAK FAST
              </Text>
              <CustomInput
                placeholder="Morning"
                editable={false}
                style={styles.input}
                value={meals.sat_bf_meal}
              />
              <Text style={styles.breakfasttext}>
                <MaterialIcons name="lunch-dining" size={26} color="black" />{" "}
                LUNCH
              </Text>
              <CustomInput
                placeholder="Afternoon"
                editable={false}
                value={meals.sat_lunch_meal}
              />
              <Text style={styles.breakfasttext}>
                <MaterialIcons name="dinner-dining" size={26} color="black" />{" "}
                DINNER
              </Text>
              <CustomInput
                placeholder="Dinner"
                editable={false}
                value={meals.sat_dinner_meal}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  gobackbutton: {
    top: "6%",
    width: "11%",
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 100,
    elevation: 6,
    alignItems: "center",
    marginHorizontal: 8,
  },
  elavation: {
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
    backgroundColor: "#fff",
    marginVertical: 20,
    padding: 10,
    borderRadius: 10,
    elevation: 10,
  },
  headertext: {
    fontSize: 30,
    color: "black",
    fontWeight: 700,
  },
  card: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    elevation: 10,
  },
  breakfasttext: {
    marginLeft: 20,
    fontSize: 25,
    fontWeight: 400,
    marginVertical: 10,
  },
  activityindicator: {
    height: "100%",
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default Tab4Index;