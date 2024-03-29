import { Box } from "@mui/material";

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
  margin?: any;
  backgroundColor?: string;
  overflow?: string;
  opacity?: string;
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
  margin,
  overflow,
  backgroundColor,
  opacity,
}: ContainerProps) => {
  return (
    <Box
      sx={{
        overflow: overflow,
        display: display,
        justifyContent: justifyContent,
        alignItems: alignItems,
        width: width,
        borderBottom: borderBottom,
        padding: padding,
        position: position,
        height: height,
        margin: margin,
        backgroundColor: backgroundColor,
        opacity: opacity,
      }}
    >
      {children}
    </Box>
  );
};
