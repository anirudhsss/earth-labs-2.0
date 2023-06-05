import * as React from "react";
import Box from "@mui/material/Box";
import MUITextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { InputAdornment, InputBaseProps, Typography } from "@mui/material";
import { useCallback } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export interface TextFieldProps {
  title?: string;
  onChange?: (val: string, fieldName?: string) => void;
  value?: string;
  name?: string;
  error?: boolean | undefined;
  readOnly?: boolean;
  padding?: any;
  nolimit?: boolean;
  label?: string;
  width?: string;
  disabled?: boolean;
  [props: string]: any;
  placeholder?: string;
  helperText?: boolean | string | undefined;
  inputProps?: InputBaseProps["inputProps"];
  select?: boolean;
  borderRadius?: string;
  size?: "small" | "medium" | undefined;
  src?: string;
  placeholderColor?: string;
  placeholderFontSize?: string;
  borderColor?: string;
  searchIconColor?: string;
  iconSize?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  title,
  onChange,
  value,
  name,
  placeholderFontSize = "1.2rem",
  error,
  readOnly = false,
  padding = null,
  label,
  width,
  disabled = false,
  nolimit = false,
  placeholder,
  helperText,
  iconSize,
  inputProps,
  borderRadius,
  size,
  color,
  fontSize,
  src,
  placeholderColor,
  borderColor,
  searchIconColor,
  ...props
}: TextFieldProps): JSX.Element => {
  const onChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange?.(e?.target?.value, name ?? ""),
    [onChange, name]
  );

  return (
    <Box component="form" sx={{ marginBottom: "1rem" }} width={width}>
      <Grid
        sx={{
          display: "flex",
          marginBottom: "0.8rem",
          justifyContent: "space-between",
        }}
      >
        <Typography component={"label"} sx={{ fontFamily: "inherit" }}>
          {title}
        </Typography>
        {!nolimit && (
          <Typography
            component={"span"}
            sx={{
              color: "#BABAD6",
              fontSize: "1.2rem",
              fontFamily: "DINAlternateBold",
            }}
          ></Typography>
        )}
      </Grid>
      <MUITextField
        id="outlined-basic"
        variant="outlined"
        sx={{
          display: "flex",

          fontFamily: "DINAlternateBold",
          "& .MuiOutlinedInput-root": {
            borderRadius: borderRadius,
          },
          input: {
            "&::placeholder": {
              fontSize: placeholderFontSize,
              color: { placeholderColor },
              fontWeight: "500",
            },
          },
          fieldset: { borderColor: { borderColor } },
        }}
        onChange={onChangeText}
        value={value}
        placeholder={placeholder}
        InputLabelProps={{}}
        InputProps={{
        
          startAdornment: (
            <InputAdornment sx={{}} position="start">
              <SearchRoundedIcon
                sx={{ color: searchIconColor, fontSize: iconSize }}
              />
              {/* <img src={src} alt="" width="14px" height="14px" /> */}
            </InputAdornment>
          ),
          style: {
            fontFamily: "DINAlternateBold",
            color: color,
            fontSize: fontSize,
          },
        }}
        // inputProps={inputProps ?? {
        //     readOnly,
        //     style: {
        //         padding: padding ? padding : '16.5px 14px'
        //     }
        // }}
        disabled={disabled}
        label={label}
        error={error}
        size={size}
        {...props}
      ></MUITextField>

      {error && (
        <Typography
          component={"span"}
          sx={{ fontFamily: "inherit", color: "red" }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default TextField;
