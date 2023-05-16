import { Box } from "@mui/material";
import { ArrOfDaysProps } from "interface/UserHomepage";
import moment from "moment";
import { useCallback } from "react";
import { Typography } from "../Typography";
import styles from './styles.module.css';

export interface XaxisItemsProps {
    month?: string;
    hoverElementId?: string;
    onCircleHoverStarts: (month: string | undefined) => void;
    onCircleHoverEnds: (month: string | undefined) => void;
    onCircleClicked: (month: string) => void;
    onDisplayMonth: (year: any) => void;
    dimension?: number;
    noOfGlyphs?: number;
    clickedElement?: string;
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
    arrOfDays?: ArrOfDaysProps[];
    setShowDays?: any;
    setClickedMonth?: any;
    setClickedElement?: any;
    furtherPropagation?: boolean;
    onClickedElementEnabled?: any;
    setdayClicked?: any;
    furtherPropagationDisabled?: any;
    showDaysEnabled?: any;
    onCaptureDayWhenDayClickedEnabled?: any;
    monthInLetters?: string;
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
    const whichDuration1: string = showDays ? `${monthInLetters} ${month}` : moment().month(Number(month) - 1).format("MMM");

    const setParams = useCallback(() => {
        if (furtherPropagation) {
            // console.log('in1')
            showDaysEnabled();
            setClickedMonth(month);
        }
        else {
            // console.log('in2')
            onClickedElementEnabled(month);
            setdayClicked(true);
            onCaptureDayWhenDayClickedEnabled(month);
        }
    }, [furtherPropagation, month, onCaptureDayWhenDayClickedEnabled, onClickedElementEnabled, setClickedMonth, setdayClicked, showDaysEnabled]);
    // console.log('dimension', dimension, typeof dimension)
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
                <Box className={styles.sameLevel}>
                    <Typography
                        fontSize="1.2rem"
                        color={`${(month === hoverElementId || month === clickedElement) && '#FE7D06'}`}
                        text={`${whichDuration1}${(month === hoverElementId || month === clickedElement) ? `: ${noOfGlyphs}` : ''}`}
                        fontWeight="bold"
                    />
                    <span style={{ marginTop: '-2px' }}>
                        &nbsp;&nbsp;{(month === hoverElementId || month === clickedElement) ?
                            <img
                                src="./assets/images/orange_hexagon.svg"
                                alt=""
                                style={{
                                    width: '15px',
                                    marginBottom: '-6px',
                                }}
                            /> : ''}
                    </span>
                </Box>
            </Box>
            {/* </Box> */}
        </Box>
    )
}
