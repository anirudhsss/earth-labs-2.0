import { ReactElement, MouseEvent } from "react";
import MUIButton from "@mui/material/Button";

export interface ButtonProps {
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  title?: string;
  reverse?: boolean;
  icon?: ReactElement;
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
  height?: any;
  textAlign?: any;
  gap?: string;
  fontWeight?: string;
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
  fontWeight,
  justifyContent,
  alignItems,
  children,
  borderBottom,
  textDecoration,
  height,
  textAlign,
  gap
}: ButtonProps) => {
  return (
    <MUIButton
      onClick={onClick}
      variant="contained"
      disabled={disabled}
      size="small"
      sx={{
        color: color,
        fontSize: size,
        textTransform: "initial",
        borderRadius: borderRadius,
        fontFamily: "inherit",
        backgroundColor: backgroundColor,
        boxShadow: boxShadow,
        margin: margin,
        padding: padding,
        border: border,
        display: display,
        justifyContent: justifyContent,
        alignItems: alignItems,
        width: width,
        gap: gap,
        fontWeight: fontWeight,
        borderStyle: borderStyle,
        borderColor: borderColor,
        borderTop: borderTop,
        paddingTop: paddingTop,
        borderBottom: borderBottom,
        textDecoration: textDecoration,
        height: height,
        textAlign: textAlign,
        "&:hover": {
          background: hoverBackgroundColor,
          boxShadow: hoverBoxShadow,
        },
      }}
    >
      {children}
    </MUIButton>
  );
};
