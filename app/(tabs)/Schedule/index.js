import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

const Scheduleindex = () => {
  return (
    <View>
      <View style={styles.mealcontainer}>
        <Text style={styles.headertext}>SCHEDULE</Text>
      </View>

      <View>
        <ScrollView></ScrollView>
      </View>
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
});
export default Scheduleindex;
