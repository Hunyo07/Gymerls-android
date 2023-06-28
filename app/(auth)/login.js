import {
  Text,
  View,
  StyleSheet,
  editable,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { AuthStore } from "../../store.js";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import CustomButton from "../(Component)/CustomButton.js";
// import CustomInput from "../(Component)/CustomInput.js";
import { useHandler } from "react-native-reanimated";
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Padlock from "../../assets/images/Padlock.png";

export default function LogIn() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const [Item, setItem] = useState("");

  const storeData = async (username) => {
    try {
      await AsyncStorage.setItem("username", username);
    } catch (e) {
      // saving error
    }
  };

  const storeDataPass = async (password) => {
    try {
      await AsyncStorage.setItem("password", password);
    } catch (e) {
      // saving error
    }
  };

  const loginUser = () => {
    // GET METHOD
    // fetch('https://gymerls.cyclic.app/api/users')
    // .then(function(response){
    //     return response.json();
    // })
    // .then(function(data){
    //     console.log(data);
    //   })

    // POST METHOD
    fetch("https://gymerls.cyclic.app/api/get-user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (userData) {
        if (userData.length === 0) {
          setShowAuth(true);
        } else {
          if (userData[0].role !== "user") {
            setShowAuth(true);
          } else {
            var password = userData[0].password;
            var username = userData[0].username;
            storeData(username);
            storeDataPass(password);
            router.replace("/(tabs)/home");
          }
        }
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Login" }} />
      {showAuth ? (
        <>
          <View
            style={{
              backgroundColor: "transparent",
              position: "absolute",
              zIndex: 1,
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                width: "70%",
                padding: "5%",
                elevation: 500,
                borderWidth: 0.5,
                borderColor: "grey",
              }}
            >
              <Text style={{ fontSize: 15 }}>
                ! Username or password you've enter is incorrect.
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowAuth(false);
                }}
                style={{
                  backgroundColor: "#1976D2",
                  borderRadius: 5,
                  justifyContent: "center",
                  marginTop: "3%",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    padding: "2%",
                    alignSelf: "center",
                    borderRadius: 10,
                  }}
                >
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <></>
      )}

      <View>
        <Image source={Padlock} style={styles.Padlock} resizeMode="contain" />
      </View>

      <View style={styles.passwordinput}>
        <TextInput
          mode="outlined"
          setValue={setUsername}
          label="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          theme={{ colors: { text: "white", primary: "black" } }}
        />
      </View>

      <View style={styles.passwordinput}>
        <TextInput
          mode="outlined"
          setValue={setPassword}
          label="Password"
          // backgroundColor="white"
          secureTextEntry={!passwordVisible}
          right={
            <TextInput.Icon
              icon={passwordVisible ? "eye" : "eye-off"}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
          value={password}
          onChangeText={(text) => setPassword(text)}
          theme={{ colors: { text: "white", primary: "black" } }}
        />
      </View>
      <CustomButton
        text="Sign In"
        style={styles.loginbutton}
        onPress={() => loginUser()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loginbutton: {
    width: "90%",
    backgroundColor: "#1976D2",
    alignItems: "center",
    borderRadius: 5,
    alignSelf: "center",
  },
  passwordinput: {
    width: "90%",
    marginVertical: 10,
  },
  Padlock: {
    width: 150,
    marginVertical: 20,
    alignSelf: "center",
  },
});
