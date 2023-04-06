import { Box } from "@mui/material"
import data1 from 'test.json';
import { XaxisItems } from "./XaxisItems";
import { useState, useEffect } from "react";
import { ApiRequest } from "components/utils";
import moment from "moment";

export interface XaxisProps {
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
    range?: any;
    setChosenData?: any;
    chosenData?: any;
}

export const Xaxis = ({
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
    range,
    setChosenData,
    chosenData,
}: XaxisProps) => {

    const whichDuration = monthOrYear === '' ? arrOfYears : (monthOrYear === 'year' || monthOrYear === 'month') ? arrOfMonths : [];
    const [glyphWithMaxDimension, setGlyphWithMaxDimension] = useState<number>(0);
    // useEffect(() => {
    //     let nodes = document.querySelectorAll('.line');
    //     console.log('nodes', nodes);
    // }, []);

    useEffect(() => {
        findMax();
    }, [whichDuration]);

    const findMax = () => {
        whichDuration?.map((item: any) => {
            let max = 0;
            if (Number(item.dimension) > max) {
                max = Number(item.dimension);
            }
            setGlyphWithMaxDimension(max);
        })
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            marginLeft: '2vw',
        }}>
            <Box sx={{
                borderBottom: '1px solid black',
                width: '100%',
                position: 'relative',
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
            <Box sx={{
                display: 'flex',
                justifyContent: whichDuration?.length === 1 ? 'center' : 'space-between',
                alignItems: 'center',
                position: 'relative',
                zIndex: 101,
                bottom: '17.5px',
                width: '100%',
            }}>
                {whichDuration?.map((item: any) => {

                    return (
                        <XaxisItems
                            dimension={item.dimension}
                            month={item.month}
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
                            range={range}
                            setChosenData={setChosenData}
                            chosenData={chosenData}
                            glyphWithMaxDimension={glyphWithMaxDimension}
                        />
                    )
                })}
            </Box>
        </Box>
    )
}
