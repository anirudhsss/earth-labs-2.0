import { useCallback, useEffect, useState } from "react";
import { Avatar, Box, CardMedia, Divider, Menu, MenuItem } from "@mui/material"
import styles from './styles.module.css';
import { NormalSearchField } from "components/shared/TextField";
import { Typography } from "components/shared/Typography";
import { Button } from "components/shared/Button";
import { ApiRequest, AxiosFetch, truncate } from "components/utils";
import { ImageList1 } from "components/shared/ImageList";
import { Link, useLocation } from "react-router-dom";
import { Container } from "components/shared/Container";
import { Header } from "components/shared/Header";
import { RhsNav } from "components/shared/RhsNav";
import { HelpPage } from "components/HelpPage";
import PostHeaderLayer from "components/PostHeaderLayer";

export interface DiscoveryProps {
    openMenu1?: any;
    currency?: any;
    onOpenYearMenu1?: any;
    anchorEl1?: any;
    onCloseYearMenu1?: any;
    chosenCurrency?: any;
    onValueMenuItemClicked1?: any;
    onChosingCurrency?: any;
    currName?: any;
    ethToUsdc?: any;
    difference?: any;
    ethToUsdcYvsTPercent?: any;
}

export const Discovery = ({
    openMenu1,
    currency,
    onOpenYearMenu1,
    anchorEl1,
    onCloseYearMenu1,
    chosenCurrency,
    onValueMenuItemClicked1,
    onChosingCurrency,
    currName,
    ethToUsdc,
    difference,
    ethToUsdcYvsTPercent,
}: DiscoveryProps) => {

    // useEffect(() => {
    //     const info = async () => {
    //         const res = await ApiRequest();
    //         setData(res);
    //     }
    //     info();
    // }, [])

    const location = useLocation();
    const homeLocation = location?.state?.icon === 'home';
    const walletLocation = location?.state?.icon === 'wallet';
    const mapsLocation = location?.state?.icon === 'maps';
    const discoveryLocation = location?.state?.icon === 'discovery';
    // const { icon } = location?.state;
    // const [data, setData] = useState<any>();
    const [helpIconClicked, setHelpIconClicked] = useState<Boolean>(false);

    const { data, data2, apiLoading, apiError } = AxiosFetch();

    const onHelpIconClicked = () => {
        setHelpIconClicked(!helpIconClicked);
    }

    return (
        <Box sx={{
            backgroundColor: '#FFFDFB',
            height: '100vh',
        }}>
            <Header />

            <Container
                padding="0 3rem 0 2rem"
                height="92%"
            >
                <PostHeaderLayer
                    apiLoading={apiLoading}
                    openMenu1={openMenu1}
                    currency={currency}
                    onOpenYearMenu1={onOpenYearMenu1}
                    anchorEl1={anchorEl1}
                    onCloseYearMenu1={onCloseYearMenu1}
                    chosenCurrency={chosenCurrency}
                    onValueMenuItemClicked1={onValueMenuItemClicked1}
                    onChosingCurrency={onChosingCurrency}
                    currName={currName}
                    ethToUsdc={ethToUsdc}
                    difference={difference}
                    ethToUsdcYvsTPercent={ethToUsdcYvsTPercent}
                />

                <Box className={styles.body}>
                    {/* {helpIconClicked ?
                        <HelpPage /> : */}
                    <Box
                        className={styles.lhsBody}
                    >
                        <Box sx={{
                            margin: '2rem 0 0 23rem',
                        }}>
                            <span><img src="./testImage.png" width="250px" /></span>
                            <span style={{ marginLeft: '-80px' }}><img src="./testImage.png" width="250px" /></span>
                            <span style={{ marginLeft: '-80px' }}><img src="./testImage.png" width="250px" /></span>
                        </Box>
                        <Box className={styles.bwText} sx={{ marginLeft: '16rem' }}>
                            <Box>
                                <Typography
                                    text="Top Digital Art Sales"
                                    margin='3rem 0 0 12rem'
                                    fontSize="2.5rem"
                                    fontWeight="bold"
                                />
                            </Box>
                            <Box>
                                <Typography
                                    text="show more >"
                                    margin='3rem 0 0 12rem'
                                    fontSize="1.1rem"
                                />
                            </Box>
                        </Box>
                        <Box className={styles.glyphContainerParent} sx={{
                            margin: '2rem 0 0 23rem',
                        }}>
                            <span className={styles.glyphContainer}>
                                <img src="./testImage.png" width="250px" />
                                <Typography
                                    text="Share | View Map | View collection"
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="250px" />
                                <Typography
                                    text="Share | View Map | View collection"
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="250px" />
                                <Typography
                                    text="Share | View Map | View collection"
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="250px" />
                                <Typography
                                    text="Share | View Map | View collection"
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                            <span className={styles.glyphContainer1}>
                                <img src="./testImage.png" width="250px" />
                                <Typography
                                    text="Share | View Map | View collection"
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    width="10rem"
                                />
                            </span>
                        </Box>
                        {/* <Box className={styles.bwText} sx={{ marginTop: '3rem', marginLeft: '16rem' }}>
                                <Box>
                                    <Typography
                                        text="Biggest Swaps"
                                        margin='3rem 0 0 12rem'
                                        fontSize="2.5rem"
                                        fontWeight="bold"
                                    />
                                </Box>
                                <Box>
                                    <Typography
                                        text="show more >"
                                        margin='3rem 0 0 12rem'
                                        fontSize="1.1rem"
                                    />
                                </Box>
                            </Box>
                            <Box className={styles.glyphContainerParent} sx={{
                                margin: '2rem 0 0 23rem',
                            }}>
                                <span className={styles.glyphContainer}>
                                    <img src="./testImage.png" width="250px" />
                                    <Typography
                                        text="Share | View Map | View collection"
                                        fontSize="1.1rem"
                                        fontWeight="bold"
                                        width="10rem"
                                    />
                                </span>
                                <span className={styles.glyphContainer1}>
                                    <img src="./testImage.png" width="250px" />
                                    <Typography
                                        text="Share | View Map | View collection"
                                        fontSize="1.1rem"
                                        fontWeight="bold"
                                        width="10rem"
                                    />
                                </span>
                                <span className={styles.glyphContainer1}>
                                    <img src="./testImage.png" width="250px" />
                                    <Typography
                                        text="Share | View Map | View collection"
                                        fontSize="1.1rem"
                                        fontWeight="bold"
                                        width="10rem"
                                    />
                                </span>
                                <span className={styles.glyphContainer1}>
                                    <img src="./testImage.png" width="250px" />
                                    <Typography
                                        text="Share | View Map | View collection"
                                        fontSize="1.1rem"
                                        fontWeight="bold"
                                        width="10rem"
                                    />
                                </span>
                                <span className={styles.glyphContainer1}>
                                    <img src="./testImage.png" width="250px" />
                                    <Typography
                                        text="Share | View Map | View collection"
                                        fontSize="1.1rem"
                                        fontWeight="bold"
                                        width="10rem"
                                    />
                                </span>
                            </Box> */}
                    </Box>
                    {/* } */}
                    <RhsNav
                    // helpIconClicked={helpIconClicked}
                    // onHelpIconClicked={onHelpIconClicked}
                    />
                </Box>
            </Container>
        </Box>
    )
}