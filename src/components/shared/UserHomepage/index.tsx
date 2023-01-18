import { Box, CardMedia } from "@mui/material"
import { NormalSearchField } from "../TextField"
import { Typography } from '../Typography'
import styles from './styles.module.css';
import { Button } from '../Button'
import { useCallback } from "react";
import Web3Modal from 'web3modal';
import LoadingSpin from "react-loading-spin";
import { truncate } from '../../utils';

export interface UserHomepageProps {
    children?: any;
    onOpenConnectWalletModal: () => void;
    web3Provider?: any;
    setWeb3Provider?: any;
    loading?: any;
}

export const UserHomepage = ({
    children,
    onOpenConnectWalletModal,
    web3Provider,
    setWeb3Provider,
    loading,
}: UserHomepageProps) => {
    const onClickDisconnect = async () => {
        setWeb3Provider(null);
    }

    const LogoutButton = () => {
        return (
            <div
                onClick={onClickDisconnect}
                style={{
                    backgroundColor: '#000000',
                    cursor: 'pointer',
                    width: '25px',
                    marginLeft: '10px'
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#fff"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                    />
                </svg>
            </div>
        );
    };

    return (
        <>
            {loading && <LoadingSpin />}
            <Box className={styles.header}>
                <Box className={styles.lhsHeader}>
                    <Typography
                        text="Atlas"
                        fontSize="2rem"
                        fontWeight="500"
                    />
                    <NormalSearchField

                    />
                    <Button
                        backgroundColor="#FE7D06"
                        color="white"
                        border="0.5px solid rgba(46, 52, 81, 0.58)"
                        hoverBackgroundColor="#FE7D06"
                        borderRadius="2rem"
                        padding="0.2rem 2.5rem"
                    >
                        <Typography
                            text={web3Provider === null ? 'Search' : 'Generate Glyph'}
                            fontSize="1.4rem"
                        />
                    </Button>
                </Box>
                <Box>
                    {web3Provider === null ?
                        <Button
                            backgroundColor="#ffffff"
                            color="#000000"
                            border="0.5px solid rgba(46, 52, 81, 0.58)"
                            hoverBackgroundColor="#ffffff"
                            borderRadius="2rem"
                            padding="0 3rem"
                            onClick={onOpenConnectWalletModal}
                        >
                            <Typography
                                text="Connect Wallet"
                            />
                        </Button>
                        : <div style={{
                            display: 'flex',
                        }}>
                            <Typography
                                text={truncate(web3Provider.provider.selectedAddress, 12)}
                            />
                            {/* <span style={{ width: '35px' }}>
                                <img src="/assets/images/earth.svg" />
                            </span> */}
                            <LogoutButton />
                        </div>}
                </Box>
            </Box>
            <Box className={styles.body}>
                <Box className={styles.lhsBody}>

                </Box>
                <Box className={styles.rhsBody}>
                    <Box className={styles.mapAndWalletBtn}>
                        <Button
                            backgroundColor="#FE7D06"
                            color="white"
                            border="0.5px solid rgba(46, 52, 81, 0.58)"
                            hoverBackgroundColor="#FE7D06"
                            borderRadius="0.5rem"
                            padding="0.2rem 1.6rem"
                        >
                            <Typography
                                text="Maps"
                                fontSize="1.4rem"
                            />
                        </Button>
                        <Button
                            backgroundColor="#8A8A8A"
                            color="white"
                            border="0.5px solid rgba(46, 52, 81, 0.58)"
                            hoverBackgroundColor="#8A8A8A"
                            borderRadius="0.5rem"
                            padding="0 1.2rem"
                        >
                            <Typography
                                text="Wallet"
                                fontSize="1.4rem"
                            />
                        </Button>
                    </Box>
                    <Box className={styles.allIcons}>
                        <Box className={styles.upperIcons}>
                            <a className={styles.iconOuter}>
                                <img src='/assets/images/home.svg' alt="" className={styles.imageAsIcon} />
                            </a>
                            <a className={styles.iconOuter}>
                                <img src='/assets/images/discovery.svg' alt="" className={styles.imageAsIcon} />
                            </a>
                        </Box>
                        <Box className={styles.lowerIcons}>
                            <a className={styles.iconOuter}>
                                <img src='/assets/images/help.svg' alt="" className={styles.imageAsIcon} />
                            </a>
                            <a href="https://twitter.com/dotearth_" target="_blank" className={styles.iconOuter}>
                                <img src='/assets/images/twitter.svg' alt="" className={styles.imageAsIcon} />
                            </a>
                            <a href="https://discord.com/invite/dotearth" target="_blank" className={styles.iconOuter}>
                                <img src='/assets/images/discord.svg' alt="" className={styles.imageAsIcon} />
                            </a>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {children}
        </>
    )
}