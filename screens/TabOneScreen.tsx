import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import ImgPicker from "../components/ImgPicker";
import { ImgPickerType } from "../types/common";

export default function TabOneScreen(): JSX.Element {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImgPicker type={ImgPickerType.AUTOTAG} title="Image Auto Tagger" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
