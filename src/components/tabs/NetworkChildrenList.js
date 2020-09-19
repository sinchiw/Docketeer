import React from "react";
import Spinner from "../display/Spinner";
const NetworkChildrenList = (props) => {
  if (props.networkList[props.parent].length) {
    console.log("heyyy im hereeee");
    let ChildrenList = () => {
      let newArray = [];
      for (let j = 0; j < props.networkList[props.parent].length; j++) {
        let parents = props.networkList[props.parent][j];

        for (let k = 0; k < parents.length; k++) {
          let container = props.networkList[props.parent][j][k];
          newArray.push(
            <div className="yml-info" key={`yml-info${k}`}>
              <div className="yml-info-box" key={`yml-info-box${k}`}>
                <p>ID: {container["cid"]}</p>
                <p>Name: {container["name"]}</p>
              </div>
            </div>
          );
        }
      }
      return <>{newArray}</>;
    };

    return (
      <div>
        <ChildrenList />
      </div>
    );
  }
};

export default NetworkChildrenList;
