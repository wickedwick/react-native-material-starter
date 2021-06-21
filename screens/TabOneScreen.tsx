import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import Film from "../components/Film";
import { FilmData } from "../types/starWars/films";
import { getStarWarsData } from "../services/fetch";
import { useTheme } from "react-native-paper";

export default function TabOneScreen() {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [films, setFilms] = useState<Array<FilmData>>([]);
  const { colors } = useTheme();

  useEffect(() => {
    getStarWarsData(
      "https://swapi.dev/api/films",
      setFilms,
      setError,
      setLoading
    );
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {isLoading && <Text>Loading...</Text>}
        {films && films.map((film) => <Film key={film.title} film={film} />)}
        <Text style={{ color: colors.error }}>{error}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});
