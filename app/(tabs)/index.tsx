import {
  Image,
  StyleSheet,
  useWindowDimensions,
  View,
  Dimensions,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ChartComponent from "@/components/ChartComponent";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        dark: "#000",
        light: "#fff",
      }}
    >
      <View style={styles.titleContainer}>
        <ChartComponent />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    height: height,
    width: width,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    borderWidth: 0,
    justifyContent: "center",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
