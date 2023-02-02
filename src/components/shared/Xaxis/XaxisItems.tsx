import { useState } from "react";
import { Box } from "@mui/material"
import data from 'test.json';
import { Typography } from "../Typography";
import moment from "moment";

export interface XaxisItemsProps {
    month?: any;
    backgroundColor?: string;
    hoverElementId?: number | null;
    onCircleHoverStarts: (month: any) => void;
    onCircleHoverEnds: (month: any) => void;
    onCircleClicked: (month: any) => void;
    dimension?: number;
    noOfGlyphs?: any;
    // id?: any;
    // item?: any;
}

export const XaxisItems = ({
    backgroundColor,
    month,
    hoverElementId,
    onCircleHoverStarts,
    onCircleHoverEnds,
    dimension,
    noOfGlyphs,
    onCircleClicked,
    // id,
    // item,
}: XaxisItemsProps) => {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100px'
        }}>
            <>
                <Typography
                    fontSize="12px"
                    color={`${month === hoverElementId && '#FE7D06'}`}
                    text={`${moment().month(month).format("MMM")}${month === hoverElementId ? `: ${noOfGlyphs} hex` : ''}`}
                />

                <Box sx={{
                    width: dimension,
                    height: dimension,
                    borderRadius: '50%',
                    border: '1px solid black',
                    backgroundColor: month === hoverElementId ? '#FE7D06' : '#FFF7EE',
                    cursor: 'pointer',
                }}
                    onClick={() => onCircleClicked(month)}
                    onMouseEnter={() => onCircleHoverStarts(month)}
                    onMouseLeave={() => onCircleHoverEnds(month)}
                ></Box>
            </>
        </Box>
    )
}
