import * as React from 'react';
import Stack from '@mui/material/Stack';
import MUIButton from '@mui/material/Button';
import { Typography } from '@mui/material';

export interface ButtonProps {
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    title?: string;
    reverse?: boolean;
    icon?: React.ReactElement;
    backgroundColor?: string;
    boxShadow?: string;
    color?: string;
    borderRadius?: string;
    margin?: string;
    hoverBackgroundColor?: string;
    disabled?: boolean;
    hoverBoxShadow?: string;
    padding?: string;
    width?: string;
    border?: string;
    size?: string;
    borderStyle?: string;
    borderColor?: string;
    borderTop?: string;
    paddingTop?: string;
    display?: string;
    justifyContent?: string;
    alignItems?: string;
    children?: any;
    borderBottom?: any;
    textDecoration?: any;
}

export const Button = ({
    title,
    icon,
    reverse = false,
    onClick,
    backgroundColor,
    boxShadow,
    color,
    borderRadius,
    margin,
    hoverBackgroundColor,
    hoverBoxShadow,
    disabled = false,
    padding,
    width,
    border,
    size,
    borderStyle,
    borderColor,
    borderTop,
    paddingTop,
    display,
    justifyContent,
    alignItems,
    children,
    borderBottom,
    textDecoration,
}: ButtonProps) => {
    return (
        <MUIButton
            onClick={onClick}
            variant="contained"
            disabled={disabled}
            size="small"
            sx={{
                color: color,
                textTransform: 'initial',
                borderRadius: borderRadius,
                fontFamily: 'inherit',
                backgroundColor: backgroundColor,
                boxShadow: boxShadow,
                margin: margin,
                padding: padding,
                border: border,
                display: display,
                justifyContent: justifyContent,
                alignItems: alignItems,
                width: width,
                borderStyle: borderStyle,
                borderColor: borderColor,
                borderTop: borderTop,
                paddingTop: paddingTop,
                borderBottom: borderBottom,
                textDecoration: textDecoration,
                '&:hover': {
                    background: hoverBackgroundColor,
                    boxShadow: hoverBoxShadow,
                }
            }}

        >
            {children}
        </MUIButton>
    );
};


