import { Box } from "@mui/material"
import data1 from 'test.json';
import { XaxisItems } from "./XaxisItems";
import { useState, useEffect } from "react";
import { ApiRequest } from "components/utils";
import moment from "moment";

export interface XaxisProps {
    data?: any,
    // data2?: any,
    onCircleClicked: (month: any) => void;
    onDisplayYear: () => void;
    onDisplayMonth: (year: any) => void;
    clickedElement?: any,
    monthOrYear?: any;
    data1?: any;
    arrOfMonths?: any;
    arrOfYears?: any;
    setArrOfYears?: any;
    matchedMonths?: any;
    setMatchedMonths?: any;
    yearViewEnabled?: any;
    setYearViewEnabled?: any;
    backgroundColor?: string;
    loading1?: any;
    hoverElementId?: number | null;
    onCircleHoverStarts: (elementId: any) => void;
    onCircleHoverEnds: (elementId: any) => void;
}

export const Xaxis = ({
    data,
    // data2,
    onCircleClicked,
    clickedElement,
    monthOrYear,
    onDisplayYear,
    onDisplayMonth,
    data1,
    arrOfMonths,
    arrOfYears,
    setArrOfYears,
    matchedMonths,
    setMatchedMonths,
    yearViewEnabled,
    setYearViewEnabled,
    backgroundColor,
    hoverElementId,
    onCircleHoverStarts,
    onCircleHoverEnds,
    loading1,
}: XaxisProps) => {
    const whichDuration = monthOrYear === 'year' ? arrOfYears : monthOrYear === 'month' ? arrOfMonths : [];

    useEffect(() => {
        setArrOfYears(onDisplayYear);
    }, [data1])

    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                position: 'relative',
                zIndex: 99,
                top: '17px',
                // width: '91vw',
            }}>
                {whichDuration?.map((item: any) => {
                    return (
                        <XaxisItems
                            // key={id}
                            dimension={item.dimension}
                            month={item.month}
                            //year={item.year}
                            // id={id}
                            backgroundColor={backgroundColor}
                            hoverElementId={hoverElementId}
                            onCircleHoverStarts={onCircleHoverStarts}
                            onCircleHoverEnds={onCircleHoverEnds}
                            noOfGlyphs={item.noOfGlyphs}
                            onCircleClicked={onCircleClicked}
                            clickedElement={clickedElement}
                            monthOrYear={monthOrYear}
                            onDisplayMonth={onDisplayMonth}
                            data1={data1}
                            matchedMonths={matchedMonths}
                            setMatchedMonths={setMatchedMonths}
                            yearViewEnabled={yearViewEnabled}
                            setYearViewEnabled={setYearViewEnabled}
                        />
                    )
                })}
            </Box>
            <Box sx={{
                borderBottom: '1px solid black',
                marginTop: loading1 === false ? '0' : '53px',
                // position: 'relative',
            }}>
                {/* <span
                    style={{
                        position: 'absolute',
                        fontSize: '1.5rem',
                        right: '-3px',
                        top: '-5px',
                    }}
                >&#x2C3;</span> */}
            </Box>
        </>
    )
}
