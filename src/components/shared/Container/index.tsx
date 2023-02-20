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
    position?: any;
    height?: any;
}

export const Container = ({
    padding,
    display,
    justifyContent,
    alignItems,
    width,
    borderBottom,
    children,
    position,
    height,
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
                position: position,
                height: height,
            }}
        >
            {children}
        </Box>
    )
}