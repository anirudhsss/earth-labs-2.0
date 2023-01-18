import * as React from 'react';
import TextField, { TextFieldProps } from './TextField';

export { TextField };

export const NormalSearchField = (props: TextFieldProps) => <TextField
    width="67.5rem"
    borderRadius="2rem"
    size="small"
    src="/assets/images/search.svg"
    placeholder='enter transaction IDs, wallet addresses, etc...'
    color='rgba(0, 0, 0, 0.6)'
    fontSize="1.2rem"
/>;
