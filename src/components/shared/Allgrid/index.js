import { Box } from "@mui/material";
import { HEXAGON_HEIGHT, HEXAGON_WIDTH } from "constant";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { Hexagon, HexGrid, Layout, Pattern } from "react-hexgrid";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import styles from "./styles.module.css";

// export interface HexgridProps {
//     data1?: any;
// }

export const Allgrid = ({
  // coordinates,
  xAxisValue,
  yAxisValue,
  // monthOrYear,
  data1,
  data,
}) => {
  const [testArr, setTestArr] = useState(data1);

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
    // console.log("viewbox", viewbox);
    svg.setAttribute("viewBox", viewbox);
  }, [testArr]);

  useEffect(() => {
    const reqQRSContainingArr = generateRectangleDynamic(
      8,
      4,
      yAxisValue.yAxisValueMin,
      yAxisValue.yAxisValueMax,
      xAxisValue.xAxisDateMin,
      xAxisValue.xAxisDateMax,
      data1
    );
    const x = {};
    // console.log("reqQRSContainingArr", reqQRSContainingArr);
    reqQRSContainingArr?.map((item) => {
      x[item.guid] = {
        guid: item.guid,
        newQ: item.Q,
        newR: item.R,
        newS: item.S,
      };
      return reqQRSContainingArr;
    });
    setTestArr(reqQRSContainingArr);
  }, [xAxisValue, yAxisValue, data1]);

  // const generateRectangleDynamic = (
  //   mapWidth,
  //   mapHeight,
  //   valueMin,
  //   valueMax,
  //   dateMin,
  //   dateMax,
  //   targetHexes
  // ) => {
  //   const filteredHexes = targetHexes
  //     .filter((h) => {
  //       let referenceDate;
  //       referenceDate = Number(moment(h.timestamp).format("DD"));
  //       let filteredData;
  //       if (valueMax > 0 && valueMin > 0) {
  //         filteredData =
  //           h.targetValue <= valueMax &&
  //           h.targetValue >= valueMin &&
  //           referenceDate <= dateMax &&
  //           referenceDate >= dateMin;
  //       } else {
  //         filteredData = referenceDate <= dateMax && referenceDate >= dateMin;
  //       }

  //       return filteredData;
  //     })
  //     .sort((a, b) => {
  //       return (
  //         a.targetValue - b.targetValue || b.referenceDate - a.referenceDate
  //       );
  //     });

  //   const coords = [];
  //   let counter = 0;

  //   for (let r = 0; r < mapHeight; r++) {
  //     const offset = Math.floor(r / 2);
  //     for (let q = -offset; q < mapWidth - offset; q++) {
  //       const h = {};

  //       h.Q = q;
  //       h.R = r;
  //       h.S = -q - r;
  //       h.Order = counter++;
  //       coords.push(h);
  //     }
  //   }
  //   coords.sort((a, b) => a.Order - b.Order);
  //   let coordIndex = 0;

  //   for (const fHex of filteredHexes) {
  //     fHex.Q = coords[coordIndex]?.Q;
  //     fHex.R = coords[coordIndex]?.R;
  //     fHex.S = coords[coordIndex]?.S;
  //     coordIndex++;
  //   }

  //   return filteredHexes.slice(0, mapWidth * mapHeight);
  // };

  const generateRectangleDynamic = (
    mapWidth,
    mapHeight,
    valueMin,
    valueMax,
    dateMin,
    dateMax,
    targetHexes,
    screenWidth,
    screenHeight
  ) => {
    const fillerArray = [
      "https://dotearth.blob.core.windows.net/dotearthdemo/fill-1.png",
      "https://dotearth.blob.core.windows.net/dotearthdemo/fill-2.png",
      "https://dotearth.blob.core.windows.net/dotearthdemo/fill-3.png",
      "https://dotearth.blob.core.windows.net/dotearthdemo/dashed.png",
      "https://dotearth.blob.core.windows.net/dotearthdemo/fill-4.png",
      "https://dotearth.blob.core.windows.net/dotearthdemo/fill-5.png",
    ];
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
          filteredData =
            h.targetValue <= valueMax &&
            h.targetValue >= valueMin &&
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
          a.targetValue - b.targetValue || b.referenceDate - a.referenceDate
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
    const hexesToAdd = mapWidth * mapHeight - filteredHexes.length;
    for (let i = 0; i < hexesToAdd; i++) {
      const h = {};
      h.Q = coords[coordIndex]?.Q;
      h.R = coords[coordIndex]?.R;
      h.S = coords[coordIndex]?.S;
      h.Order = counter++;
      //h.fillURL = fillerArray[Math.floor(Math.random() * 6)];
      h.fillURL = fillerArray[3];
      h.targetValue = Math.random(); // Set 'targetValue' to a random decimal between 0 and 1
      filteredHexes.push(h);
      coordIndex++;
    }
    // console.log("mapWidth * mapHeight", mapWidth * mapHeight);
    // console.log(
    //   "filteredHexes.slice(0, mapWidth * mapHeight)",
    //   filteredHexes.slice(0, mapWidth * mapHeight)
    // );
    return filteredHexes.slice(0, mapWidth * mapHeight);
  };

  return (
    <Box
      sx={{
        width: "77vw",
        height: "85vh",
        // width: "90vw",
        // height: "90vh",
        // width: `${HEXGRID_RENDER_TOTAL_WIDTH}vw`,
        // height: `${HEXGRID_RENDER_TOTAL_HEIGHT}vh`,
        zIndex: 100,
        overflow: "hidden",
      }}
    >
      <TransformWrapper
        wheel={{ step: 0.01 }}
        maxScale={4}
        centerOnInit={true}
        doubleClick={{ disabled: true }}
        panning={{ disabled: false }}
        // id="transformWrapper"
        className={styles.transformWrapper}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <TransformComponent
          // id="transformComponent"
          >
            <Box className={styles.gridContainer}>
              <HexGrid
                // width={"97.5vw"}
                // height={"190vh"}
                viewBox={`${data?.viewboxMinX} ${data?.viewboxMinY} ${data?.viewboxWidth} ${data?.viewboxHeight}`}
                overflow="auto"
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
                  origin={{ x: 0, y: 0 }}
                  // origin={{ x: -80, y: -25 }}
                >
                  {testArr?.map((item, index) => {
                    return (
                      <>
                        <Fragment>
                          <Hexagon
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
            </Box>
          </TransformComponent>
        )}
      </TransformWrapper>
    </Box>
  );
};
