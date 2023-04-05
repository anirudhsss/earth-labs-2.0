import * as React from 'react';
import TextField, { TextFieldProps } from './TextField';

export { TextField };

export const NormalSearchField = ({
    placeholderColor,
    borderColor,
    // src,
    searchIconColor,
}: TextFieldProps) => <TextField
        width="67.5rem"
        borderRadius="2rem"
        size="small"
        // src={src}
        placeholder='enter transaction IDs, wallet addresses, etc...'
        color={placeholderColor}
        fontSize="1.2rem"
        borderColor={borderColor}
        searchIconColor={searchIconColor}
    />;
