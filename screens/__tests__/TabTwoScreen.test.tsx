import React from "react";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import TabTwoScreen from "../TabTwoScreen";

describe("<TabOneScreen />", () => {
  it("Renders", () => {
    const tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null =
      renderer.create(<TabTwoScreen />).toJSON();

    const json = tree as ReactTestRendererJSON;
    expect(json?.children?.length).toBe(1);
  });
});
