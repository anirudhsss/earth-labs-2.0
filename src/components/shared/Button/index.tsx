import * as React from 'react';
import Stack from '@mui/material/Stack';
import MUIButton from '@mui/material/Button';
import { Typography } from '@mui/material';

export interface ButtonProps {
    onClick?: () => void;
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
    border?: string;
    size?: string;
    children?: any;
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
    border,
    size,
    children,
    ...props
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
                '&:hover': {
                    background: hoverBackgroundColor,
                    boxShadow: hoverBoxShadow,
                }
            }}
            {...props}
        >
            {children}
        </MUIButton>
    );
};


