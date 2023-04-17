import * as React from "react";
import TextField, { TextFieldProps } from "./TextField";

export { TextField };

export const NormalSearchField = ({
  placeholderColor,
  borderColor,
  searchIconColor,
  placeholderFontSize,
  fontSize = "1.2rem",
}: TextFieldProps) => (
  <TextField
    width="67.5rem"
    borderRadius="2rem"
    size="small"
    placeholderFontSize={placeholderFontSize}
    placeholder="enter transaction IDs, wallet addresses, etc..."
    color={placeholderColor}
    fontSize={fontSize}
    borderColor={borderColor}
    searchIconColor={searchIconColor}
  />
);
