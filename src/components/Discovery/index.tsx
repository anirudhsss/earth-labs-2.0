import { useCallback, useEffect, useState } from "react";
import { Box, CardMedia, Divider, Menu, MenuItem } from "@mui/material"
import styles from './styles.module.css';
import { NormalSearchField } from "components/shared/TextField";
import { Typography } from "components/shared/Typography";
import { Button } from "components/shared/Button";
import { ApiRequest, truncate } from "components/utils";
import { ImageList1 } from "components/shared/ImageList";
import { Link } from "react-router-dom";

export interface DiscoveryProps {
    userWalletAddress?: any;
}

export const Discovery = ({
    userWalletAddress,
}: DiscoveryProps) => {
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
            <Box className={styles.header}>
                <Box className={styles.lhsHeader}>
                    <img
                        src='./assets/images/atlasLogo.png'
                        alt=""
                        width="100"
                        height="40"
                        style={{
                            backgroundColor: 'transparent'
                        }}
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
                        </div>}
                </Box>
            </Box>

            <Box className={styles.body}>
                <Box
                    className={styles.lhsBody}
                >
                    <Box sx={{
                        margin: '2rem 0 0 8rem',
                    }}>
                        <span><img src="./testImage.png" /></span>
                        <span style={{ marginLeft: '-70px' }}><img src="./testImage.png" /></span>
                        <span style={{ marginLeft: '-70px' }}><img src="./testImage.png" /></span>
                    </Box>
                    <Box className={styles.bwText}>
                        <Box>
                            <Typography
                                text="Top Digital Art Sales"
                                margin='3rem 0 0 12rem'
                                fontSize="1.5rem"
                            />
                        </Box>
                        <Box>
                            <Typography
                                text="show more >"
                                margin='3rem 0 0 12rem'
                                fontSize="1.5rem"
                            />
                        </Box>
                    </Box>
                    <Box className={styles.glyphContainerParent} sx={{
                        margin: '2rem 0 0 8rem',
                    }}>
                        <span className={styles.glyphContainer}>
                            <img src="./testImage.png" />
                            <Typography
                                text="Share  |  Go to Address"
                                fontSize="1rem"
                            />
                        </span>
                        <span className={styles.glyphContainer1}>
                            <img src="./testImage.png" />
                            <Typography
                                text="Share  |  Go to Address"
                                fontSize="1rem"
                            />
                        </span>
                        <span className={styles.glyphContainer1}>
                            <img src="./testImage.png" />
                            <Typography
                                text="Share  |  Go to Address"
                                fontSize="1rem"
                            />
                        </span>
                        <span className={styles.glyphContainer1}>
                            <img src="./testImage.png" />
                            <Typography
                                text="Share  |  Go to Address"
                                fontSize="1rem"
                            />
                        </span>
                        <span className={styles.glyphContainer1}>
                            <img src="./testImage.png" />
                            <Typography
                                text="Share  |  Go to Address"
                                fontSize="1rem"
                            />
                        </span>
                    </Box>
                    <Box className={styles.bwText} sx={{ marginTop: '3rem', }}>
                        <Box>
                            <Typography
                                text="Biggest Swaps"
                                margin='3rem 0 0 12rem'
                                fontSize="1.5rem"
                            />
                        </Box>
                        <Box>
                            <Typography
                                text="show more >"
                                margin='3rem 0 0 12rem'
                                fontSize="1.5rem"
                            />
                        </Box>
                    </Box>
                    <Box className={styles.glyphContainerParent} sx={{
                        margin: '2rem 0 0 8rem',
                    }}>
                        <span className={styles.glyphContainer}>
                            <img src="./testImage.png" />
                            <Typography
                                text="Share  |  Go to Address"
                                fontSize="1rem"
                            />
                        </span>
                        <span className={styles.glyphContainer1}>
                            <img src="./testImage.png" />
                            <Typography
                                text="Share  |  Go to Address"
                                fontSize="1rem"
                            />
                        </span>
                        <span className={styles.glyphContainer1}>
                            <img src="./testImage.png" />
                            <Typography
                                text="Share  |  Go to Address"
                                fontSize="1rem"
                            />
                        </span>
                        <span className={styles.glyphContainer1}>
                            <img src="./testImage.png" />
                            <Typography
                                text="Share  |  Go to Address"
                                fontSize="1rem"
                            />
                        </span>
                        <span className={styles.glyphContainer1}>
                            <img src="./testImage.png" />
                            <Typography
                                text="Share  |  Go to Address"
                                fontSize="1rem"
                            />
                        </span>
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
                            <Link to="/map">
                                <a className={styles.iconOuter}>
                                    <img src='/assets/images/home.svg' alt="" className={styles.imageAsIcon} />
                                </a>
                            </Link>
                            <Link to="/discovery">
                                <a className={styles.iconOuter}>
                                    <img src='/assets/images/discovery.svg' alt="" className={styles.imageAsIcon} />
                                </a>
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
        </>
    )
}