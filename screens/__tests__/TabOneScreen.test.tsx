import React from "react";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import TabOneScreen from "../TabOneScreen";

describe("<TabOneScreen />", () => {
  it("Renders", () => {
    const tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null =
      renderer.create(<TabOneScreen />).toJSON();

    const json = tree as ReactTestRendererJSON;
    expect(json?.children?.length).toBe(1);
  });
});
