
import { Avatar, Box } from '@mui/material';
import { Button } from 'components/shared/Button';
import { Container } from 'components/shared/Container';
import { NormalSearchField } from 'components/shared/TextField';
import { Typography } from 'components/shared/Typography';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './styles.module.css';

export interface WalletProps {

}

export const Wallet = ({

}: WalletProps) => {
    const location = useLocation();
    const homeLocation = location?.state?.icon === 'home';
    const walletLocation = location?.state?.icon === 'wallet';
    const mapsLocation = location?.state?.icon === 'maps';

    return (
        <Box sx={{
            backgroundColor: 'rgba(28, 34, 61, 0.96)',

        }}
        >
            <Container
                padding="0.5rem 2rem 0.5rem 0"
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                width='100%'
                borderBottom='0.5px solid #000000'
            >
                <Box className={styles.lhsHeader}>
                    <span style={{ marginLeft: '15px' }}>
                        {/* <img
                            src='./assets/images/atlasLogo.png'
                            alt=""
                            width="100"
                            height="40"
                            style={{
                                backgroundColor: 'transparent'
                            }}
                        /> */}

                        <Typography
                            text="Atlas"
                            fontSize='2rem'
                            color='#ffffff'
                        />
                    </span>
                </Box>
                <Box>
                    {/* {userWalletAddress === null ?
                        <Button
                            backgroundColor="transparent"
                            color="#000000"
                            border="0.5px solid rgba(46, 52, 81, 0.58)"
                            hoverBackgroundColor="transparent"
                            borderRadius="2rem"
                            padding="0.3rem 2.5rem"
                            // onClick={onOpenConnectWalletModal}
                        >
                            <Typography
                                text="Connect Wallet"
                                fontSize="1.3rem"
                            />
                        </Button>
                        :  */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '14rem'
                    }}>
                        <Typography
                            text="Allen.earth.eth"
                            fontSize="1.4rem"
                            color='#fff'
                        />
                        <Avatar
                            alt=""
                            src="/assets/images/avatarTest.jpg"
                            sx={{
                                width: 30,
                                height: 30,
                                cursor: 'pointer',
                            }}
                        />
                    </div>
                    {/* } */}
                </Box>
            </Container>
            {/* </Box> */}

            <Container padding="0.5rem 2rem 0 2rem">
                <Box className={styles.body}>
                    <Box
                        className={styles.lhsBody}
                    >
                        <Box className={styles.bwText} sx={{
                            margin: '2rem 0 0 12rem',
                        }}>
                            <Typography
                                text="Atlas Wallet"
                                fontSize='2rem'
                                color='#ffffff'
                            />
                            <Button
                                borderRadius="20px"
                                padding="5px 30px"
                                backgroundColor='#fff'
                                hoverBackgroundColor='#fff'
                            >
                                <Typography
                                    text="Coins & FTs"
                                    fontSize='1.2rem'
                                    color='#000'
                                />
                            </Button>
                            <Button
                                borderRadius="20px"
                                padding="5px 30px"
                                backgroundColor='#fff'
                                hoverBackgroundColor='#fff'
                            >
                                <Typography
                                    text="Collectibles"
                                    fontSize='1.2rem'
                                    color='#000'
                                />
                            </Button>
                            <Button
                                borderRadius="20px"
                                padding="5px 30px"
                                backgroundColor='#fff'
                                hoverBackgroundColor='#fff'
                            >
                                <Typography
                                    text="POAPs & Badges"
                                    fontSize='1.2rem'
                                    color='#000'
                                />
                            </Button>
                            <Button
                                borderRadius="20px"
                                padding="5px 30px"
                                backgroundColor='#fff'
                                hoverBackgroundColor='#fff'
                            >
                                <Typography
                                    text="Content"
                                    fontSize='1.2rem'
                                    color='#000'
                                />
                            </Button>
                        </Box>
                        <Box className={styles.glyphContainerParent} sx={{
                            margin: '2rem 0 0 8rem',
                        }}>
                            <span className={styles.glyphContainer}>
                                <img src="./testImage.png" width="275px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="275px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="275px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="275px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="275px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                        </Box>
                        <Box className={styles.glyphContainerParent} sx={{
                            margin: '5rem 0 0 8rem',
                        }}>
                            <span className={styles.glyphContainer}>
                                <img src="./testImage.png" width="275px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="275px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="275px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="275px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="275px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                        </Box>
                        <Box className={styles.glyphContainerParent} sx={{
                            margin: '5rem 0 0 8rem',
                        }}>
                            <span className={styles.glyphContainer}>
                                <img src="./testImage.png" width="275px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="275px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="275px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="275px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="275px" />
                                <Typography
                                    text="view activities >"
                                    color='#ffffff'
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                        </Box>
                    </Box>
                    <Box className={styles.rhsBody}>
                        <Box className={styles.mapAndWalletBtn}>
                            <Link
                                to="/maps"
                                state={{
                                    icon: 'maps',
                                }}
                                style={{ textDecoration: 'none', }}
                            >
                                <Button
                                    backgroundColor={`${walletLocation ? '#FFF7EE' : '#FE7D06'}`}
                                    color={`${walletLocation ? '#000' : '#fff'}`}
                                    border="0.5px solid rgba(46, 52, 81, 0.58)"
                                    hoverBackgroundColor={`${walletLocation ? '#FFF7EE' : '#FE7D06'}`}
                                    borderRadius="0.6rem"
                                    padding="0.4rem 0.2rem"
                                    width="75px"
                                >
                                    <Typography
                                        text="My Atlas"
                                        fontSize="1.3rem"
                                    />
                                </Button>
                            </Link>
                            <Link
                                to="/wallet"
                                state={{
                                    icon: 'wallet',
                                }}
                                style={{ textDecoration: 'none', }}
                            >
                                <Button
                                    backgroundColor={`${(walletLocation) ? '#FE7D06' : '#FFF7EE'}`}
                                    color={`${walletLocation ? '#fff' : '#000'}`}
                                    border="0.5px solid rgba(46, 52, 81, 0.58)"
                                    hoverBackgroundColor={`${walletLocation ? '#FE7D06' : '#FFF7EE'}`}
                                    borderRadius="0.6rem"
                                    padding="0.4rem 2rem"
                                    textDecoration="none"
                                >
                                    <Typography
                                        text="Wallet"
                                        fontSize="1.3rem"
                                    />
                                </Button>
                            </Link>
                        </Box>
                        <Box className={styles.allIcons}>
                            <Box className={styles.upperIcons}>
                                <Link
                                    to="/maps"
                                    state={{
                                        icon: 'home',
                                    }}
                                >
                                    <span
                                        className={styles.iconOuter}
                                        style={{ backgroundColor: (homeLocation || mapsLocation || walletLocation) ? '#FE7D06' : '#FFF7EE' }}
                                    >
                                        <img
                                            src='/assets/images/home.svg'
                                            alt=""
                                            className={styles.imageAsIcon}
                                        />
                                    </span>
                                </Link>
                                <Link
                                    to="/discovery"
                                    state={{
                                        icon: 'discovery',
                                    }}
                                >
                                    <span
                                        className={styles.iconOuter}
                                        style={{ backgroundColor: location?.state?.icon === 'discovery' ? '#FE7D06' : '#FFF7EE' }}
                                    >
                                        <img
                                            src='/assets/images/discovery.svg'
                                            alt=""
                                            className={styles.imageAsIcon}
                                        />
                                    </span>
                                </Link>
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

            </Container>
        </Box>
    )
}