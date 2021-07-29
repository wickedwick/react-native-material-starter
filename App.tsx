import { StatusBar } from "expo-status-bar";
import React from "react";
import { BottomNav } from "./navigation/BottomTabNavigator";
import { Provider as PaperProvider } from "react-native-paper";
import theme from "./constants/Theme";

export default function App(): JSX.Element {
  return (
    <PaperProvider theme={theme}>
      <BottomNav />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
