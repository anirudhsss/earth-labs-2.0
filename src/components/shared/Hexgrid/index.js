import { Box } from "@mui/material";
import {
  HEXAGON_HEIGHT,
  HEXAGON_WIDTH,
  HEXGRID_RENDER_TOTAL_HEIGHT,
  HEXGRID_RENDER_TOTAL_WIDTH,
} from "constant";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { Hexagon, HexGrid, Layout, Pattern } from "react-hexgrid";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import styles from "./styles.module.css";

// export interface HexgridProps {
//     matchedMonths?: any;
// }

export const Hexgrid = ({
  matchedMonths,
  arrOfMonths,
  arrOfYears,
  // monthOrYear,
  setArrOfYears,
  coordinates,
  chosenData,
  yAxisValue,
  xAxisValue,
  data,
  data1,
}) => {
  // const [data, setData] = useState();
  // const [data1, setData1] = useState();
  // const [sortedData, setSortedData] = useState([]);
  // const [newCoordinates, setNewCoordinates] = useState({});
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
      return reqQRSContainingArr;
    });
    // console.log("reqQRSContainingArr", reqQRSContainingArr);
    setTestArr(reqQRSContainingArr);
    // setNewCoordinates(x);
  }, [xAxisValue, yAxisValue, matchedMonths]);

  useEffect(() => {
    testArr?.map((item, index) => {
      let pattern = document.getElementById(`PAT-${index}`);
      if (pattern) {
        pattern.setAttribute("width", "100%");
        pattern.setAttribute("height", "100%");
      }
      return pattern;
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
        // if (monthOrYear === "") {
        //   referenceDate = Number(moment(h.timestamp).format("YYYY"));
        // } else if (monthOrYear === "year") {
        //   referenceDate = Number(moment(h.timestamp).format("MM"));
        // } else if (monthOrYear === "month") {
        referenceDate = Number(moment(h.timestamp).format("DD"));
        // }
        let filteredData;
        if (valueMax > 0 && valueMin > 0) {
          // console.log("inside1", h.targetValue1, valueMax, valueMin);
          filteredData =
            h.targetValue1 <= valueMax &&
            h.targetValue1 >= valueMin &&
            referenceDate <= dateMax &&
            referenceDate >= dateMin;
        } else {
          // console.log("inside2", dateMax, dateMin);
          filteredData = referenceDate <= dateMax && referenceDate >= dateMin;
        }
        // console.log("filteredData", filteredData);
        return filteredData;
      })
      .sort((a, b) => {
        return (
          a.targetValue1 - b.targetValue1 || b.referenceDate - a.referenceDate
        );
      });
    // console.log("filteredHexes", filteredHexes);
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
    // console.log("mapWidth * mapHeight", mapWidth * mapHeight);
    // console.log(
    //   "filteredHexes.slice(0, mapWidth * mapHeight)",
    //   filteredHexes.slice(0, mapWidth * mapHeight)
    // );
    return filteredHexes.slice(0, mapWidth * mapHeight);
  };

  // useEffect(() => {
  //   const a = document.getElementById("hexgrid");
  //   console.log("width", a.getBoundingClientRect().width);
  //   console.log("height", a.getBoundingClientRect().height);
  //   let b;
  //   testArr?.map((item) => {
  //     return `grid-identifier-${item.guid}`;
  //     b = item.guid;
  //   });

  //   //console.log("b", b);
  // }, []);

  useEffect(() => {
    const svg = document.querySelector("svg.grid");
    const { xMin, xMax, yMin, yMax } = [...svg.children].reduce((acc, el) => {
      const { x, y, width, height } = el.getBBox();
      // console.log("test", x, y, width, height);
      if (!acc.xMin || x < acc.xMin) acc.xMin = x;
      if (!acc.xMax || x + width > acc.xMax) acc.xMax = x + width;
      if (!acc.yMin || y < acc.yMin) acc.yMin = y;
      if (!acc.yMax || y + height > acc.yMax) acc.yMax = y + height;
      return acc;
    }, {});
    const viewbox = `${xMin} ${yMin} ${xMax - xMin} ${yMax - yMin}`;
    // console.log("viewbox", viewbox);
    svg.setAttribute("viewBox", viewbox);
  }, [testArr]);
  // console.log("testArr", testArr);
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
                // size={{
                //   x: data?.layoutHexagonSizeX,
                //   y: data?.layoutHexagonSizeY,
                // }}
                flat={false}
                spacing={1.1}
                origin={coordinates}
              >
                {/* {sortedData?.map((item, index) => { */}
                {testArr?.map((item, index) => {
                  // console.log("item?.targetValue1", item?.targetValue1);
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
                        >
                          <title id="unique-id">{item.altText}</title>
                        </Hexagon>
                        <Pattern
                          id={`PAT-${index}`}
                          link={item.fillURL}
                          size={{
                            x: HEXAGON_WIDTH,
                            y: HEXAGON_HEIGHT,
                          }}
                          // size={{
                          //   x: data?.layoutHexagonSizeX,
                          //   y: data?.layoutHexagonSizeY,
                          // }}
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
