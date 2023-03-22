import { Box } from "@mui/material"


export interface YaxisItemsProps {

}

export const YaxisItems = ({

}: YaxisItemsProps) => {


    return (
        <Box
            sx={{
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                border: '1px solid black',
                backgroundColor: '#FE7D06',
                cursor: 'pointer',
            }}
        >

        </Box>
    )
}