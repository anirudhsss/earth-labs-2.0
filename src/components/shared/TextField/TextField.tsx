import * as React from 'react';
import Box from '@mui/material/Box';
import MUITextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { InputAdornment, InputBaseProps, Typography } from '@mui/material';
import { useCallback } from 'react';

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
    inputProps?: InputBaseProps['inputProps'];
    select?: boolean;
    borderRadius?: string;
    size?: "small" | "medium" | undefined;
    src?: string;
    placeholderColor?: string;
    placeholderFontSize?: string;
}

const TextField: React.FC<TextFieldProps> = ({
    title,
    onChange,
    value,
    name,
    error,
    readOnly = false,
    padding = null,
    label,
    width,
    disabled = false,
    nolimit = false,
    placeholder,
    helperText,
    inputProps,
    borderRadius,
    size,
    color,
    fontSize,
    src,
    ...props
}: TextFieldProps): JSX.Element => {
    const onChangeText = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) =>
            onChange?.(e?.target?.value, name ?? ''),
        [onChange, name]
    );

    return (
        <Box component="form" sx={{ marginBottom: '1rem' }} width={width}>
            <Grid
                sx={{
                    display: 'flex',
                    marginBottom: '0.8rem',
                    justifyContent: 'space-between'
                }}>
                <Typography component={'label'} sx={{ fontFamily: 'inherit' }}>
                    {title}
                </Typography>
                {!nolimit && (
                    <Typography
                        component={'span'}
                        sx={{
                            color: '#BABAD6',
                            fontSize: '1.2rem',
                            fontFamily: 'inherit'
                        }}>

                    </Typography>
                )}
            </Grid>
            <MUITextField
                id="outlined-basic"
                variant="outlined"
                sx={{
                    display: 'flex',
                    fontFamily: 'inherit',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: borderRadius,
                    }
                }}
                onChange={onChangeText}
                value={value}
                placeholder={placeholder}
                InputLabelProps={{

                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <img src={src} />
                        </InputAdornment>
                    ),
                    style: {
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
                {...props}>

            </MUITextField>

            {error && (
                <Typography
                    component={'span'}
                    sx={{ fontFamily: 'inherit', color: 'red' }}>
                    {helperText}
                </Typography>
            )}
        </Box>
    );
};

export default TextField