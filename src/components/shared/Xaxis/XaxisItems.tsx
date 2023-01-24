import { useState } from "react";
import { Box } from "@mui/material"
import data from 'test.json';
import { Typography } from "../Typography";

export interface XaxisItemsProps {
    month?: string;
    backgroundColor?: string;
    hoverElementId?: number | null;
    onCircleHoverStarts: (id: any) => void;
    onCircleHoverEnds: (id: any) => void;
    dimension?: number;
    id?: any;
}

export const XaxisItems = ({
    backgroundColor,
    month,
    hoverElementId,
    onCircleHoverStarts,
    onCircleHoverEnds,
    dimension,
    id,
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
                    color={`${id === hoverElementId && '#FE7D06'}`}
                    text={`${month} ${id === hoverElementId ? `${dimension}: glyphs` : ''}`}
                />

                <Box sx={{
                    width: dimension,
                    height: dimension,
                    borderRadius: '50%',
                    border: '1px solid black',
                    backgroundColor: id === hoverElementId ? '#FE7D06' : '#FFF7EE',
                    cursor: 'pointer'
                }}
                    onMouseEnter={() => onCircleHoverStarts(id)}
                    onMouseLeave={() => onCircleHoverEnds(id)}
                ></Box>
            </>
        </Box>
    )
}
