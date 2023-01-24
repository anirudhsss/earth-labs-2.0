import { Box } from "@mui/material"
import data from 'test.json';
import { XaxisItems } from "./XaxisItems";
import { useState } from "react";

export interface XaxisProps {
}

export const Xaxis = ({
}: XaxisProps) => {
    const [backgroundColor, setBackgroundColor] = useState('#FFF7EE');
    const [hoverElementId, setHoverElementId] = useState(null);

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
                top: '16px',
            }}>
                {data.map(({ id, dimension, month }) => {
                    return (
                        <XaxisItems
                            key={id}
                            dimension={dimension}
                            month={month}
                            backgroundColor={backgroundColor}
                            hoverElementId={hoverElementId}
                            onCircleHoverStarts={onCircleHoverStarts}
                            onCircleHoverEnds={onCircleHoverEnds}
                            id={id}
                        />
                    )
                })}
            </Box>
            <Box sx={{ borderBottom: '1px solid black' }}></Box>
        </>
    )
}
