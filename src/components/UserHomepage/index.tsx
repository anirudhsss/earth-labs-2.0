import { useCallback, useEffect, useState } from "react";
import { Avatar, Box, CardMedia, Divider, Menu, MenuItem } from "@mui/material"
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
import { Link, useLocation } from "react-router-dom";
import { ApiRequest } from "components/utils";
import moment from "moment";
import { Container } from "components/shared/Container";

export interface UserHomepageProps {
    children?: any;
    onOpenConnectWalletModal: () => void;
    userWalletAddress?: any;
    loading?: any;
    logoutWallet?: () => void;
    data?: any;
}

const YEARS = [
    { id: 0, value: '2017' },
    { id: 1, value: '2018' },
    { id: 2, value: '2019' },
    { id: 3, value: '2020' },
]
const CURR = [
    { id: 0, value: '0.001 - 0.01 ETH' },
    { id: 1, value: '0.01 - 0.1 ETH' },
    { id: 2, value: '0.1 - 1 ETH' },
    { id: 3, value: '1 - 10 ETH' },
]

export const UserHomepage = ({
    children,
    onOpenConnectWalletModal,
    userWalletAddress,
    loading,
    logoutWallet,
    data,
}: UserHomepageProps) => {
    const location = useLocation();
    // const { icon } = location?.state;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorEl1, setAnchorEl1] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const openMenu1 = Boolean(anchorEl1);
    const [data1, setData1] = useState<any>([]);
    const [loading1, setLoading1] = useState(true);
    const [months, setMonths] = useState<any>();
    const [occurences, setOccurences] = useState<any>();
    const [matchedMonths, setMatchedMonths] = useState<any>([]);
    const [clickedElement, setClickedElement] = useState<any>();
    const [currency, setCurrency] = useState<any>()
    const [years, setYears] = useState<any>()
    const [monthOrYear, setmonthOrYear] = useState<any>('');
    const [arrOfYears, setArrOfYears] = useState<any>([]);
    const [yearViewEnabled, setYearViewEnabled] = useState<boolean>(true);
    const [backgroundColor, setBackgroundColor] = useState('#FFF7EE');
    const [hoverElementId, setHoverElementId] = useState(null);

    useEffect(() => {
        const info = async () => {
            const res = await ApiRequest();
            setData1(res?.data[0].hexes);
            setLoading1(false);
        }
        info();
    }, [])

    useEffect(() => {

    }, [location?.state])

    const clamp = (a: number, min = 0, max = 1) => Math.min(max, Math.max(min, a)); //0.33
    const invlerp = (x: number, y: number, a: number) => { //0.35
        return clamp((a - x) / (y - x))
    };

    // const onSortingData = (data1: any[] | undefined) => {
    //     let arr: any[] = [];
    //     let arr2: any[] = [];
    //     let arrValOfYear: any[] = [];
    //     let arrKeyOfYear: any[] = [];
    //     if (data1) {
    //         const arrOfMonths = data1.map((item) => {
    //             return Number(moment(item.timestamp).format("MM"));
    //         });
    //         const arrOfYears = data1.map((item) => {
    //             return Number(moment(item.timestamp).format("YYYY"));
    //         });
    //         const freqOfMonths = arrOfMonths.reduce((acc: any, item) => {
    //             acc[item] = acc[item] ? acc[item] + 1 : 1;
    //             return acc;
    //         }, {});
    //         const freqOfYears = arrOfYears.reduce((acc: any, item) => {
    //             acc[item] = acc[item] ? acc[item] + 1 : 1;
    //             return acc;
    //         }, {});
    //         arrValOfYear = Object.values(freqOfYears)
    //         arrKeyOfYear = Object.keys(freqOfYears)
    //         arr = Object.values(freqOfMonths);
    //         arr2 = Object.keys(freqOfMonths);
    //     }
    //     return [arr, arr2, arrValOfYear, arrKeyOfYear];
    // }

    // const myFunc = () => {
    //     const test = onSortingData(data1);
    //     const arr = test[0]; //original month value count
    //     const arr2 = test[1]; //original month key count
    //     const arrValOfYear = test[2];
    //     const arrKeyOfYear = test[3];
    //     const min = Math.min(...arr);
    //     const max = Math.max(...arr);
    //     let arrYearPointsOfAxis: any[] = [];
    //     if (arrValOfYear?.length === 1) {
    //         let val1 = ((35 + 10) / 2);
    //         arrYearPointsOfAxis = [...arrYearPointsOfAxis, val1];
    //     }
    //     let arr1: any[] = [];
    //     arr.forEach((item: number) => {
    //         let val1 = (((35 - 10) * invlerp(min, max, item)) + 10);
    //         arr1 = [...arr1, val1] //processed count
    //     })
    //     const arr3: { month: any; dimension: any; noOfGlyphs: any; }[] = [];
    //     arr.forEach((_, index) => {
    //         arr3.push({
    //             month: arr2[index],//original month key count
    //             dimension: arr1[index],//processed count
    //             noOfGlyphs: arr[index],//original month value count
    //         })
    //     })
    //     const arr3OfYear: any[] = [];
    //     arrValOfYear?.forEach((_, index) => {
    //         arr3OfYear.push({
    //             month: arrKeyOfYear[index], //its year, not month
    //             dimension: arrYearPointsOfAxis[index],
    //             noOfGlyphs: arrValOfYear[index],
    //         })
    //     })
    //     return [arr3, arr3OfYear];
    // };

    const onCircleClicked = (month: any) => {
        setYearViewEnabled(false);
        setClickedElement(month);
        const arrIndexesOfClickedMonths = data1.filter((item: { timestamp: moment.MomentInput; }) => {
            let monthFromApi = Number(moment(item.timestamp).format("MM"));
            return monthFromApi === Number(month);
        });
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

    const onValueMenuItemClicked = (id: number) => {
        onCloseYearMenu();
        onDisplayYear();
        setYearViewEnabled(true);
        const selectedItem = YEARS.filter((item) => item.id === id);
        setYears(selectedItem);
    }

    const onValueMenuItemClicked1 = (id: number) => {
        onCloseYearMenu1();
        const selectedItem = CURR.filter((item) => item.id === id);
        setCurrency(selectedItem);
    }

    const onDisplayYear = () => {
        setmonthOrYear('year');
        if (data1?.length > 0) {
            let arrOfDuration, freqOfDuration, duration: string | any[], noOfTxns: any[], arrYearPointsOfAxis: any[] = [];
            arrOfDuration = data1.map((item: any) => {
                return Number(moment(item.timestamp).format("YYYY"));
            });
            freqOfDuration = arrOfDuration.reduce((acc: any, item: any) => {
                acc[item] = acc[item] ? acc[item] + 1 : 1;
                return acc;
            }, {});
            duration = Object.keys(freqOfDuration);
            noOfTxns = Object.values(freqOfDuration);
            if (duration?.length === 1) {
                // let val1 = ((35 + 10) / 2);
                let val1 = 35;
                arrYearPointsOfAxis = [...arrYearPointsOfAxis, val1];
            }

            const arrOfYears: { month: any; dimension: any; noOfGlyphs: any; }[] = [];
            arrYearPointsOfAxis?.forEach((_, index) => {
                arrOfYears.push({
                    month: duration[index],
                    dimension: arrYearPointsOfAxis[index],
                    noOfGlyphs: noOfTxns[index],
                });
            })
            return arrOfYears;
        }
    }

    const [arrOfMonths, setArrOfMonths] = useState<any>([]);

    const onDisplayMonth = (year: number) => {
        setmonthOrYear('month');
        if (data1?.length > 0) {
            let arrOfDuration, freqOfDuration, duration: string | any[], noOfTxns: any[], arrMonthPointsOfAxis: any[] = [];
            arrOfDuration = data1.map((item: any) => {
                // return Number(moment(item.timestamp).format("YYYY")) == year ? Number(moment(item.timestamp).format("MM")) : undefined;
                if (Number(moment(item.timestamp).format("YYYY")) == year) {
                    return Number(moment(item.timestamp).format("MM"));
                } else {
                    return undefined;
                }
            });
            freqOfDuration = arrOfDuration.reduce((acc: any, item: any) => {
                acc[item] = acc[item] ? acc[item] + 1 : 1;
                return acc;
            }, {});
            duration = Object.keys(freqOfDuration);
            noOfTxns = Object.values(freqOfDuration);
            const min = Math.min(...noOfTxns);
            const max = Math.max(...noOfTxns);
            let arr1: any[] = [];
            noOfTxns.forEach((item: number) => {
                let val1 = (((35 - 10) * invlerp(min, max, item)) + 10);
                arrMonthPointsOfAxis = [...arrMonthPointsOfAxis, val1] //processed count
            })

            const arrOfMonths: { month: any; dimension: any; noOfGlyphs: any; }[] = [];
            arrMonthPointsOfAxis.forEach((_, index) => {
                arrOfMonths.push({
                    month: duration[index],
                    dimension: arrMonthPointsOfAxis[index],
                    noOfGlyphs: noOfTxns[index],
                })
            })
            setArrOfMonths(arrOfMonths);
        }
    }

    const onCircleHoverStarts = (elementId: any) => {
        setHoverElementId(elementId);
    }

    const onCircleHoverEnds = (elementId: any) => {
        setHoverElementId(null);
    }

    return (
        <>
            {/* <Box className={styles.header}> */}
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
                            onClick={onOpenConnectWalletModal}
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
            {/* </Box> */}

            <Container padding="0.5rem 2rem 0 2rem">
                <Box className={styles.timeMenuBtn1}>
                    <Button
                        backgroundColor="#FFF7EE"
                        hoverBackgroundColor="#FFF7EE"
                        color="black"
                        boxShadow="none"
                        hoverBoxShadow="none"
                        borderRadius={`${openMenu1 ? '2rem 2rem 0 0' : '2rem'}`}
                        padding="5px 20px"
                        width="150px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        border="1px solid #000"
                        borderBottom={`${openMenu1 ? '0' : '1px solid #000'}`}
                        onClick={onOpenYearMenu1}
                    >
                        {currency?.length > 0 ?
                            <Typography
                                text={`${currency[0].value}`}
                                fontSize="13px"
                                margin="0 5px 0 0"
                            />
                            : <Typography
                                text="value"
                                fontSize="13px"
                                color={`${openMenu1 ? '#FE7D06' : '#000'}`}
                                margin="0 5px 0 0"
                            />}
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
                        {CURR.map((item) => {
                            return (
                                <>
                                    <MenuItem
                                        key={item.id}
                                        onClick={() => onValueMenuItemClicked1(item.id)}
                                        sx={{
                                            fontSize: '13px',
                                            borderBottom: '1px solid black',
                                            '&:last-child': {
                                                borderBottom: '0px',
                                            },
                                        }}
                                    >{item.value}</MenuItem>
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
                                    arrOfMonths={arrOfMonths}
                                    arrOfYears={arrOfYears}
                                    monthOrYear={monthOrYear}
                                    onDisplayYear={onDisplayYear}
                                    setArrOfYears={setArrOfYears}
                                />
                            </Box>
                        </Box>
                        <Box className={styles.lhsBody2}>
                            <Xaxis
                                data={data}
                                // data2={myFunc()}
                                monthOrYear={monthOrYear}
                                onDisplayYear={onDisplayYear}
                                onDisplayMonth={onDisplayMonth}
                                onCircleClicked={onCircleClicked}
                                clickedElement={clickedElement}
                                data1={data1}
                                arrOfMonths={arrOfMonths}
                                arrOfYears={arrOfYears}
                                setArrOfYears={setArrOfYears}
                                matchedMonths={matchedMonths}
                                setMatchedMonths={setMatchedMonths}
                                yearViewEnabled={yearViewEnabled}
                                setYearViewEnabled={setYearViewEnabled}
                                onCircleHoverStarts={onCircleHoverStarts}
                                onCircleHoverEnds={onCircleHoverEnds}
                            />
                        </Box>
                    </Box>
                    <Box className={styles.rhsBody}>
                        <Box className={styles.mapAndWalletBtn}>
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
                        </Box>
                        <Box className={styles.allIcons}>
                            <Box className={styles.upperIcons}>
                                <Link
                                    to="/map"
                                    state={{
                                        icon: 'home',
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
                                    {years?.length > 0 ?
                                        <Typography
                                            text={`${years[0].value}`}
                                            fontSize="13px"
                                            color={`${openMenu ? '#FE7D06' : '#000'}`}
                                        />
                                        : <Typography
                                            text="time"
                                            fontSize="13px"
                                            color={`${openMenu ? '#FE7D06' : '#000'}`}
                                        />}
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
                                    {arrOfYears?.map((item: any) => {
                                        return (
                                            <MenuItem
                                                key={item.month}
                                                onClick={() => onValueMenuItemClicked(item.month)}
                                                sx={{
                                                    fontSize: '13px',
                                                    borderBottom: '1px solid black',
                                                    '&:last-child': {
                                                        borderBottom: '0px',
                                                    },
                                                }}
                                            >{item.month}</MenuItem>
                                        )
                                    })}
                                </Menu>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                {children}
            </Container>
        </>
    )
}