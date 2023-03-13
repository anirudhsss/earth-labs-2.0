import * as React from 'react';
import MUITypography from '@mui/material/Typography';
import { fontWeight } from '@mui/system';

export interface TypographyProps {
    fontSize?: string;
    text?: string;
    fontWeight?: string;
    width?: string;
    lineHeight?: string;
    color?: string;
    margin?: string;
    marginTop?: string;
}

export const Typography = ({
    fontSize,
    text,
    fontWeight,
    width,
    lineHeight,
    color,
    margin,
    marginTop,
}: TypographyProps) => {
    return (
        <MUITypography
            sx={{
                fontSize: fontSize,
                fontWeight: fontWeight,
                width: width,
                lineHeight: lineHeight,
                color: color,
                margin: margin,
                marginTop: marginTop,
            }}>
            {text}
        </MUITypography>
    );
};


