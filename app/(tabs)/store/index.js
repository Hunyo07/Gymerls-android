import { Link, Redirect, Stack, useRouter } from "expo-router";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import MyComponent from "../../(Component)/CustomSearchBar";
import portein from "../../../assets/images/portien.jpg";
import { Card, Button } from "react-native-paper";
import Item from "../../(Component)/Item";

const Tab5Index = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.root}>
        <View style={styles.mealcontainer}>
          <Text style={styles.headertext}>STORE</Text>
        </View>
        <View style={{ width: "98%", alignSelf: "center", marginTop: "1%" }}>
          <MyComponent />
        </View>
        <View style={styles.item}>
          <Item
            Image={portein}
            Product={"Whey Powder"}
            style={{ flex: 2 }}
            Price={120 + " Perkg"}
          />
          <Item
            Image={require("../../../assets/images/glutamine.png")}
            style={{ flex: 2 }}
            Product={"Glutamine"}
          />
        </View>
        <View style={styles.item}>
          <Item
            Image={{
              uri: "https://5.imimg.com/data5/BI/FH/WF/SELLER-9367890/gym-body-protein-powder-nutrition-supplement-500g-500x500.jpg",
            }}
            Product={"Gym Body Powder"}
            style={{ flex: 2 }}
            Price={120 + " Perkg"}
          />
          <Item
            Image={{
              uri: "https://www.wisechoicesupplements.ph/wp-content/uploads/2020/02/CELL.png",
            }}
            style={{ flex: 2 }}
            Product={"Muscle Tech"}
          />
        </View>
        <View style={styles.item}>
          <Item
            Image={{
              uri: "https://cdn.shopify.com/s/files/1/0471/3332/7519/products/JYM5990325-61121_grey_465x.jpg?v=1658437032",
            }}
            Product={"Pro Gym Powder"}
            style={{ flex: 2 }}
            Price={120 + " Perkg"}
          />
          <Item
            Image={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQq9SZ6c-zagLySvg8EFLjSAuu6hpyAsQnOQ&usqp=CAU",
            }}
            style={{ flex: 2 }}
            Product={"Avvalar Whey Protein"}
          />
        </View>
        <View style={styles.item}>
          <Item
            Image={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-PNWDx0mVCVHrFKtiyVAqI_rQ7SnnpUdmcA&usqp=CAU",
            }}
            Product={"Protein Powder"}
            style={{ flex: 2 }}
            Price={120 + " Perkg"}
          />

          <Item
            Image={{
              uri: "https://w7.pngwing.com/pngs/1003/164/png-transparent-dietary-supplement-creatine-bodybuilding-supplement-nutrition-serving-size-universal-nutrition-whey-dietary-supplement.png",
            }}
            style={{ flex: 2 }}
            Product={"Creatine"}
          />
        </View>
      </ScrollView>
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
  item: {
    width: "100%",
    flexDirection: "row",
    // height: "20%",
    justifyContent: "space-evenly",
    marginTop: "2%",
    padding: "2%",
  },
});
export default Tab5Index;
