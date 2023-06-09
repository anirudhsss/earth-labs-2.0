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
  onChange
}: TextFieldProps) => (
  <TextField
    width="67.5rem"
    borderRadius="2rem"
    size="small"
    
    iconSize={iconSize}
    placeholderFontSize={placeholderFontSize}
    placeholder="enter transaction IDs, wallet addresses, etc..."
    color={placeholderColor}
    fontSize={fontSize}
    borderColor={borderColor}
    
    searchIconColor={searchIconColor}
    onChange={onChange}
  />
);
