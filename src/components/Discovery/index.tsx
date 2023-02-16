import { useCallback, useEffect, useState } from "react";
import { Avatar, Box, CardMedia, Divider, Menu, MenuItem } from "@mui/material"
import styles from './styles.module.css';
import { NormalSearchField } from "components/shared/TextField";
import { Typography } from "components/shared/Typography";
import { Button } from "components/shared/Button";
import { ApiRequest, truncate } from "components/utils";
import { ImageList1 } from "components/shared/ImageList";
import { Link, useLocation } from "react-router-dom";
import { Container } from "components/shared/Container";

export interface DiscoveryProps {
    userWalletAddress?: any;
}

export const Discovery = ({
    userWalletAddress,
}: DiscoveryProps) => {
    const location = useLocation();
    // const { icon } = location?.state;
    const [data, setData] = useState<any>();

    useEffect(() => {
        const info = async () => {
            const res = await ApiRequest();
            setData(res);
        }
        info();
    }, [])

    return (
        <>
            <Container
                padding="0.5rem 2rem 0.5rem 0"
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                width='100%'
                borderBottom='0.5px solid #000000'
            >
                <Box className={styles.lhsHeader}>
                    {/* <Typography
                        text="Atlas"
                        fontSize="2rem"
                        fontWeight="500"
                    /> */}
                    <span style={{ marginLeft: '5px' }}>
                        <img
                            src='./assets/images/atlasLogo.png'
                            alt=""
                            width="100"
                            height="40"
                            style={{
                                backgroundColor: 'transparent'
                            }}
                        />
                    </span>
                    <NormalSearchField

                    />
                    <Button
                        backgroundColor="#FE7D06"
                        color="white"
                        border="0.5px solid rgba(46, 52, 81, 0.58)"
                        hoverBackgroundColor="#FE7D06"
                        borderRadius="2rem"
                        padding="0.2rem 2.5rem"
                        margin="0 0 0 1rem"
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
                        // onClick={onOpenConnectWalletModal}
                        >
                            <Typography
                                text="Connect Wallet"
                                fontSize="1.3rem"
                            />
                        </Button>
                        : <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '14rem'
                        }}>
                            {/* <Typography
                                text={truncate(userWalletAddress, 12)}
                            /> */}
                            {/* <span style={{ width: '35px' }}>
                                <img src="/assets/images/earth.svg" />
                            </span> */}
                            {/* <LogoutButton /> */}
                            <Typography
                                text="Allen.earth.eth"
                                fontSize="1.4rem"
                            />
                            <Avatar
                                alt="Remy Sharp"
                                src="/assets/images/avatarTest.jpg"
                                sx={{
                                    width: 30,
                                    height: 30,
                                    cursor: 'pointer',
                                }}
                            />
                        </div>}
                </Box>
            </Container>

            <Container padding="0.5rem 2rem 0 2rem">
                <Box className={styles.body}>
                    <Box
                        className={styles.lhsBody}
                    >
                        <Box sx={{
                            margin: '2rem 0 0 8rem',
                        }}>
                            <span><img src="./testImage.png" width="275px" /></span>
                            <span style={{ marginLeft: '-85px' }}><img src="./testImage.png" width="275px" /></span>
                            <span style={{ marginLeft: '-85px' }}><img src="./testImage.png" width="275px" /></span>
                        </Box>
                        <Box className={styles.bwText}>
                            <Box>
                                <Typography
                                    text="Top Digital Art Sales"
                                    margin='3rem 0 0 12rem'
                                    fontSize="2.5rem"
                                />
                            </Box>
                            <Box>
                                <Typography
                                    text="show more >"
                                    margin='3rem 0 0 12rem'
                                    fontSize="1.4rem"
                                />
                            </Box>
                        </Box>
                        <Box className={styles.glyphContainerParent} sx={{
                            margin: '2rem 0 0 8rem',
                        }}>
                            <span className={styles.glyphContainer}>
                                <img src="./testImage.png" width="275px" />
                                <Typography
                                    text="Share | View Map | View collection"
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="275px" />
                                <Typography
                                    text="Share | View Map | View collection"
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="275px" />
                                <Typography
                                    text="Share | View Map | View collection"
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="275px" />
                                <Typography
                                    text="Share | View Map | View collection"
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="275px" />
                                <Typography
                                    text="Share | View Map | View collection"
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                        </Box>
                        <Box className={styles.bwText} sx={{ marginTop: '3rem', }}>
                            <Box>
                                <Typography
                                    text="Biggest Swaps"
                                    margin='3rem 0 0 12rem'
                                    fontSize="2.5rem"
                                />
                            </Box>
                            <Box>
                                <Typography
                                    text="show more >"
                                    margin='3rem 0 0 12rem'
                                    fontSize="1.4rem"
                                />
                            </Box>
                        </Box>
                        <Box className={styles.glyphContainerParent} sx={{
                            margin: '2rem 0 0 8rem',
                        }}>
                            <span className={styles.glyphContainer}>
                                <img src="./testImage.png" width="275px" />
                                <Typography
                                    text="Share | View Map | View collection"
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="275px" />
                                <Typography
                                    text="Share | View Map | View collection"
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="275px" />
                                <Typography
                                    text="Share | View Map | View collection"
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="275px" />
                                <Typography
                                    text="Share | View Map | View collection"
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="275px" />
                                <Typography
                                    text="Share | View Map | View collection"
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                        </Box>
                    </Box>
                    <Box className={styles.rhsBody}>
                        {/* <Box className={styles.mapAndWalletBtn}>
                            <Button
                                backgroundColor="#ffffff"
                                color="#000000"
                                border="0.5px solid rgba(46, 52, 81, 0.58)"
                                hoverBackgroundColor="#ffffff"
                                borderRadius="0.6rem"
                                padding="0.4rem 2.2rem"
                            >
                                <Typography
                                    text="Maps"
                                    fontSize="1.3rem"
                                />
                            </Button>
                            <Button
                                backgroundColor="#ffffff"
                                color="#000000"
                                border="0.5px solid rgba(46, 52, 81, 0.58)"
                                hoverBackgroundColor="#ffffff"
                                borderRadius="0.6rem"
                                padding="0.4rem 2rem"
                            >
                                <Typography
                                    text="Wallet"
                                    fontSize="1.3rem"
                                />
                            </Button>
                        </Box> */}
                        <Box className={styles.allIcons}>
                            <Box className={styles.upperIcons}>
                                <Link
                                    to="/maps"
                                    state={{
                                        icon: "home"
                                    }}
                                >
                                    <span
                                        className={styles.iconOuter}
                                        style={{ backgroundColor: location?.state?.icon === 'home' ? '#FE7D06' : '#FFF7EE' }}
                                    >
                                        <img
                                            src='/assets/images/home.svg'
                                            alt=""
                                            className={styles.imageAsIcon}
                                        // onClick={() => onIconsClick('home')}
                                        />
                                    </span>
                                </Link>
                                <Link
                                    to="/discovery"
                                    state={{
                                        icon: "discovery"
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
                                        // onClick={() => onIconsClick('discovery')}
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
        </>
    )
}