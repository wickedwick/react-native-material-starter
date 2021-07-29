import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import ImgPicker from "../components/ImgPicker";
import { ImgPickerType } from "../types/common";

export default function TabTwoScreen(): JSX.Element {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImgPicker type={ImgPickerType.CELEB} title="Celebrity Guesser" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
