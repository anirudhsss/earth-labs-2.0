import { Box, Typography } from "@mui/material"


export interface XaxisItemsProps {
    width?: number;
    height?: number;
    backgroundColor?: string;
    month?: string;
}

export const XaxisItems = ({
    width,
    height,
    backgroundColor,
    month,
}: XaxisItemsProps) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <Typography sx={{ fontSize: '14px' }}>
                {month}
            </Typography>
            <Box sx={{
                width: width,
                height: height,
                borderRadius: '50%',
                border: '1px solid black',
                backgroundColor: backgroundColor,
            }}></Box>
        </Box >
    )
}
