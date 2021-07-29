import React from "react";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { BottomNav } from "../BottomTabNavigator";

describe("<BottomTabNavigator />", () => {
  it("Renders with props", () => {
    const tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null =
      renderer.create(<BottomNav />).toJSON();

    const json = tree as ReactTestRendererJSON;
    expect(json?.props?.navigationState?.routes?.length).toBe(2);
  });
});
