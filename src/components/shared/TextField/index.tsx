import * as React from "react";
import TextField, { TextFieldProps } from "./TextField";

export { TextField };

export const NormalSearchField = ({
  placeholderColor,
  borderColor,
  searchIconColor,
  placeholderFontSize,
  iconSize,
  fontSize = "1.2rem",
  onChange,
  width = "67.5rem",
  color,
}: TextFieldProps) => (
  <TextField
    width={width}
    borderRadius="2rem"
    size="small"
    iconSize={iconSize}
    placeholderFontSize={placeholderFontSize}
    placeholder="enter transaction IDs, wallet addresses, etc..."
    color={color}
    fontSize={fontSize}
    borderColor={borderColor}
    searchIconColor={searchIconColor}
    onChange={onChange}
  />
);
