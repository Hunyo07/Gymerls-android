import { View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";

export default function Details() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Detail Screen" }} />
      <Text
        onPress={() => {
          router.back();
        }}
      >
        GO BACK
      </Text>
    </View>
  );
}

//https://fonts.google.com/specimen/Encode+Sans+Semi+Condensed
