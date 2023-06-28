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

const Tab1Index = () => {
  const [showProfile, setShowProfile] = useState(false);

  const router = useRouter();
  const [mealPlanning, setMealPlanning] = useState([]);
  const [username, setUsername] = useState("");

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
          setMealPlanning(meals);
        });
    });
  }, []);

  const getData = async (callback) => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        // value previously stored
        setUsername(value);
        callback(value);
      } else {
        console.log("walang makuha boy!");
      }
    } catch (e) {
      // error reading value
      // console.log(e);
    }
  };
  //   const logOut = async () => {
  //     AuthStore.update((s) => {
  //       s.isLoggedIn = true;
  //     });
  //     router.replace("/login");
  //     try {
  //         await AsyncStorage.removeItem('username');
  //         console.log('naka log out kana pre!');
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
    <View style={{ flex: 1, alignItems: "center" }}>
      <Stack.Screen options={{ headerShown: false, title: "Home" }} />

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

      {showProfile ? <>{/* <SideProfile/> */}</> : <></>}
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    height: "100%",
  },
  container: {
    width: "100%",
    flexDirection: "row",
  },
  textcontainer: {
    flex: 4,
    marginTop: "28%",
    marginLeft: "10%",
    marginBottom: "4%",
  },
  textuser: {
    fontSize: 40,
    fontWeight: 600,
  },
  togglebutton: {
    justifyContent: "center",
    flex: 1,
    marginVertical: "12%",
    marginHorizontal: "2%",
    alignItems: "center",
    borderRadius: 10,
  },
  sectioncontainer: {
    flexDirection: "row",
    height: "60%",
    width: "90%",
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "#023047",
    elevation: 55,
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
});
export default Tab1Index;
