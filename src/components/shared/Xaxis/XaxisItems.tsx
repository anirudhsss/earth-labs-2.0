import { Box } from "@mui/material";
import { ArrOfYMDProps } from "interface/UserHomepage";
import moment from "moment";
import { useCallback } from "react";
import { Typography } from "../Typography";
import styles from "./styles.module.css";

export interface XaxisItemsProps {
  month?: string;
  hoverElementId?: string | undefined;
  onCircleHoverStarts: (month: string | undefined) => void;
  onCircleHoverEnds: (month: string | undefined) => void;
  onCircleClicked: (month: string) => void;
  onDisplayMonth: (year: string) => void;
  dimension?: number;
  noOfGlyphs?: number;
  clickedElement?: string;
  glyphWithMaxDimension?: number;
  showDays?: boolean;
  arrOfDays?: ArrOfYMDProps[];
  onClickedMonth: (month: string | undefined) => void;
  furtherPropagation?: boolean;
  onClickedElementEnabled: (month: string | undefined) => void;
  onSetdayClicked: (dayClicked: boolean | undefined) => void;
  showDaysEnabled: () => void;
  onCaptureDayWhenDayClickedEnabled: (day: string | undefined) => void;
  monthInLetters?: string;
  durationLength: number;
}

export const XaxisItems = ({
  month,
  hoverElementId,
  onCircleHoverStarts,
  onCircleHoverEnds,
  onDisplayMonth,
  dimension,
  noOfGlyphs,
  onCircleClicked,
  clickedElement,
  showDays,
  arrOfDays,
  // monthOrYear,
  glyphWithMaxDimension,
  onClickedMonth,
  furtherPropagation,
  onClickedElementEnabled,
  onSetdayClicked,
  showDaysEnabled,
  onCaptureDayWhenDayClickedEnabled,
  monthInLetters,
  durationLength,
}: XaxisItemsProps) => {
  // const day = `${(moment().month(month - 1).format("MMM") / month)} / ${month}`;
  const whichDuration1: string = showDays
    ? `${monthInLetters} ${month}`
    : moment()
        .month(Number(month) - 1)
        .format("MMM");

  const setParams = useCallback(() => {
    // Further Propogation checks if we need to drill down inside
    // Year to day
    debugger;
    if (furtherPropagation) {
      showDaysEnabled();
      onClickedMonth(month);
    } else {
      onClickedElementEnabled(month);
      onSetdayClicked(true);
      onCaptureDayWhenDayClickedEnabled(month);
    }
  }, [
    furtherPropagation,
    month,
    onCaptureDayWhenDayClickedEnabled,
    onClickedElementEnabled,
    onClickedMonth,
    onSetdayClicked,
    showDaysEnabled,
  ]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: dimension,
          height: dimension,
          borderRadius: "50%",
          border: "1px solid black",
          backgroundColor:
            month === hoverElementId || month === clickedElement
              ? "#FE7D06"
              : "#FFF7EE",
          cursor: "pointer",
        }}
        onClick={setParams}
        onMouseEnter={() => onCircleHoverStarts(month)}
        onMouseLeave={() => onCircleHoverEnds(month)}
      ></div>
      <Box
        sx={{
          position: "absolute",
          top: durationLength === 1 && !showDays ? "30px" : "35px",
          width: "100px",
          textAlign: "center",
        }}
      >
        <Box className={styles.sameLevel}>
          <Typography
            fontSize="1.2rem"
            color={`${
              (month === hoverElementId || month === clickedElement) &&
              "#FE7D06"
            }`}
            text={`${whichDuration1}${
              month === hoverElementId || month === clickedElement
                ? `: ${noOfGlyphs}`
                : ""
            }`}
            fontWeight="bold"
          />
          <span style={{ marginTop: "-2px" }}>
            &nbsp;&nbsp;
            {month === hoverElementId || month === clickedElement ? (
              <img
                src="./assets/images/orange_hexagon.svg"
                alt=""
                style={{
                  width: "15px",
                  marginBottom: "-6px",
                }}
              />
            ) : (
              ""
            )}
          </span>
        </Box>
      </Box>
    </Box>
  );
};
