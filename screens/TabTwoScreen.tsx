import React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import getData from "../services/fetch";
import { ChuckNorrisFactData } from "../types/chuckNorris";

export default function TabTwoScreen() {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fact, setFact] = useState<ChuckNorrisFactData>(
    new ChuckNorrisFactData({ icon_url: "", id: "", url: "", value: "" })
  );

  useEffect(() => {
    getData(
      "https://api.chucknorris.io/jokes/random",
      setFact,
      setError,
      setLoading
    );
  }, []);

  const handlePress = () => {
    getData(
      "https://api.chucknorris.io/jokes/random",
      setFact,
      setError,
      setLoading
    );
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        {isLoading && <Text>Loading...</Text>}
        <Image
          style={styles.icon}
          source={{
            uri: fact.icon_url,
          }}
        />
        <Text>{fact.value}</Text>
        <Text>{error}</Text>
      </Surface>
      <Button onPress={handlePress} mode="contained" icon="refresh">
        Refresh
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  surface: {
    padding: 10,
    elevation: 5,
    marginBottom: 10,
  },
  icon: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginBottom: 5,
  },
});
