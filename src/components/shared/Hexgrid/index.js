import { Box } from "@mui/material";
import {
  HexGrid,
  Layout,
  Hexagon,
  Text,
  Pattern,
  Path,
  Hex,
} from "react-hexgrid";
import { ApiRequest } from "components/utils";
import { Fragment, useEffect, useState } from "react";
import moment from "moment";
import sample from "../../../sample.json";
import styles from "./styles.module.css";
import { HEXAGON_WIDTH, HEXAGON_HEIGHT } from "constant";

// export interface HexgridProps {
//     matchedMonths?: any;
// }

export const Hexgrid = ({
  matchedMonths,
  arrOfMonths,
  arrOfYears,
  monthOrYear,
  onDisplayYear,
  setArrOfYears,
  coordinates,
  loading1,
  chosenData,
  testData,
  yAxisValue,
  xAxisValue,
}) => {
  const [data, setData] = useState();
  const [data1, setData1] = useState();
  const [sortedData, setSortedData] = useState([]);
  const [newCoordinates, setNewCoordinates] = useState({});
  const [testArr, setTestArr] = useState(matchedMonths);

  useEffect(() => {
    const reqQRSContainingArr = generateRectangleDynamic(
      6,
      5,
      yAxisValue.yAxisValueMin,
      yAxisValue.yAxisValueMax,
      xAxisValue.xAxisDateMin,
      xAxisValue.xAxisDateMax,
      matchedMonths
    );
    const x = {};
    reqQRSContainingArr?.map((item) => {
      x[item.guid] = {
        guid: item.guid,
        newQ: item.Q,
        newR: item.R,
        newS: item.S,
      };
    });
    setTestArr(reqQRSContainingArr);
    setNewCoordinates(x);
  }, [xAxisValue, yAxisValue, matchedMonths]);

  useEffect(() => {
    const info = async () => {
      const res = await ApiRequest();
      // setData(res?.data[0]);
      // setData1(res?.data[0].hexes);
      setData(sample[0]);
      setData1(sample[0].hexes);
    };
    info();
  }, []);

  useEffect(() => {
    testArr?.map((item, index) => {
      let pattern = document.getElementById(`PAT-${index}`);
      if (pattern) {
        pattern.setAttribute("width", "100%");
        pattern.setAttribute("height", "100%");
      }
    });
  }, [testArr]);

  const generateRectangleDynamic = (
    mapWidth,
    mapHeight,
    valueMin,
    valueMax,
    dateMin,
    dateMax,
    targetHexes
  ) => {
    const filteredHexes = targetHexes
      .filter((h) => {
        let referenceDate;
        if (monthOrYear === "year") {
          referenceDate = Number(moment(h.timestamp).format("MM"));
        } else if (monthOrYear === "month") {
          referenceDate = Number(moment(h.timestamp).format("DD"));
        }
        let filteredData;
        //   console.log(
        //     "test",
        //     h.targetValue,
        //     valueMax,
        //     valueMin,
        //     referenceDate,
        //     dateMax,
        //     dateMin
        //   );
        if (valueMax > 0 && valueMin > 0) {
          console.log("in1", valueMax, valueMin);
          filteredData =
            h.targetValue <= valueMax &&
            h.targetValue >= valueMin &&
            referenceDate <= dateMax &&
            referenceDate >= dateMin;
        } else {
          console.log("in2");
          filteredData = referenceDate <= dateMax && referenceDate >= dateMin;
        }
        return filteredData;
      })
      .sort((a, b) => {
        return (
          a.targetValue - b.targetValue || b.referenceDate - a.referenceDate
        );
      });
    //console.log("filteredHexes", filteredHexes);
    const coords = [];
    let counter = 0;

    for (let r = 0; r < mapHeight; r++) {
      const offset = Math.floor(r / 2);
      for (let q = -offset; q < mapWidth - offset; q++) {
        const h = {};

        h.Q = q;
        h.R = r;
        h.S = -q - r;
        h.Order = counter++;
        coords.push(h);
      }
    }
    coords.sort((a, b) => a.Order - b.Order);
    // console.log("coords", coords);
    let coordIndex = 0;

    for (const fHex of filteredHexes) {
      fHex.Q = coords[coordIndex]?.Q;
      fHex.R = coords[coordIndex]?.R;
      fHex.S = coords[coordIndex]?.S;
      coordIndex++;
    }
    // console.log(
    //   "filteredHexes.slice(0, mapWidth * mapHeight)",
    //   filteredHexes.slice(0, mapWidth * mapHeight)
    // );
    return filteredHexes.slice(0, mapWidth * mapHeight);
  };

  return (
    <Box
      sx={{
        width: "1440px",
        height: "84vh",
        //  position: 'absolute',
        zIndex: 100,
      }}
    >
      {/* {!loading1 && <><Box sx={{
                position: 'absolute',
                marginRight: '184px',
                top: 3,
                bottom: 55,
                left: 1400,
                right: 0,
                background: 'linear-gradient(90deg, rgba(255, 253, 251, 0) 0%, rgba(255, 253, 251, 0.743281) 28.13%, rgba(255, 253, 251, 0.9) 51.56%, #FFFDFB 100%)',
                zIndex: 98,
            }}></Box>
            <Box sx={{
                position: 'absolute',
                marginBottom: '650px',
                top: 0,
                bottom: 55,
                left: 57,
                right: 183,
                background: 'linear-gradient(0deg, rgba(255, 253, 251, 0) 0%, rgba(255, 253, 251, 0.743281) 28.13%, rgba(255, 253, 251, 0.9) 51.56%, #FFFDFB 100%)',
                zIndex: 98,
            }}></Box></>} */}
      <HexGrid
        width={"100%"}
        height={"100%"}
        viewBox={`${data?.viewboxMinX} ${data?.viewboxMinY} ${data?.viewboxWidth} ${data?.viewboxHeight}`}
      >
        <Layout
          size={{ x: HEXAGON_WIDTH, y: HEXAGON_HEIGHT }}
          flat={false}
          spacing={1.1}
          origin={coordinates}
        >
          {/* {sortedData?.map((item, index) => { */}
          {testArr?.map((item, guid) => {
            return (
              <>
                <Fragment>
                  {/* {console.log(
                    "newCoordinates?.[item.guid]",
                    newCoordinates?.[item.guid]
                  )} */}
                  <Hexagon
                    // q={newCoordinates?.[item.guid]?.newQ || 0}
                    // r={newCoordinates?.[item.guid]?.newR || 0}
                    // s={newCoordinates?.[item.guid]?.newS || 0}
                    q={item.Q}
                    r={item.R}
                    s={item.S}
                    fill={`PAT-${guid}`}
                    id={`grid-identifier-${guid}`}
                  />
                  <Pattern
                    id={`PAT-${guid}`}
                    link={item.fillURL}
                    size={{ x: HEXAGON_WIDTH, y: HEXAGON_HEIGHT }}
                  />
                </Fragment>
              </>
            );
          })}
        </Layout>
      </HexGrid>
      {/* {!loading1 && <><Box sx={{
                position: 'absolute',
                marginTop: '650px',
                top: 0,
                bottom: 54,
                left: 57,
                right: 183,
                background: 'linear-gradient(180deg, rgba(255, 253, 251, 0) 0%, rgba(255, 253, 251, 0.743281) 28.13%, rgba(255, 253, 251, 0.9) 51.56%, #FFFDFB 100%)',
                zIndex: 98,
            }}></Box>
            <Box sx={{
                position: 'absolute',
                marginLeft: '56px',
                top: 3,
                bottom: 55,
                left: 0,
                right: 1540,
                background: 'linear-gradient(270deg, rgba(255, 253, 251, 0) 0%, rgba(255, 253, 251, 0.743281) 28.13%, rgba(255, 253, 251, 0.9) 51.56%, #FFFDFB 100%)',
                zIndex: 98,
            }}></Box></>} */}
    </Box>
  );
};
