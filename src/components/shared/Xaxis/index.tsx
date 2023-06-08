import { Box, Menu, MenuItem } from "@mui/material";
import { ArrOfYMDProps } from "interface/UserHomepage";
import { useCallback, useEffect, useState, MouseEvent } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "../Button";
import { Typography } from "../Typography";
import styles from "./styles.module.css";
import { XaxisItems } from "./XaxisItems";

export interface XaxisProps {
  onCircleClicked: (month: string) => void;
  onDisplayMonth: (year: string) => void;
  clickedElement?: string;
  arrOfMonths?: ArrOfYMDProps[];
  arrOfYears?: ArrOfYMDProps[];
  hoverElementId?: string | undefined;
  onCircleHoverStarts: (elementId: string | undefined) => void;
  onCircleHoverEnds: (elementId: string | undefined) => void;
  openMenu: boolean;
  onOpenYearMenu?: (e: MouseEvent<HTMLElement>) => void;
  years?: ArrOfYMDProps[] | undefined;
  anchorEl?: null | HTMLElement;
  onCloseYearMenu?: () => void;
  onValueMenuItemClicked: (id: string) => void;
  showDays?: boolean;
  arrOfDays?: ArrOfYMDProps[];
  onClickedMonth: (month: string | undefined) => void;
  furtherPropagation?: boolean;
  onClickedElementEnabled: (month: string | undefined) => void;
  onSetdayClicked: (dayClicked: boolean | undefined) => void;
  showDaysEnabled: () => void;
  onCaptureDayWhenDayClickedEnabled: (day: string | undefined) => void;
  monthInLetters?: string;
}

export const Xaxis = ({
  onCircleClicked,
  clickedElement,
  onDisplayMonth,
  arrOfMonths,
  arrOfYears,
  hoverElementId,
  onCircleHoverStarts,
  onCircleHoverEnds,
  openMenu,
  onOpenYearMenu,
  years,
  anchorEl,
  onCloseYearMenu,
  onValueMenuItemClicked,
  showDays,
  arrOfDays,
  onClickedMonth,
  furtherPropagation,
  onClickedElementEnabled,
  onSetdayClicked,
  showDaysEnabled,
  onCaptureDayWhenDayClickedEnabled,
  monthInLetters,
}: XaxisProps) => {
  const whichDuration = showDays ? arrOfDays : arrOfMonths;
  const [glyphWithMaxDimension, setGlyphWithMaxDimension] = useState<number>(0);
  const location = useLocation();
  const homeLocation = location?.pathname.includes("/home");
  const mapsLocation = location?.pathname.includes("/maps");

  const findMax = useCallback(() => {
    whichDuration?.map((item: ArrOfYMDProps) => {
      let max = 0,
        min = 0;
      if (Number(item.dimension) > max) {
        max = Number(item.dimension);
      } else if (Number(item.dimension) < min) {
        min = Number(item.dimension);
      }
      setGlyphWithMaxDimension(max);
      return false;
    });
  }, [whichDuration]);

  useEffect(() => {
    findMax();
  }, [findMax]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          marginLeft: "3vw",
        }}
      >
        <Box
          sx={{
            borderBottom: "1px solid black",
            width: "100%",
            position: "relative",
          }}
          className="line"
        >
          {/* <span
                        style={{
                            position: 'absolute',
                            fontSize: '1.5rem',
                            right: '-3px',
                            top: '-5px',
                        }}
                    >&#x2C3;</span> */}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent:
              whichDuration?.length === 1 ? "center" : "space-between",
            alignItems: "center",
            position: "relative",
            zIndex: 101,
            bottom: "17.5px",
            width: "100%",
          }}
        >
          {whichDuration?.map((item: ArrOfYMDProps) => {
            return (
              <XaxisItems
                monthInLetters={monthInLetters}
                onCaptureDayWhenDayClickedEnabled={
                  onCaptureDayWhenDayClickedEnabled
                }
                showDaysEnabled={showDaysEnabled}
                onSetdayClicked={onSetdayClicked}
                onClickedElementEnabled={onClickedElementEnabled}
                furtherPropagation={furtherPropagation}
                onClickedMonth={onClickedMonth}
                arrOfDays={arrOfDays}
                showDays={showDays}
                dimension={item.dimension}
                month={item.month}
                hoverElementId={hoverElementId}
                onCircleHoverStarts={onCircleHoverStarts}
                onCircleHoverEnds={onCircleHoverEnds}
                noOfGlyphs={item.noOfGlyphs}
                onCircleClicked={onCircleClicked}
                clickedElement={clickedElement}
                onDisplayMonth={onDisplayMonth}
                glyphWithMaxDimension={glyphWithMaxDimension}
              />
            );
          })}
        </Box>
      </Box>
      <Box
        sx={{
          width: "9%",
          // position: 'absolute',
          // right: '0',
          // bottom: '20px',
          display: "flex",
          justifyContent: "flex-end",
          marginTop: (years || [])?.length > 0 ? "-2.5vw" : "",
        }}
        //  className={styles.timeMenuBtn}
      >
        {(mapsLocation || homeLocation) && (
          <Box>
            <Button
              backgroundColor="#FFF7EE"
              hoverBackgroundColor="#FFF7EE"
              color="black"
              boxShadow="none"
              hoverBoxShadow="none"
              borderRadius={`${openMenu ? "0 0 2rem 2rem" : "2rem"}`}
              padding="5px 22px"
              width="85px"
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              border="1px solid #000"
              borderTop={`${openMenu ? "0" : "1px solid #000"}`}
              paddingTop={`${openMenu && "0px"}`}
              onClick={onOpenYearMenu}
              // disabled={monthOrYear === ''}
            >
              {(years || [])?.length > 0 ? (
                <Typography
                  text={`${(years || [])[0].month}`}
                  fontSize="13px"
                  color={`${openMenu ? "#FE7D06" : "#000"}`}
                />
              ) : (
                <Typography
                  text="time"
                  fontSize="13px"
                  color={`${openMenu ? "#FE7D06" : "#000"}`}
                />
              )}
              <img
                src={`${
                  openMenu
                    ? "/assets/images/orangeTriangle.svg"
                    : "/assets/images/blackTriangle.svg"
                }`}
                alt=""
                className={styles.blackTriangle}
                style={{
                  transform: openMenu ? "" : "rotate(180deg)",
                }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={onCloseYearMenu}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              PaperProps={{
                elevation: 0,
                style: {
                  width: "85px",
                  borderRadius: "20px 20px 0 0",
                  backgroundColor: "#FFF7EE",
                  border: "1px solid #000",
                },
              }}
            >
              {arrOfYears?.map((item: ArrOfYMDProps) => {
                // console.log('item', item.month)
                return (
                  <MenuItem
                    key={item.month}
                    onClick={() => onValueMenuItemClicked(item.month)}
                    sx={{
                      fontSize: "13px",
                      borderBottom: "1px solid black",
                      "&:last-child": {
                        borderBottom: "0px",
                      },
                    }}
                  >
                    {item.month}
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
        )}
      </Box>
    </Box>
  );
};
