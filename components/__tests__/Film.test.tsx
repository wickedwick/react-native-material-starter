import React from "react";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import Film from "../Film";

describe("<Film />", () => {
  it("Renders with props data", () => {
    const filmData = {
      title: "A New Hope",
      episode_id: 4,
      openingCrawl: "",
      director: "",
      producer: "",
      release_date: "1977-05-24",
      url: "",
    };

    const tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null =
      renderer.create(<Film film={filmData} />).toJSON();

    expect(tree?.children?.length).toBe(3);
    expect(tree?.children[0].children[0]).toBe("Star Wars Episode ");
    expect(tree?.children[0].children[1]).toBe("4");
    expect(tree?.children[2].children[0]).toBe("Released ");
    expect(tree?.children[2].children[1]).toBe("05/23/1977");
    expect(tree?.children[1].children[0]).toBe("A New Hope");
  });
});
