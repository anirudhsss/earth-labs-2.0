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
import {
  HEXAGON_WIDTH,
  HEXAGON_HEIGHT,
  HEXGRID_RENDER_TOTAL_WIDTH,
  HEXGRID_RENDER_TOTAL_HEIGHT,
} from "constant";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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
      8,
      4,
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
      setData(res?.data[0]);
      setData1(res?.data[0].hexes);
      // setData(sample[0]);
      // setData1(sample[0].hexes);
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
        if (valueMax > 0 && valueMin > 0) {
          filteredData =
            h.targetValue <= valueMax &&
            h.targetValue >= valueMin &&
            referenceDate <= dateMax &&
            referenceDate >= dateMin;
        } else {
          filteredData = referenceDate <= dateMax && referenceDate >= dateMin;
        }
        return filteredData;
      })
      .sort((a, b) => {
        return (
          a.targetValue - b.targetValue || b.referenceDate - a.referenceDate
        );
      });
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
    let coordIndex = 0;

    for (const fHex of filteredHexes) {
      fHex.Q = coords[coordIndex]?.Q;
      fHex.R = coords[coordIndex]?.R;
      fHex.S = coords[coordIndex]?.S;
      coordIndex++;
    }
    return filteredHexes.slice(0, mapWidth * mapHeight);
  };

  useEffect(() => {
    const a = document.getElementById("hexgrid");
    console.log("width", a.getBoundingClientRect().width);
    console.log("height", a.getBoundingClientRect().height);
    let b;
    testArr?.map((item) => {
      return `grid-identifier-${item.guid}`;
      b = item.guid;
    });

    //console.log("b", b);
  }, []);

  useEffect(() => {
    const svg = document.querySelector("svg.grid");
    const { xMin, xMax, yMin, yMax } = [...svg.children].reduce((acc, el) => {
      const { x, y, width, height } = el.getBBox();
      if (!acc.xMin || x < acc.xMin) acc.xMin = x;
      if (!acc.xMax || x + width > acc.xMax) acc.xMax = x + width;
      if (!acc.yMin || y < acc.yMin) acc.yMin = y;
      if (!acc.yMax || y + height > acc.yMax) acc.yMax = y + height;
      return acc;
    }, {});
    const viewbox = `${xMin} ${yMin} ${xMax - xMin} ${yMax - yMin}`;
    svg.setAttribute("viewBox", viewbox);
  }, [monthOrYear]);

  // const hexagonSize = {
  //   x: layoutHexagonSizeX ?? 15,
  //   y: layoutHexagonSizeY ?? 15,
  // };

  return (
    <Box
      sx={{
        width: `${HEXGRID_RENDER_TOTAL_WIDTH}vw`,
        height: `${HEXGRID_RENDER_TOTAL_HEIGHT}vh`,
        //  position: 'absolute',
        zIndex: 100,
        overflow: "hidden",
      }}
      className={styles.transformWrapper}
    >
      <TransformWrapper
        wheel={{ step: 0.01 }}
        maxScale={4}
        centerOnInit={true}
        doubleClick={{ disabled: true }}
        panning={{ disabled: false }}
        className={styles.transformWrapper}
      >
        <TransformComponent>
          <Box className={styles.gridContainer}>
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
              // width={"100%"}
              // height={"100%"}
              viewBox={`${data?.viewboxMinX} ${data?.viewboxMinY} ${data?.viewboxWidth} ${data?.viewboxHeight}`}
              id="hexgrid"
            >
              <Layout
                size={{
                  x: HEXAGON_WIDTH,
                  y: HEXAGON_HEIGHT,
                }}
                flat={false}
                spacing={1.1}
                origin={coordinates}
              >
                {/* {sortedData?.map((item, index) => { */}
                {testArr?.map((item, index) => {
                  return (
                    <>
                      <Fragment>
                        <Hexagon
                          // q={newCoordinates?.[item.guid]?.newQ || 0}
                          // r={newCoordinates?.[item.guid]?.newR || 0}
                          // s={newCoordinates?.[item.guid]?.newS || 0}
                          q={item.Q}
                          r={item.R}
                          s={item.S}
                          fill={`PAT-${index}`}
                          id={`grid-identifier-${index}`}
                          cellStyle={{
                            stroke: item.borderColorHex,
                            strokeWidth: item.borderColorWidth,
                          }}
                        />
                        <Pattern
                          id={`PAT-${index}`}
                          link={item.fillURL}
                          size={{
                            x: HEXAGON_WIDTH,
                            y: HEXAGON_HEIGHT,
                          }}
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
        </TransformComponent>
      </TransformWrapper>
    </Box>
  );
};
