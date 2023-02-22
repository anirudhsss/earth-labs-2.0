
import { Avatar, Box } from '@mui/material';
import { Button } from 'components/shared/Button';
import { Container } from 'components/shared/Container';
import { Header } from 'components/shared/Header';
import { ModalDialog } from 'components/shared/ModalDialog';
import { RhsNav } from 'components/shared/RhsNav';
import { NormalSearchField } from 'components/shared/TextField';
import { Typography } from 'components/shared/Typography';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './styles.module.css';

export interface WalletProps {
    openWalletModal?: any;
    onWalletBtnClickClose?: any;
}

export const Wallet = ({
    openWalletModal,
    onWalletBtnClickClose,
}: WalletProps) => {
    const location = useLocation();
    const homeLocation = location?.state?.icon === 'home';
    const walletLocation = location?.state?.icon === 'wallet';
    const mapsLocation = location?.state?.icon === 'maps';
    const discoveryLocation = location?.state?.icon === 'discovery';

    //const [openWalletModal, setOpenWalletModal] = useState(false);

    // const onWalletBtnClickOpen = () => {
    //     setOpenWalletModal(true);
    // }

    // const onWalletBtnClickClose = () => {
    //     setOpenWalletModal(false);
    // }

    return (
        <Box sx={{
            backgroundColor: '#1C223D',

        }}
        >
            <Header
                homeLocation={homeLocation}
                walletLocation={walletLocation}
                mapsLocation={mapsLocation}
                discoveryLocation={discoveryLocation}
                openWalletModal={openWalletModal}
            />

            <Container padding="0.5rem 2rem 0 2rem">
                <Box className={styles.body}>
                    <Box
                        className={styles.lhsBody}
                    >
                        <Box className={styles.bwText} sx={{
                            margin: '0rem 0 0 27rem',
                        }}>
                            <Typography
                                text="Atlas Wallet"
                                fontSize='2.5rem'
                                color='#ffffff'
                            />
                            <Button
                                borderRadius="20px"
                                padding="3px 25px"
                                backgroundColor='#fff'
                                hoverBackgroundColor='#fff'
                                width='150px'
                            >
                                <Typography
                                    text="Coins & FTs"
                                    fontSize='1.4rem'
                                    color='#000'
                                />
                            </Button>
                            <Button
                                borderRadius="20px"
                                padding="3px 25px"
                                backgroundColor='#fff'
                                hoverBackgroundColor='#fff'
                                width='150px'
                            >
                                <Typography
                                    text="Collectibles"
                                    fontSize='1.4rem'
                                    color='#000'
                                />
                            </Button>
                            <Button
                                borderRadius="20px"
                                padding="3px 25px"
                                backgroundColor='#fff'
                                hoverBackgroundColor='#fff'
                                width='150px'
                            >
                                <Typography
                                    text="POAPs & Badges"
                                    fontSize='1.4rem'
                                    color='#000'
                                />
                            </Button>
                            <Button
                                borderRadius="20px"
                                padding="3px 25px"
                                backgroundColor='#fff'
                                hoverBackgroundColor='#fff'
                                width='150px'
                            >
                                <Typography
                                    text="Content"
                                    fontSize='1.4rem'
                                    color='#000'
                                />
                            </Button>
                        </Box>
                        <Box className={styles.glyphContainerParent} sx={{
                            margin: '0rem 0 0 23rem',
                        }}>
                            <span className={styles.glyphContainer}>
                                <img src="./testImage.png" width="249px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.3rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="249px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.3rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="249px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.3rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="249px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.3rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="249px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.3rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                        </Box>
                        <Box className={styles.glyphContainerParent} sx={{
                            margin: '5rem 0 0 23rem',
                        }}>
                            <span className={styles.glyphContainer}>
                                <img src="./testImage.png" width="249px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.3rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="249px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.3rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="249px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.3rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="249px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.3rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="249px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.3rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                        </Box>
                        <Box className={styles.glyphContainerParent} sx={{
                            margin: '5rem 0 0 23rem',
                        }}>
                            <span className={styles.glyphContainer}>
                                <img src="./testImage.png" width="249px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.3rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="249px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.3rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="249px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.3rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="249px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.3rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="249px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.3rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                        </Box>
                    </Box>
                    <RhsNav
                        openWalletModal={openWalletModal}
                        onWalletBtnClickClose={onWalletBtnClickClose}
                    />
                </Box>

            </Container>
        </Box>

    )
}