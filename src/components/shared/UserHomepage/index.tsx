import { useCallback, useState } from "react";
import { Box, CardMedia, Divider, Menu, MenuItem } from "@mui/material"
import { NormalSearchField } from "../TextField"
import { Typography } from '../Typography'
import styles from './styles.module.css';
import { Button } from '../Button'
import Web3Modal from 'web3modal';
import LoadingSpin from "react-loading-spin";
import { truncate } from '../../utils';
import data from '../../../test.json';
import { Xaxis } from "../Xaxis";

export interface UserHomepageProps {
    children?: any;
    onOpenConnectWalletModal: () => void;
    userWalletAddress?: any;
    loading?: any;
    logoutWallet?: () => void;
}

const years = ["2020", "2021", "2022", "2023"];

export const UserHomepage = ({
    children,
    onOpenConnectWalletModal,
    userWalletAddress,
    loading,
    logoutWallet,
}: UserHomepageProps) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);

    const onOpenYearMenu = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    }
    const onCloseYearMenu = () => {
        setAnchorEl(null);
    };


    const LogoutButton = () => {
        return (
            <div
                onClick={logoutWallet}
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
                            text={userWalletAddress === null ? 'Search' : 'Generate Glyph'}
                            fontSize="1.4rem"
                        />
                    </Button>
                </Box>
                <Box>
                    {userWalletAddress === null ?
                        <Button
                            backgroundColor="transparent"
                            color="#000000"
                            border="0.5px solid rgba(46, 52, 81, 0.58)"
                            hoverBackgroundColor="transparent"
                            borderRadius="2rem"
                            padding="0.3rem 2.5rem"
                            onClick={onOpenConnectWalletModal}
                        >
                            <Typography
                                text="Connect Wallet"
                                fontSize="1.3rem"
                            />
                        </Button>
                        : <div style={{
                            display: 'flex',
                        }}>
                            <Typography
                                text={truncate(userWalletAddress, 12)}
                            />
                            {/* <span style={{ width: '35px' }}>
                                <img src="/assets/images/earth.svg" />
                            </span> */}
                            <LogoutButton />
                        </div>}
                </Box>
            </Box>
            <Box className={styles.body}>
                <Box
                    className={styles.lhsBody}
                >
                    <Box className={styles.lhsBody1}></Box>
                    <Box className={styles.lhsBody2}>
                        <Xaxis />
                    </Box>
                </Box>
                <Box className={styles.rhsBody}>
                    <Box className={styles.mapAndWalletBtn}>
                        <Button
                            backgroundColor="#FE7D06"
                            color="white"
                            border="0.5px solid rgba(46, 52, 81, 0.58)"
                            hoverBackgroundColor="#FE7D06"
                            borderRadius="0.6rem"
                            padding="0.4rem 2.2rem"
                        >
                            <Typography
                                text="Maps"
                                fontSize="1.3rem"
                            />
                        </Button>
                        <Button
                            backgroundColor="#8A8A8A"
                            color="white"
                            border="0.5px solid rgba(46, 52, 81, 0.58)"
                            hoverBackgroundColor="#8A8A8A"
                            borderRadius="0.6rem"
                            padding="0.4rem 2rem"
                        >
                            <Typography
                                text="Wallet"
                                fontSize="1.3rem"
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
                        <Box className={styles.timeMenuBtn}>
                            <Button
                                backgroundColor="#FFF7EE"
                                hoverBackgroundColor="#FFF7EE"
                                color="black"
                                boxShadow="none"
                                hoverBoxShadow="none"
                                borderRadius={`${openMenu ? '0 0 2rem 2rem' : '2rem'}`}
                                padding="5px 22px"
                                width="85px"
                                display="flex"
                                justifyContent="space-around"
                                alignItems="center"
                                border="1px solid #000"
                                borderTop={`${openMenu ? '0' : '1px solid #000'}`}
                                paddingTop={`${openMenu && '0px'}`}
                                onClick={onOpenYearMenu}
                            >
                                <Typography
                                    text="time"
                                    fontSize="13px"
                                    color={`${openMenu ? '#FE7D06' : '#000'}`}
                                />
                                <img
                                    src={`${openMenu ? '/assets/images/orangeTriangle.svg' : '/assets/images/blackTriangle.svg'}`}
                                    alt=""
                                    className={styles.blackTriangle}
                                />
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={openMenu}
                                onClose={onCloseYearMenu}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                // className={styles.menuItem}
                                // MenuListProps={{
                                //     sx: {
                                //         width: anchorEl && anchorEl.offsetWidth,
                                //     }
                                // }}
                                PaperProps={{
                                    elevation: 0,
                                    style: {
                                        width: '85px',
                                        borderRadius: '20px 20px 0 0',
                                        backgroundColor: '#FFF7EE',
                                        borderBottom: '0px',
                                        borderLeft: '1px solid #000',
                                        borderRight: '1px solid #000',
                                        borderTop: '1px solid #000',
                                    },

                                }}
                            >
                                {years.map((year: any) => {
                                    return (
                                        <>
                                            <MenuItem
                                                sx={{
                                                    fontSize: '13px',
                                                }}
                                            >{year}</MenuItem>
                                            <Divider

                                                style={{
                                                    marginTop: '0px',
                                                    marginBottom: '0px',
                                                }}
                                            />
                                        </>
                                    )
                                })}
                            </Menu>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {children}
        </>
    )
}