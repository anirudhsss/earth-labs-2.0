import { useCallback, useEffect, useState } from "react";
import { Box, CardMedia, Divider, Menu, MenuItem } from "@mui/material"
import { NormalSearchField } from "../shared/TextField"
import { Typography } from '../shared/Typography'
import styles from './styles.module.css';
import { Button } from '../shared/Button'
import Web3Modal from 'web3modal';
import LoadingSpin from "react-loading-spin";
import { truncate } from '../utils';
// import data from '../../test.json';
import { Xaxis } from "../shared/Xaxis";
import { Hexgrid } from "../shared/Hexgrid";
import { Link } from "react-router-dom";
import { ApiRequest } from "components/utils";
import moment from "moment";

export interface UserHomepageProps {
    children?: any;
    onOpenConnectWalletModal: () => void;
    userWalletAddress?: any;
    loading?: any;
    logoutWallet?: () => void;
    data?: any;
}

const years = ["2020", "2021", "2022", "2023"];
const CURR = ["0.001 - 0.01 ETH", "0.01 - 0.1 ETH", "0.1 - 1 ETH", "1 - 10 ETH"];

export const UserHomepage = ({
    children,
    onOpenConnectWalletModal,
    userWalletAddress,
    loading,
    logoutWallet,
    data,
}: UserHomepageProps) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorEl1, setAnchorEl1] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const openMenu1 = Boolean(anchorEl1);
    const [data1, setData1] = useState<any>();
    const [loading1, setLoading1] = useState(true);
    const [months, setMonths] = useState<any>();
    const [occurences, setOccurences] = useState<any>();
    const [matchedMonths, setMatchedMonths] = useState<any>([]);

    useEffect(() => {
        const info = async () => {
            const res = await ApiRequest();
            setData1(res?.data[0].hexes);
            setLoading1(false);
        }
        info();
    }, [])

    const clamp = (a: number, min = 0, max = 1) => Math.min(max, Math.max(min, a));
    const invlerp = (x: number, y: number, a: number) => {
        return clamp((a - x) / (y - x))
    };

    const onSortingData = (data1: any[] | undefined) => {
        let arr: any[] = [];
        let arr2: any[] = [];
        if (data1) {
            const arrOfDuration = data1.map((item) => {
                return Number(moment(item.timestamp).format("MM"));
            });
            console.log('arrOfDuration', arrOfDuration)
            const freqOfDuration = arrOfDuration.reduce((acc: any, item) => {
                acc[item] = acc[item] ? acc[item] + 1 : 1;
                return acc;
            }, {});
            arr = Object.values(freqOfDuration);
            arr2 = Object.keys(freqOfDuration);
        }
        return [arr, arr2];
    }

    const myFunc = () => {
        const test = onSortingData(data1);
        const arr = test[0];
        const arr2 = test[1];
        const min = Math.min(...arr);
        const max = Math.max(...arr);
        let arr1: any[] = [];
        arr.forEach((item: number) => {
            let val1 = (((35 - 10) * invlerp(min, max, item)) + 10);
            arr1 = [...arr1, val1]
        })
        const arr3: { month: any; dimension: any; noOfGlyphs: any; }[] = [];
        arr.forEach((_, index) => {
            arr3.push({
                month: arr2[index],
                dimension: arr1[index],
                noOfGlyphs: arr[index],
            })
        })
        return arr3;
    };

    const onCircleClicked = (month: any) => {
        const arrIndexesOfClickedMonths = data1.filter((item: { timestamp: moment.MomentInput; }) => {
            let monthFromApi = Number(moment(item.timestamp).format("MM"));
            return monthFromApi === Number(month);
        });
        console.log('arrIndexesOfClickedMonths', arrIndexesOfClickedMonths)
        setMatchedMonths(arrIndexesOfClickedMonths);
    }

    const onOpenYearMenu = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    }
    const onOpenYearMenu1 = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl1(e.currentTarget);
    }
    const onCloseYearMenu = () => {
        setAnchorEl(null);
    };
    const onCloseYearMenu1 = () => {
        setAnchorEl1(null);
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
                    {/* <Typography
                        text="Atlas"
                        fontSize="2rem"
                        fontWeight="500"
                    /> */}
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

            <Box className={styles.timeMenuBtn1}>
                <Button
                    backgroundColor="#FFF7EE"
                    hoverBackgroundColor="#FFF7EE"
                    color="black"
                    boxShadow="none"
                    hoverBoxShadow="none"
                    borderRadius={`${openMenu1 ? '2rem 2rem 0 0' : '2rem'}`}
                    padding="5px 50px"
                    width="150px"
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                    border="1px solid #000"
                    borderBottom={`${openMenu1 ? '0' : '1px solid #000'}`}
                    onClick={onOpenYearMenu1}
                >
                    <Typography
                        text="value"
                        fontSize="13px"
                        color={`${openMenu1 ? '#FE7D06' : '#000'}`}
                    />
                    <img
                        src={`${openMenu1 ? '/assets/images/orangeTriangle.svg' : '/assets/images/blackTriangle.svg'}`}
                        alt=""
                        className={styles.blackTriangle}
                        style={{
                            marginTop: '2px'
                        }}
                    />
                </Button>
                <Menu
                    anchorEl={anchorEl1}
                    open={openMenu1}
                    onClose={onCloseYearMenu1}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    PaperProps={{
                        elevation: 0,
                        style: {
                            width: '150px',
                            borderRadius: '0 0 20px 20px',
                            backgroundColor: '#FFF7EE',
                            border: '1px solid #000',
                        },

                    }}
                >
                    {CURR.map((year: any) => {
                        return (
                            <>
                                <MenuItem
                                    onClick={onCloseYearMenu1}
                                    sx={{
                                        fontSize: '13px',
                                        borderBottom: '1px solid black',
                                        '&:last-child': {
                                            borderBottom: '0px',
                                        },
                                    }}
                                >{year}</MenuItem>
                            </>
                        )
                    })}
                </Menu>
            </Box>

            <Box style={{
                width: '5%',
                marginLeft: '18rem',
                marginTop: '-2rem',
                display: 'flex',
                justifyContent: 'space-between',

            }}>
                <Typography
                    text="ETH"
                    fontSize="13px"
                    color={`${openMenu1 && '#FE7D06'}`}
                />
                <Typography
                    text=" |"
                    fontSize="13px"
                />
                <Typography
                    text=" USDC"
                    fontSize="13px"
                />
            </Box>

            <Box className={styles.body}>
                <Box
                    className={styles.lhsBody}
                >
                    <Box className={styles.lhsBody1}
                        style={{ marginBottom: loading1 !== false ? '0px' : '-53px' }}
                    >
                        <Typography
                            text="Currently Viewing: 0.185 - 0.95 ETH"
                            margin="2rem 0 0 2rem"
                            fontSize="1.2rem"
                        />
                        <Box className={styles.lhsBody1Child}>
                            <Hexgrid
                                matchedMonths={matchedMonths}
                            />
                        </Box>
                    </Box>
                    <Box className={styles.lhsBody2}>
                        <Xaxis data={data} data2={myFunc()} onCircleClicked={onCircleClicked} />
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
                                PaperProps={{
                                    elevation: 0,
                                    style: {
                                        width: '85px',
                                        borderRadius: '20px 20px 0 0',
                                        backgroundColor: '#FFF7EE',
                                        border: '1px solid #000',
                                    },

                                }}
                            >
                                {years.map((year: any) => {
                                    return (
                                        <>
                                            <MenuItem
                                                onClick={onCloseYearMenu}
                                                sx={{
                                                    fontSize: '13px',
                                                    borderBottom: '1px solid black',
                                                    '&:last-child': {
                                                        borderBottom: '0px',
                                                    },
                                                }}
                                            >{year}</MenuItem>
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