import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View, ScrollView } from "react-native";
import { List, Surface, Text, Title } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { celebrityDetector, predictConcepts } from "../services/clarifai";
import {
  ConceptPredictionOutputsResponse,
  ImgPickerProps,
  ImgPickerType,
} from "../types/common";
import AppMenu from "./AppMenu";

const ImgPicker = (props: ImgPickerProps): JSX.Element => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [apiErrors, setApiErrors] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [galleryPermission, setGalleryPermission] =
    useState<boolean | null>(null);
  const [cameraPermission, setCameraPermission] =
    useState<boolean | null>(null);
  const [concepts, setConcepts] =
    useState<ConceptPredictionOutputsResponse | null>(null);

  const permissionFunction = async () => {
    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    const requestCameraPermission =
      await ImagePicker.getCameraPermissionsAsync();

    setGalleryPermission(imagePermission.status === "granted");
    setCameraPermission(requestCameraPermission.status === "granted");

    if (!galleryPermission) {
      alert("Permission for media access needed.");
    }

    if (!cameraPermission) {
      alert("Permission for camera access needed.");
    }
  };

  useEffect(() => {
    permissionFunction();
  }, []);

  const handleCameraPress = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });

    getConcepts(result);
  };

  const handleStoragePress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });

    getConcepts(result);
  };

  const getConcepts = (result: ImagePicker.ImagePickerResult) => {
    if (!result.cancelled && result.base64) {
      setImageUri(result.uri);
      if (props.type === ImgPickerType.AUTOTAG) {
        predictConcepts(result.base64, setConcepts, setApiErrors, setLoading);
      }
      if (props.type === ImgPickerType.CELEB) {
        celebrityDetector(result.base64, setConcepts, setApiErrors, setLoading);
      }
    }
  };

  const handleClearPress = () => {
    setImageUri("");
    setConcepts(null);
  };

  return (
    <ScrollView style={styles.imgPickerContainer}>
      <AppMenu
        onCameraPress={handleCameraPress}
        onFolderPress={handleStoragePress}
        onClearPress={handleClearPress}
      />
      <View style={styles.buttonContainer}>
        <Title>{props.title}</Title>
        {imageUri ? (
          <View>
            <Surface style={styles.imageSurface}>
              <Image source={{ uri: imageUri }} style={styles.image} />
            </Surface>
          </View>
        ) : (
          <View>
            <Text>No Image Selected</Text>
          </View>
        )}
        {!isLoading && concepts && concepts.outputs.length ? (
          <View style={styles.conceptsContainer}>
            <Text>
              {concepts.outputs[0].data.concepts.length} concepts have been
              predicted.
            </Text>
            {concepts.outputs[0].data.concepts.map((concept) => {
              return (
                <List.Item
                  key={concept.id}
                  title={concept.name}
                  description={`${concept.value} confidence`}
                  left={(props) => <List.Icon {...props} icon="plus" />}
                />
              );
            })}
          </View>
        ) : (
          <View>
            <Text>No concepts have been predicted.</Text>
          </View>
        )}
        {isLoading && (
          <View>
            <Text>Loading...</Text>
          </View>
        )}
        <Text>{apiErrors}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imgPickerContainer: {
    width: "100%",
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  error: {
    color: "#ff0000",
  },
  buttonContainer: {
    padding: 10,
  },
  button: {
    flex: 1,
  },
  conceptsContainer: {
    padding: 15,
  },
  imageSurface: {
    padding: 15,
  },
});

export default ImgPicker;
