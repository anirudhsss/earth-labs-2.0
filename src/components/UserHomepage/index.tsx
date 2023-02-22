import { useCallback, useEffect, useState } from "react";
import { Avatar, Box, CardMedia, Divider, Menu, MenuItem } from "@mui/material"
import { NormalSearchField } from "../shared/TextField"
import { Typography } from '../shared/Typography'
import styles from './styles.module.css';
import { Button } from '../shared/Button'

import LoadingSpin from "react-loading-spin";
import { truncate } from '../utils';
// import data from '../../test.json';
import { Xaxis } from "../shared/Xaxis";
import { Hexgrid } from "../shared/Hexgrid";
import { Link, useLocation } from "react-router-dom";
import { ApiRequest } from "components/utils";
import moment from "moment";
import { Container } from "components/shared/Container";

import Web3Modal from 'web3modal';
import WalletConnectProvider from "@walletconnect/web3-provider";
import MetaMaskOnboarding from "@metamask/onboarding";
import { CLAIM_PROCESS } from 'constant';
import { ethers, providers } from "ethers";
import { ConnectWalletModal } from "components/ConnectWalletModal";
import sample from '../../sample.json';
import { Header } from "components/shared/Header";
import { RhsNav } from "components/shared/RhsNav";
import { ModalDialog } from "components/shared/ModalDialog";
import { Wallet } from "components/Wallet";

export interface UserHomepageProps {

}

const YEARS = [
    { id: 0, value: '2017' },
    { id: 1, value: '2018' },
    { id: 2, value: '2019' },
    { id: 3, value: '2020' },
]
const ETH = [
    { id: 0, value: '0.001 - 0.01 ETH' },
    { id: 1, value: '0.01 - 0.1 ETH' },
    { id: 2, value: '0.1 - 1 ETH' },
    { id: 3, value: '1 - 10 ETH' },
]
const USDC = [
    { id: 0, value: '< $500 USDC' },
    { id: 1, value: '$500 - $1000 USDC' },
    { id: 2, value: '$1000 - $5000 USDC' },
    { id: 3, value: '$5000 - $10,000 USDC' },
    { id: 4, value: '> $10,000 USDC' },
]

