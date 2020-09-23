import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Images from "../src/components/tabs/Images";

//New ENzyme versions require an adaptor to a particulaer version of React
configure({ adapter: new Adapter() });

function shallowSetup() {
  const props = {
    imagesList: [
      {
        resp: "node-php-something",
        tag: "latest",
        imgid: "fc266a46f885",
        created: "toady",
        size: "234mb",
      },
    ],
  };
  const enzymeWrapper = shallow(<Images {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe("Shallow all of the properties of the Images", () => {
  const { enzymeWrapper, props } = shallowSetup();
  console.log("this is the enzymewrapper", enzymeWrapper.debug());

  it("Should render <div> tag in Images", () => {
    expect(enzymeWrapper.type()).toEqual("div");
    expect(
      enzymeWrapper.find("div.renderContainers").find("div").length
    ).toEqual(8);
    // expect(enzymeWrapper.find("Strong".text().toMatch("Images")));
  });

  it("Should render <span> tag in Images with a title Images", () => {
    expect(enzymeWrapper.containsMatchingElement(<span>Images</span>)).toBe(
      true
    );
    expect(enzymeWrapper.find(".tabTitle").text()).toEqual("Images");
    // expect(enzymeWrapper.find("span.tabTitle").text().toEqual("Images"));
  });

  it("Should render a div tag called runByImage and display all of the properties", () => {
    // expect(enzymeWrapper.hasClass("runByButton")).toEqual(true);
    // expect(enzymeWrapper.type()).toEqual("label");
    // expect(enzymeWrapper.text()).toEqual("Enter Image Repo");
    expect(enzymeWrapper.find("div.runByButton").find("button").length).toEqual(
      1
    );

    expect(enzymeWrapper.find("div.runByButton").find("label").length).toEqual(
      1
    );

    expect(enzymeWrapper.find("div.runByButton").find("span").length).toEqual(
      1
    );
    expect(enzymeWrapper.find("div.runByButton").find("input").length).toEqual(
      1
    );

    // expect(
    //   enzymeWrapper.containsAllMatchingElements([
    //     <label>Hello</label>,
    //     <span>hello</span>,
    //     <input>something</input>,
    //     <button>Pull</button>,
    //   ])
    // ).toEqual(false);
  });
  it("Button should be able to invoked on clicked", () => {
    // expect(
    //   enzymeWrapper.contains(
    //     <button onClick={(e) => handleClick(e)}>Pull</button>
    //   )
    // ).toBe(true);
    const handleClick = spyOn(enzymeWrapper.instance(), "handleClick");
    enzymeWrapper.find(".run-btn").simulate("click");
    expect(handleClick).toHaveBeenCalled();

    // it("Button should be able to invoked on clicked", () => {
    //   // expect(
    //   //   enzymeWrapper.find(".runByButton").props().children[0].props.className
    //   // ).toEqual(".run-btn");
    //   expect(enzymeWrapper.contains(<button onClick ={handleClick}>Pull</button>)
    //   // it("ClassName run-btn in Stopped component have onClick function", () => {
    //   //   expect(
    //   //     enzymeWrapper.find(".runByButton").props().children[0].props.onClick
    //   //   ).toBeDefined();
    //   // });
    // ).toBe(true);
  });

  it(`render a div with a class name "containers" and all of it properties`, () => {
    expect(enzymeWrapper.find("div.containers"));

    expect(enzymeWrapper.find("div.box").find("div").length).toEqual(4);
    expect(enzymeWrapper.find("div.images-header").find("span").length).toEqual(
      1
    );
    expect(enzymeWrapper.find("div.stopped-info").find("li").length).toEqual(3);
    expect(
      enzymeWrapper.find("div.stopped-button").find("button").length
    ).toEqual(2);
    // expect(enzymeWrapper.matchesElement(<span>ID: fc266a46f885</span>)).toBe(
    //   true
    // );
  });
});
