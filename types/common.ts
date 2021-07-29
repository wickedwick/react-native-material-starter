export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  AutoTagger: undefined;
  Celebrities: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type Concept = {
  app_id: string;
  id: string;
  name: string;
  value: number;
}

export type ConceptPredictionOutputsResponse = {
  outputs: Array<ConceptPredictionResponse>;
}

export type ConceptPredictionResponse = {
  data: ConceptPredictionArray;
}

export type ConceptPredictionArray = {
  concepts: Array<Concept>;
}

export type ImgPickerProps = {
  type: ImgPickerType,
  title: string
}

export enum ImgPickerType {
  CELEB = "CELEB",
  AUTOTAG = "AUTOTAG",
}

export type AppMenuProps = {
  onCameraPress: () => void,
  onFolderPress: () => void,
  onClearPress: () => void,
}