export const UserHomepage = ({

}: UserHomepageProps) => {
    const [eth, setEth] = useState(ETH);
    const [usdc, setUsdc] = useState(USDC);
    const [currName, setCurrName] = useState('ETH');
    const location = useLocation();
    const homeLocation = location?.state?.icon === 'home';
    const walletLocation = location?.state?.icon === 'wallet';
    const mapsLocation = location?.state?.icon === 'maps';
    const discoveryLocation = location?.state?.icon === 'discovery';
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorEl1, setAnchorEl1] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const openMenu1 = Boolean(anchorEl1);
    const [data1, setData1] = useState<any>([]);
    const [loading1, setLoading1] = useState(true);
    const [months, setMonths] = useState<any>();
    const [occurences, setOccurences] = useState<any>();
    const [matchedMonths, setMatchedMonths] = useState<any>([]);
    const [clickedElement, setClickedElement] = useState<string>('');
    const [currency, setCurrency] = useState<any>([])
    const [years, setYears] = useState<any>()
    const [monthOrYear, setmonthOrYear] = useState<any>('');
    const [arrOfYears, setArrOfYears] = useState<any>([]);
    const [yearViewEnabled, setYearViewEnabled] = useState<boolean>(true);
    const [backgroundColor, setBackgroundColor] = useState('#FFF7EE');
    const [hoverElementId, setHoverElementId] = useState(null);


    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [forwarderOrigin, setForwarderOrigin] = useState(
        "http://localhost:9010"
    );
    const [walletProvider, setWalletProvider] = useState<
        "METAMASK" | "WALLETCONNECT"
    >("METAMASK");
    const [etherProviders, setEtherProvider] = useState<any>();
    const [claimProcess, setClaimProcess] = useState(
        CLAIM_PROCESS.CONNECT_WALLET
    );
    const [isModalOpen, setModalOpen] = useState(false);
    const [userWalletAddress, setUserWalletAddress] = useState<any>("");
    const [chainId, setChainId] = useState<any>(1);
    const [signatureMessage, setSignatureMessage] = useState<any>("");
    const [sessionToken, setSessionToken] = useState<any>();
    const [isWalletConnected, setWalletConnected] = useState(false);
    const [data, setData] = useState<any>();
    const [openWalletModal, setOpenWalletModal] = useState(false);
    const [chosenCurrency, setChosenCurrency] = useState<any>(eth);

    useEffect(() => {
        const info = async () => {
            const res = await ApiRequest();
            setData(res);
        }
        info();
    }, [])

    useEffect(() => {
        const w: any = window;
        if (w && w.ethereum) {
            let provider = new ethers.providers.Web3Provider(w.ethereum);
            setEtherProvider(provider);
        }
    }, []);

    const onOpenConnectWalletModal = useCallback(() => {
        setOpen(true);
    }, [open]);

    const onClose = () => {
        setOpen(false);
    }

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const setClaimProcessAndModel = (
        isModalOpen: boolean,
        claimProcess: string
    ) => {
        setModalOpen(isModalOpen);
        setClaimProcess(claimProcess);
    };

    const onConnectMetamask = async () => {
        const isMobileDevice = /Mobi/i.test(window.navigator.userAgent);
        if (!isMobileDevice) {
            if (!_checkIfMetaMaskIsInstalled()) {
                _onboardUserForMetaMask();
                return;
            }
        }
        onClose();
        setWalletProvider("METAMASK");
        const accountAddress = await etherProviders.send("eth_requestAccounts", []);
        setClaimProcessAndModel(true, CLAIM_PROCESS.CONNECT_WALLET_LOADING);
        const network = await etherProviders.getNetwork();
        // await _getSignatureMessage(accountAddress[0]);
        setUserWalletAddress(accountAddress[0]);
        setChainId(network.chainId);
    }

    const renderDialogContainers = (claimProcess: string): any => {
        switch (claimProcess) {
            case CLAIM_PROCESS.CONNECT_WALLET_LOADING:
                setLoading(true);
        }
    }

    const _onboardUserForMetaMask = () => {
        const onboarding = new MetaMaskOnboarding({ forwarderOrigin });
        onboarding.startOnboarding();
    };

    const _checkIfMetaMaskIsInstalled = (): boolean => {
        const w: any = window;
        return Boolean(w.ethereum && w.ethereum.isMetaMask);
    };

    const _getSignatureMessage = async (
        accountAddress: string
    ): Promise<void> => {

    }

    const connectWalletConnectWallet = async () => {
        onClose();
        try {
            const provider = new WalletConnectProvider({
                infuraId: process.env.REACT_APP_INFURIA_ID, // Required
                rpc: {
                    137: "https://rpc-mainnet.maticvigil.com/",
                },
            });
            await provider.enable();
            const walletConnectProvider = new providers.Web3Provider(provider);
            const { accounts, chainId } = provider;
            // await _getSignatureMessage(accounts[0]);
            setUserWalletAddress(accounts[0]);
            // Subscribe to accounts change
            provider.on("accountsChanged", (accounts: string[]) => { });

            // Subscribe to chainId change
            provider.on("chainChanged", (chainId: number) => { });

            // Subscribe to session connection
            provider.on("connect", () => { });

            // Subscribe to session disconnection
            provider.on("disconnect", (code: number, reason: string) => {
                logoutWallet();
            });

        } catch (error) {
            console.error(error);
        }
    };

    const logoutWallet = () => {
        setChainId(null);
        setSignatureMessage(null);
        setUserWalletAddress(null);
        setSessionToken(null);
        setClaimProcessAndModel(false, CLAIM_PROCESS.CONNECT_WALLET);
        setWalletConnected(false);
    };

    useEffect(() => {
        const info = async () => {
            const res = await ApiRequest();
            setData1(res?.data[0].hexes);
            //setData1(sample[0].hexes);
            setLoading1(false);
        }
        info();
    }, [])

    const clamp = (a: number, min = 0, max = 1) => Math.min(max, Math.max(min, a)); //0.33
    const invlerp = (x: number, y: number, a: number) => { //0.35
        return clamp((a - x) / (y - x))
    };

    const onCircleClicked = (month: any) => {
        // setYearViewEnabled(false);
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
        console.log('anchorEl1', anchorEl1)
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
        setClickedElement('');
        onCloseYearMenu();
        onDisplayYear();
        setYearViewEnabled(true);
        const selectedItem = YEARS.filter((item) => item.id === id);
        setYears(selectedItem);
    }

    const onValueMenuItemClicked1 = (id: number) => {
        onCloseYearMenu1();
        const selectedItem = chosenCurrency.filter((item: any) => item.id === id);
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
        setYearViewEnabled(false);
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

    const onWalletBtnClickOpen = () => {
        setOpenWalletModal(true);
    }

    const onWalletBtnClickClose = () => {
        setOpenWalletModal(false);
    }

    const onChosingCurrency = (currency: any) => {
        if (currency === 'ETH') {
            setCurrName('ETH');
            setCurrency([]);
            setChosenCurrency(eth);
        } else if (currency === 'USDC') {
            setCurrName('USDC');
            setCurrency([]);
            setChosenCurrency(usdc);
        }
    }

    return (
        <>
            <Header
                homeLocation={homeLocation}
                walletLocation={walletLocation}
                mapsLocation={mapsLocation}
                discoveryLocation={discoveryLocation}
            />

            <Container
                // padding="0.5rem 2rem 0 2rem"
                padding="0 2rem"
                position="relative"
            >

                <Box className={styles.timeMenuBtn1}>
                    <Button
                        backgroundColor="#FFF7EE"
                        hoverBackgroundColor="#FFF7EE"
                        color="black"
                        boxShadow="none"
                        hoverBoxShadow="none"
                        borderRadius={`${openMenu1 ? '2rem 2rem 0 0' : '2rem'}`}
                        padding="5px"
                        width={`${(currency?.length > 0 || openMenu1) ? '15rem' : '8.3rem'}`}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        border="1px solid #000"
                        borderBottom={`${openMenu1 ? '0' : '1px solid #000'}`}
                        onClick={onOpenYearMenu1}
                        height="2.9rem"
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
                        {chosenCurrency.map((item: any) => {
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
                    width: '4%',
                    marginLeft: (currency?.length > 0 || openMenu1) ? '16.5rem' : '10rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    position: 'absolute',
                    top: '20px',
                    zIndex: '101',
                }}>
                    <span
                        style={{ cursor: 'pointer', }}
                        onClick={() => onChosingCurrency('ETH')}
                    >
                        <Typography
                            text="ETH"
                            fontSize="13px"
                            color={`${currName === 'ETH' ? '#FE7D06' : '#000'}`}
                        />
                    </span>
                    <Typography
                        text=" |"
                        fontSize="13px"
                    />
                    <span
                        style={{ cursor: 'pointer', }}
                        onClick={() => onChosingCurrency('USDC')}
                    >
                        <Typography
                            text=" USDC"
                            fontSize="13px"
                            color={`${currName === 'USDC' ? '#FE7D06' : '#000'}`}
                        />
                    </span>
                </Box>

                <Box sx={{
                    position: 'absolute',
                    top: '60px',
                    left: '40px',
                }}>
                    {currency?.length > 0 &&
                        <Typography
                            text={`Currently Viewing: ${currency[0].value}`}
                            fontSize="1.2rem"
                        />
                    }
                </Box>

                <Box className={styles.body}>
                    <Box
                        className={styles.lhsBody1}
                        style={{
                            //marginBottom: loading1 !== false ? '-100px' : '0',
                            position: 'relative',
                        }}
                    >
                        {/* <Box className={styles.lhsBody1}
                            style={{
                                marginBottom: loading1 !== false ? '0px' : '-53px',
                                position: 'relative',
                            }}
                        > */}
                        {/* <span style={{
                                position: 'absolute',
                                top: '-4px',
                                left: '-4.5px',
                            }}>&#8963;</span> */}
                        {/* <Typography
                                text="Currently Viewing: 0.185 - 0.95 ETH"
                                margin="2rem 0 0 2rem"
                                fontSize="1.2rem"
                            /> */}
                        {/* <Box className={styles.lhsBody1Child}>
                                <Hexgrid
                                    matchedMonths={matchedMonths}
                                    arrOfMonths={arrOfMonths}
                                    arrOfYears={arrOfYears}
                                    monthOrYear={monthOrYear}
                                    onDisplayYear={onDisplayYear}
                                    setArrOfYears={setArrOfYears}
                                />
                            </Box> */}
                        {/* </Box> */}
                        {/* <Box className={styles.lhsBody2}>
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
                                hoverElementId={hoverElementId}
                                backgroundColor={backgroundColor}
                            />
                        </Box> */}
                    </Box>
                    <Box className={styles.midBody}>
                        <Hexgrid
                            matchedMonths={matchedMonths}
                            arrOfMonths={arrOfMonths}
                            arrOfYears={arrOfYears}
                            monthOrYear={monthOrYear}
                            onDisplayYear={onDisplayYear}
                            setArrOfYears={setArrOfYears}
                        />
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
                                hoverElementId={hoverElementId}
                                backgroundColor={backgroundColor}
                                loading1={loading1}
                            />
                        </Box>
                    </Box>
                    <RhsNav
                        openMenu={openMenu}
                        onOpenYearMenu={onOpenYearMenu}
                        years={years}
                        anchorEl={anchorEl}
                        onCloseYearMenu={onCloseYearMenu}
                        arrOfYears={arrOfYears}
                        onValueMenuItemClicked={onValueMenuItemClicked}
                        onWalletBtnClickOpen={onWalletBtnClickOpen}
                    />
                </Box>
            </Container>

            <ConnectWalletModal
                open={open}
                onClose={onClose}
                onConnectMetamask={onConnectMetamask}
                connectWalletConnectWallet={connectWalletConnectWallet}
            />

            <ModalDialog
                fullScreen="fullScreen"
                openWalletModal={openWalletModal}
                onWalletBtnClickClose={onWalletBtnClickClose}
            // TransitionComponent={Transition}
            >
                <Wallet
                    openWalletModal={openWalletModal}
                    onWalletBtnClickClose={onWalletBtnClickClose}
                />
            </ModalDialog>
        </>
    )
}