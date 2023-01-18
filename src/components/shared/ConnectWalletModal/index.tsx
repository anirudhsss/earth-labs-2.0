
import { CardMedia, Dialog, DialogContent, Box, } from "@mui/material";
import { Button } from '../Button';
import { Typography } from '../Typography';

import styles from "./styles.module.css";

export interface ConnectWalletModalProps {
    // open: boolean;
    // selectedValue: string;
    onClose: (value: string) => void;
    open?: any;
    onConnectMetamask?: any;
}

export const ConnectWalletModal = ({ open, onConnectMetamask, onClose }: ConnectWalletModalProps) => {


    return (
        <Dialog open={open} onClose={onClose} PaperProps={{
            style: { borderRadius: 20, width: 1000, backgroundColor: '#FFFDFB' }
        }}>
            {/* <DialogContent> */}
            <Box>
                <Box className={styles.bothWallets}>
                    <Box
                        className={styles.walletConnectPage}
                        onClick={onConnectMetamask}
                    >
                        <Box>
                            <CardMedia
                                component="img"
                                height="60"
                                image={'/assets/images/metamask.svg'}
                                alt='Metamask'
                            />
                        </Box>
                        <Box className={styles.both}>
                            <Typography
                                text="Metamask"
                                fontSize="2rem"
                            />
                            <Button
                                backgroundColor="transparent"
                                color="black"
                                border="0.5px solid rgba(46, 52, 81, 0.58)"
                                hoverBackgroundColor="transparent"
                                borderRadius="2rem"
                                padding="0 2rem"
                            >
                                <Typography text="Connect" />
                            </Button>
                        </Box>
                    </Box>
                    <Box className={styles.walletConnectPage}>
                        <Box>
                            <CardMedia
                                component="img"
                                height="60"
                                image={'/assets/images/coinbase.svg'}
                                alt='Coinbase'
                            />
                        </Box>
                        <Box className={styles.both}>
                            <Typography
                                text="Coinbase"
                                fontSize="2rem"
                            />
                            <Button
                                backgroundColor="transparent"
                                color="black"
                                border="0.5px solid rgba(46, 52, 81, 0.58)"
                                hoverBackgroundColor="transparent"
                                borderRadius="2rem"
                                padding="0 2rem"
                            >
                                <Typography text="Connect" />
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Box className={styles.bothWallets}>
                    <Box className={styles.walletConnectPage}>
                        <Box>
                            <CardMedia
                                component="img"
                                height="60"
                                image={'/assets/images/walletconnect.svg'}
                                alt='Wallet Connect'
                            />
                        </Box>
                        <Box className={styles.both}>
                            <Typography
                                text="Wallet Connect"
                                fontSize="2rem"
                            />
                            <Button
                                backgroundColor="transparent"
                                color="black"
                                border="0.5px solid rgba(46, 52, 81, 0.58)"
                                hoverBackgroundColor="transparent"
                                borderRadius="2rem"
                                padding="0 2rem"
                            >
                                <Typography text="Connect" />
                            </Button>
                        </Box>
                    </Box>
                    <Box className={styles.walletConnectPage}>
                        <Box>
                            <CardMedia
                                component="img"
                                height="60"
                                image={'/assets/images/portis.svg'}
                                alt='Portis'
                            />
                        </Box>
                        <Box className={styles.both}>
                            <Typography
                                text="Portis"
                                fontSize="2rem"
                            />
                            <Button
                                backgroundColor="transparent"
                                color="black"
                                border="0.5px solid rgba(46, 52, 81, 0.58)"
                                hoverBackgroundColor="transparent"
                                borderRadius="2rem"
                                padding="0 2rem"
                            >
                                <Typography text="Connect" />
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Box className={styles.bothWallets}>
                    <Box className={styles.walletConnectPage}>
                        <Box>
                            <CardMedia
                                component="img"
                                height="60"
                                image={'/assets/images/torus.svg'}
                                alt='Torus'
                            />
                        </Box>
                        <Box className={styles.both}>
                            <Typography
                                text="Torus"
                                fontSize="2rem"
                            />
                            <Button
                                backgroundColor="transparent"
                                color="black"
                                border="0.5px solid rgba(46, 52, 81, 0.58)"
                                hoverBackgroundColor="transparent"
                                borderRadius="2rem"
                                padding="0 2rem"
                            >
                                <Typography text="Connect" />
                            </Button>
                        </Box>
                    </Box>
                    <Box className={styles.walletConnectPage}>
                        <Box>
                            <CardMedia
                                component="img"
                                height="60"
                                image={'/assets/images/mewwallet.svg'}
                                alt='MEW Wallet'
                            />
                        </Box>
                        <Box className={styles.both}>
                            <Typography
                                text="MEW Wallet"
                                fontSize="2rem"
                            />
                            <Button
                                backgroundColor="transparent"
                                color="black"
                                border="0.5px solid rgba(46, 52, 81, 0.58)"
                                hoverBackgroundColor="transparent"
                                borderRadius="2rem"
                                padding="0 2rem"
                            >
                                <Typography text="Connect" />
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {/* </DialogContent> */}
        </Dialog>
    );
};
