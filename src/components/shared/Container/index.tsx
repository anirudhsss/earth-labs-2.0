import { Box } from "@mui/material"
import { flexbox } from "@mui/system";

export interface ContainerProps {
    padding?: string;
    display?: string;
    justifyContent?: string;
    alignItems?: string;
    width?: string;
    borderBottom?: string;
    children?: any;
}

export const Container = ({
    padding,
    display,
    justifyContent,
    alignItems,
    width,
    borderBottom,
    children,
}: ContainerProps) => {


    return (
        <Box
            sx={{
                display: display,
                justifyContent: justifyContent,
                alignItems: alignItems,
                width: width,
                borderBottom: borderBottom,
                padding: padding,
            }}
        >
            {children}
        </Box>
    )
}