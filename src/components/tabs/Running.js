import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as helper from "../helper/commands";
import "../../css/running.css";
import * as actions from "../../actions/actions";
import { Bar } from "react-chartjs-2";
import ToggleDisplay from "../display/ToggleDisplay";

const Running = (props) => {
  const dispatch = useDispatch();
  const stopRunningContainer = (id) =>
    dispatch(actions.stopRunningContainer(id));
  const runningList = useSelector((state) => state.lists.runningList);
  const [run, setRun] = useState("");
  const addRunningContainers = (data) =>
    dispatch(actions.addRunningContainers(data));

  // const toggleRunning = (id) => dispatch(actions.toggleRunning(id));

  const handleClick = (e) => {
    e.preventDefault();
    props.runIm(run, runningList, helper.addRunning, addRunningContainers);
  };

  // /const toggleClick = (id) => {
  // 	toggleRunning(id);
  // 	console.log(runningList);
  // }
  //['cid', 'name', 'cpu', 'mul', 'mp', 'net', 'block', 'pids']
  const renderRunningList = runningList.map((ele, i) => {
    let cpuData = parseFloat(
      ele["cpu"].substring(0, ele["cpu"].length - 1)
    ).toFixed(2);
    let memoryData = parseFloat(
      ele["mp"].substring(0, ele["mp"].length - 1)
    ).toFixed(2);
    const stack = "stack";
    //Adding Chart info
    const chartInfo = {
      labels: ["CPU", "Memory"],
      datasets: [
        {
          stack,
          label: Math.random(),
          backgroundColor: ["rgba(44, 130, 201, 1)", "rgba(19, 221, 29, 1)"],
          borderColor: "rgba(0,0,0,0)",
          borderWidth: 1,
          data: [cpuData, memoryData],
        },
        {
          stack,
          label: Math.random(),
          backgroundColor: ["rgba(155, 198, 233, 1)", "rgba(217, 252, 219, 1)"],
          borderColor: "rgba(0,0,0,0)",
          borderWidth: 1,
          data: [(100 - cpuData).toFixed(2), (100 - memoryData).toFixed(2)],
        },
      ],
    };

    return (
      <div className="box box-running" key={`runningBox${i}`}>
        <div className="box-label">
          <span>Name: {ele["name"]}</span>
          <span>ID: {ele["cid"]}</span>
        </div>
        <div className="box-info">
          <div className="chart">
            <div className="chart-label">
              <div className="chart-label-container">
                <div className="cpuBox"></div>
                <div>
                  <span className="chart-label-text">{cpuData}%</span>
                </div>
              </div>
              <div className="chart-label-container">
                <div className="memoryBox"></div>
                <div>
                  <span className="chart-label-text">{memoryData}%</span>
                </div>
              </div>
            </div>
            <div className="chart-info">
              <Bar
                data={chartInfo}
                options={{
                  tooltips: {
                    enabled: false,
                  },
                  title: {
                    display: false,
                  },
                  legend: {
                    display: false,
                    position: "right",
                  },

                  scales: {
                    yAxes: [
                      {
                        gridLines: {
                          display: false,
                        },
                        ticks: {
                          display: false,
                          min: 0,
                          max: 100,
                          stepSize: 20,
                        },
                      },
                    ],
                    xAxes: [
                      {
                        barPercentage: 0.4,
                        categorySpacing: 0,
                      },
                    ],
                  },
                }}
              />
            </div>
          </div>
          <ToggleDisplay ele={ele} />
        </div>
        <div className="box-button box-button-running">
          <button
            className="stop-btn"
            onClick={() => props.stop(ele["cid"], stopRunningContainer)}
          >
            STOP
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="renderContainers">
      <div className="header">
        <span className="tabTitle">Running Containers</span>
        <div className="runByButton">
          <label>Enter Image ID or Repo</label>
          <span>
            <input
              type="text"
              value={run}
              onChange={(e) => {
                setRun(e.target.value);
              }}
            ></input>
          </span>
          <button className="run-btn" onClick={(e) => handleClick(e)}>
            Run
          </button>
        </div>
      </div>
      <div className="containers">{renderRunningList}</div>
    </div>
  );
};

export default Running;
