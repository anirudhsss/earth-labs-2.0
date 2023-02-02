import { Box } from "@mui/material"
import data1 from 'test.json';
import { XaxisItems } from "./XaxisItems";
import { useState, useEffect } from "react";
import { ApiRequest } from "components/utils";
import moment from "moment";

export interface XaxisProps {
    data?: any,
    data2?: any,
    onCircleClicked?: any,
}

export const Xaxis = ({
    data,
    data2,
    onCircleClicked,
}: XaxisProps) => {
    const [backgroundColor, setBackgroundColor] = useState('#FFF7EE');
    const [hoverElementId, setHoverElementId] = useState(null);
    // console.log(onSortingData(data1), typeof (onSortingData(data1)))

    const onCircleHoverStarts = (elementId: any) => {
        setHoverElementId(elementId);
        // setBackgroundColor('#FE7D06');
    }

    const onCircleHoverEnds = (elementId: any) => {
        setHoverElementId(null);
        // setBackgroundColor('#FFF7EE');
    }

    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                position: 'relative',
                top: '17px',
            }}>
                {data2.map((item: any) => {
                    return (
                        <XaxisItems
                            // key={id}
                            dimension={item.dimension}
                            month={item.month}
                            // id={id}
                            backgroundColor={backgroundColor}
                            hoverElementId={hoverElementId}
                            onCircleHoverStarts={onCircleHoverStarts}
                            onCircleHoverEnds={onCircleHoverEnds}
                            noOfGlyphs={item.noOfGlyphs}
                            onCircleClicked={onCircleClicked}
                        />
                    )
                })}
            </Box>
            <Box sx={{ borderBottom: '1px solid black' }}></Box>
        </>
    )
}
