import { Dialog } from "@mui/material";


export interface ModalDialogProps {
    fullScreen?: any
    openWalletModal?: any;
    onWalletBtnClickClose?: any;
    children?: any
}

export const ModalDialog = ({
    fullScreen,
    openWalletModal,
    onWalletBtnClickClose,
    children,
}: ModalDialogProps) => {

    return (
        <Dialog
            fullScreen={fullScreen}
            open={openWalletModal}
            onClose={onWalletBtnClickClose}
            PaperProps={{
                style: {
                    // opacity: '0.9'
                },
            }}
        >
            {children}
        </Dialog>
    )
}