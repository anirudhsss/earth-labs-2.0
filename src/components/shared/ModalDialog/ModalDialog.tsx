import * as React from 'react';
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Box } from '@mui/material';
import { Typography } from '../Typography';
import { Button } from '../Button';
// import DialogActions from '@mui/material/DialogActions';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: 0,
        // borderRadius: '30px',
    },
    '& .MuiBox-root': {
        margin: 0,
    },
    // '& .MuiDialogActions-root': {
    //     padding: theme.spacing(1),
    // },
}));

// export interface DialogTitleProps {
//     id: string;
//     children?: React.ReactNode;
//     onClose: () => void;
// }

export interface CustomizedDialogsProps {
    fullScreen?: any;
    open?: any;
    onClose?: any;
    componentLoaded?: any;
    borderRadius?: any;
    opacity?: string | undefined;
    eachGlyphClicked?: boolean;
    onEachGlyphClickedClose?: any;
    backgroundColor?: any;
    maxWidth?: any;
    position?: any;
    right?: any;
    bottom?: any;
}

// function BootstrapDialogTitle(props: DialogTitleProps) {
//     const { children, onClose, ...other } = props;

//     return (
//         <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//             {children}
//             {onClose ? (
//                 <IconButton
//                     aria-label="close"
//                     onClick={onClose}
//                     sx={{
//                         position: 'absolute',
//                         right: 8,
//                         top: 8,
//                         color: (theme) => theme.palette.grey[500],
//                     }}
//                 >
//                     <CloseIcon />
//                 </IconButton>
//             ) : null}
//         </DialogTitle>
//     );
// }

const CustomizedDialogs = ({
    fullScreen,
    open,
    onClose,
    componentLoaded,
    borderRadius,
    opacity,
    eachGlyphClicked,
    onEachGlyphClickedClose,
    backgroundColor,
    maxWidth,
    position,
    right,
    bottom,
}: CustomizedDialogsProps) => {
    // const [open, setOpen] = React.useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    // const handleClose = () => {
    //     setOpen(false);
    // };

    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                
            </Button> */}
            <BootstrapDialog
                fullScreen={fullScreen}
                onClose={onClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth={maxWidth}
                PaperProps={{
                    style: {
                        borderRadius: borderRadius,
                        position: position,
                        right: right,
                        bottom: bottom,
                        opacity: opacity,
                        backgroundColor: backgroundColor,
                    }
                }}
            >
                {eachGlyphClicked && <Box
                    sx={{
                        position: 'absolute',
                        right: '50px',
                        top: '70px',
                        cursor: 'pointer',
                        zIndex :'9999'
                    }}
                    onClick={onEachGlyphClickedClose}
                >
                    {/* <Button
                        backgroundColor='white'
                        hoverBackgroundColor='white'
                        borderRadius='20px'
                        onClick={onEachGlyphClickedClose}
                    > */}
                    <Typography
                        text='x'
                        color='#fffdfb'
                        fontSize='2.5rem'
                    />
                    {/* </Button> */}
                </Box>}
                {/* <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Modal title
                </BootstrapDialogTitle> */}
                {open && <DialogContent
                // dividers
                >
                    {componentLoaded}
                </DialogContent>}
                {/* <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions> */}
            </BootstrapDialog>
        </div>
    );
}

export default CustomizedDialogs;