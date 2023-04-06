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
    monthOrYear?: any;
    data1?: any;
    matchedMonths?: any;
    setMatchedMonths?: any;
    yearViewEnabled?: any;
    setYearViewEnabled?: any;
    range?: any;
    setChosenData?: any;
    chosenData?: any;
    glyphWithMaxDimension?: number;
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
    monthOrYear,
    glyphWithMaxDimension,
}: XaxisItemsProps) => {
    const whichDuration1 = monthOrYear === '' ? month : (monthOrYear === 'year' || monthOrYear === 'month') ? moment().month(month - 1).format("MMM") : [];

    // const OrangeHexagonIcon = <span style={{ color: '#FE7D06', fontSize: '35px', }}>&#x2B22;</span>

    // useEffect(() => {
    //     if (dimension) {
    //         let nodes = document.querySelectorAll('.dimensions');
    //         nodes.forEach(function (item: any, index: number) {
    //             console.log('item', item);
    //         });
    //     }
    // }, [])

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
                className="dimensions"
                onClick={() => { monthOrYear === '' ? onDisplayMonth(month) : onCircleClicked(month) }}
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
                    fontSize="12px"
                    color={`${(month === hoverElementId || month === clickedElement) && '#FE7D06'}`}
                    text={`${whichDuration1}${(month === hoverElementId || month === clickedElement) ? `: ${noOfGlyphs} hex` : ''}`}
                // text={'nkj jsi'}
                />
            </Box>
            {/* </Box> */}
        </Box>
    )
}
