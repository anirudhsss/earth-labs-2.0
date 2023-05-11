import * as React from 'react';
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
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
    open?: any;
    onClose?: any;
    helpPageComponent?: any;
    borderRadius?: any;
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
    open,
    onClose,
    helpPageComponent,
    borderRadius,
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
                onClose={onClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth='lg'
                PaperProps={{
                    style: {
                        borderRadius: borderRadius,
                        position: 'absolute',
                        right: '160px',
                        bottom: '100px',
                    }
                }}
            >
                {/* <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Modal title
                </BootstrapDialogTitle> */}
                {open && <DialogContent
                // dividers
                >
                    {helpPageComponent}
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