import { useEffect, useState } from "react";
import { Box } from "@mui/material"
import data from 'test.json';
import { Typography } from "../Typography";
import moment from "moment";
import { useLocation } from "react-router-dom";
import styles from './styles.module.css';

export interface XaxisItemsProps {
    month?: any;
    year?: any;
    backgroundColor?: string;
    hoverElementId?: number | null;
    onCircleHoverStarts: (month: any) => void;
    onCircleHoverEnds: (month: any) => void;
    onCircleClicked: (month: any) => void;
    onDisplayMonth: (year: any) => void;
    dimension?: number;
    noOfGlyphs?: any;
    clickedElement?: any;
    // monthOrYear?: any;
    data1?: any;
    matchedMonths?: any;
    setMatchedMonths?: any;
    yearViewEnabled?: any;
    setYearViewEnabled?: any;
    range?: any;
    setChosenData?: any;
    chosenData?: any;
    glyphWithMaxDimension?: number;
    showDays?: boolean;
    onShowDaysInfo?: any;
    arrOfDays?: any;
    setShowDays?: any;
    setClickedMonth?: any;
    setClickedElement?: any;
    furtherPropagation?: any;
    onClickedElementEnabled?: any;
    setdayClicked?: any;
    furtherPropagationDisabled?: any;
    showDaysEnabled?: any;
    onCaptureDayWhenDayClickedEnabled?: any;
    monthInLetters?: any;
}

export const XaxisItems = ({
    backgroundColor,
    year,
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
    onShowDaysInfo,
    arrOfDays,
    // monthOrYear,
    glyphWithMaxDimension,
    setShowDays,
    setClickedMonth,
    setClickedElement,
    furtherPropagation,
    onClickedElementEnabled,
    setdayClicked,
    furtherPropagationDisabled,
    showDaysEnabled,
    onCaptureDayWhenDayClickedEnabled,
    monthInLetters,
}: XaxisItemsProps) => {
    // const day = `${(moment().month(month - 1).format("MMM") / month)} / ${month}`;
    const whichDuration1: any = showDays ? `${month} ${monthInLetters}` : moment().month(month - 1).format("MMM");

    const setParams = () => {
        if (furtherPropagation) {
            showDaysEnabled();
            setClickedMonth(month);
        }
        else {
            onClickedElementEnabled(month);
            setdayClicked(true);
            onCaptureDayWhenDayClickedEnabled(month);
        }
    }

    // const OrangeHexagonIcon = <span style={{ color: '#FE7D06', fontSize: '35px', }}>&#x2B22;</span>

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            // width: '100px',
        }}>
            {/* <Box className={styles.test}> */}
            <div style={{
                width: dimension,
                height: dimension,
                borderRadius: '50%',
                border: '1px solid black',
                backgroundColor: (month === hoverElementId || month === clickedElement) ? '#FE7D06' : '#FFF7EE',
                cursor: 'pointer',
            }}
                // className="dimensions"
                // onClick={() => showDays ? onShowDaysInfo(month) : onCircleClicked(month)}
                onClick={setParams}
                onMouseEnter={() => onCircleHoverStarts(month)}
                onMouseLeave={() => onCircleHoverEnds(month)}
            ></div>
            {/* </Box>
            <Box className={styles.test}> */}
            <Box sx={{
                position: 'absolute',
                top: '35px',
                width: '100px',
                textAlign: 'center',
            }}>
                <Typography
                    fontSize="15px"
                    color={`${(month === hoverElementId || month === clickedElement) && '#FE7D06'}`}
                    text={`${whichDuration1}${(month === hoverElementId || month === clickedElement) ? `: ${noOfGlyphs} hex` : ''}`}
                    fontWeight="bold"
                />
            </Box>
            {/* </Box> */}
        </Box>
    )
}
