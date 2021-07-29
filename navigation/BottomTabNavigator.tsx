import React from "react";
import { BottomNavigation } from "react-native-paper";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";

export function BottomNav(): JSX.Element {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "tagger", title: "Image Auto Tagger", icon: "tag" },
    { key: "celeb", title: "Celebrity Guesser", icon: "help" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    tagger: TabOneScreen,
    celeb: TabTwoScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      shifting={true}
    />
  );
}
