import React from "react";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import {
  ConceptPredictionOutputsResponse,
  ImgPickerType,
} from "../../types/common";
import ImagePicker from "../ImgPicker";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

jest.mock("expo-image-picker", () => {
  const actual = jest.requireActual("expo-image-picker");
  const result = {
    cancelled: false,
    uri: "someuri",
    base64: "somebase64",
  };

  return {
    ...actual,
    launchCameraAsync: jest.fn().mockReturnValue(result),
    launchImageLibraryAsync: jest.fn().mockReturnValue(result),
  };
});

jest.mock("../../services/clarifai", () => {
  const predictedConcepts = {
    outputs: [
      {
        data: {
          concepts: [
            {
              id: "ai_XtbHW5Tn",
              name: "valentino rossi",
              value: 0.0076692337,
              app_id: "main",
            },
            {
              id: "ai_rBvQzZ1R",
              name: "rubens barrichello",
              value: 0.005808438,
              app_id: "main",
            },
          ],
        },
      },
    ],
  };

  const guessedCelebs = {
    outputs: [
      {
        data: {
          concepts: [
            {
              id: "ai_1Pkg1BtX",
              name: "michael schumacher",
              value: 0.0051018484,
              app_id: "main",
            },
            {
              id: "ai_9T3WT2vB",
              name: "dwayne bowe",
              value: 0.005067274,
              app_id: "main",
            },
          ],
        },
      },
    ],
  };

  return {
    predictConcepts: (
      base62: string,
      func1: React.Dispatch<
        React.SetStateAction<ConceptPredictionOutputsResponse | null>
      >,
      func2: React.Dispatch<React.SetStateAction<string>>,
      func3: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
      func1(predictedConcepts);
      func2("");
      func3(false);
    },
    celebrityDetector: (
      base62: string,
      func1: React.Dispatch<
        React.SetStateAction<ConceptPredictionOutputsResponse | null>
      >,
      func2: React.Dispatch<React.SetStateAction<string>>,
      func3: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
      func1(guessedCelebs);
      func2("");
      func3(false);
    },
  };
});

const shallowRender = (imgPickerType: ImgPickerType) => {
  const wrapper = shallow(
    <ImagePicker type={imgPickerType} title="Test Picker" />
  );

  return wrapper;
};

describe("<ImagePicker />", () => {
  it("Renders with props", () => {
    const tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null =
      renderer
        .create(
          <ImagePicker type={ImgPickerType.AUTOTAG} title="Test Picker" />
        )
        .toJSON();

    const json = tree as ReactTestRendererJSON;
    expect(json?.children?.length).toBe(1);
  });

  it("onCameraPress loads the image and concepts", async () => {
    const wrapper = shallowRender(ImgPickerType.AUTOTAG);
    const appMenu = wrapper.find("AppMenu");
    await appMenu.props().onCameraPress();

    expect(wrapper.find("View").at(3).prop("title")).toBe("valentino rossi");
    expect(wrapper.find("View").at(4).prop("title")).toBe("rubens barrichello");
  });

  it("onFolderPress loads the image and concepts", async () => {
    const wrapper = shallowRender(ImgPickerType.AUTOTAG);
    const appMenu = wrapper.find("AppMenu");
    await appMenu.props().onFolderPress();

    expect(wrapper.find("View").at(3).prop("title")).toBe("valentino rossi");
    expect(wrapper.find("View").at(4).prop("title")).toBe("rubens barrichello");
  });

  it("Handles celeb guesser loads the image and concepts", async () => {
    const wrapper = shallowRender(ImgPickerType.CELEB);
    const appMenu = wrapper.find("AppMenu");
    await appMenu.props().onFolderPress();

    expect(wrapper.find("View").at(3).prop("title")).toBe("michael schumacher");
    expect(wrapper.find("View").at(4).prop("title")).toBe("dwayne bowe");
  });

  it("onClearPress clears the image and concepts", async () => {
    const wrapper = shallowRender(ImgPickerType.AUTOTAG);
    const appMenu = wrapper.find("AppMenu");
    await appMenu.props().onFolderPress();

    expect(wrapper.find("View").at(3).prop("title")).toBe("valentino rossi");
    expect(wrapper.find("View").at(4).prop("title")).toBe("rubens barrichello");

    await appMenu.props().onClearPress();

    expect(wrapper.find("View").at(1).dive().text()).toBe("No Image Selected");
    expect(wrapper.find("View").at(2).dive().text()).toBe(
      "No concepts have been predicted."
    );
  });
});
