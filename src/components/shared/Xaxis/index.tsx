import { Box, Typography } from "@mui/material"
import { XaxisItems } from "./XaxisItems";
import data from 'test.json';

export interface XaxisProps {
    // width?: string;
    // height?: string;
    // backgroundColor?: string;
}

export const Xaxis = ({
    // width,
    // height,
    // backgroundColor,
}: XaxisProps) => {
    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                position: 'relative',
                top: '16px',
            }}>
                {data.map(({ dimension, month }) => {
                    return (
                        <XaxisItems
                            width={dimension}
                            height={dimension}
                            backgroundColor="#F5F5F5"
                            month={month}
                        />
                    )
                })}
            </Box>
            <Box sx={{ borderBottom: '1px solid black' }}></Box>
        </>
    )
}
