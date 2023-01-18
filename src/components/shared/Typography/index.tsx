import * as React from 'react';
import MUITypography from '@mui/material/Typography';
import { fontWeight } from '@mui/system';

export interface TypographyProps {
    fontSize?: string;
    text?: string;
    fontWeight?: string;
    width?: string;
    lineHeight?: string;
}

export const Typography = ({
    fontSize,
    text,
    fontWeight,
    width,
    lineHeight,
}: TypographyProps) => {
    return (
        <MUITypography
            sx={{
                fontSize: fontSize || '1.6rem',
                fontWeight: fontWeight,
                width: width,
                lineHeight: lineHeight,
            }}>
            {text}
        </MUITypography>
    );
};


