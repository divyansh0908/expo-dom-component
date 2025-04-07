import {
  Image,
  StyleSheet,
  useWindowDimensions,
  View,
  Dimensions,
  Text,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ChartComponent from "@/components/RichTextEditor/RichTextEditor";
import { useState } from "react";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const [editorState, setEditorState] = useState<string | null>(null);
  const [plainText, setPlainText] = useState("");
  const wordCount = editorState?.split(" ").length ?? 0;

  return (
    <>
      <View style={{ padding: 32, margin: 12, marginTop: 100, backgroundColor: "#f87171", borderRadius: 8 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>📱 Native Side</Text>
        <Text style={{ fontSize: 16, marginVertical: 10 }}>{plainText}</Text>
        <Text style={{ fontSize: 16 }}>Words: {wordCount}</Text>
      </View>
      <View style={styles.titleContainer}>
        <ChartComponent
          setEditorState={setEditorState}
          setPlainText={setPlainText}
        />
      </View>
    </>
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
