import React from "react";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import NotFoundScreen from "../NotFoundScreen";

describe("<NotFoundScreen />", () => {
  it("Renders", () => {
    const props: any = { Root: {}, NotFound: {} };
    const routeProps: any = {};
    const tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null =
      renderer
        .create(<NotFoundScreen navigation={props} route={routeProps} />)
        .toJSON();

    expect(tree?.children?.length).toBe(2);
  });
});
