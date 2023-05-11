import { useCallback, useEffect, useState } from "react";
import { Avatar, Box, CardMedia, Divider, Menu, MenuItem } from "@mui/material";
import { NormalSearchField } from "../shared/TextField";
import { Typography } from "../shared/Typography";
import styles from "./styles.module.css";
import { Button } from "../shared/Button";

import LoadingSpin from "react-loading-spin";
import { Xaxis } from "../shared/Xaxis";
import { Hexgrid } from "../shared/Hexgrid";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import { Container } from "components/shared/Container";

import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import MetaMaskOnboarding from "@metamask/onboarding";
import { CLAIM_PROCESS } from "constant";
import { ethers, providers } from "ethers";
import { ConnectWalletModal } from "components/ConnectWalletModal";
import sample from "../../sample.json";
import { Header } from "components/shared/Header";
import { RhsNav } from "components/shared/RhsNav";
// import { ModalDialog } from "components/shared/ModalDialog";
import { Wallet } from "components/Wallet";
import axios from "axios";
import { Yaxis } from "components/shared/Yaxis";
import { AnyAaaaRecord } from "dns";
import {
    AxiosFetch,
    BackdropDuringApiLoading,
    CalcRange,
} from "components/utils";
import { HelpPage } from "components/HelpPage";
import PostHeaderLayer from "components/PostHeaderLayer";
import useEthToUsdcConversion from "../../hooks/useEthToUsdcConversion";
import { useAccount } from "wagmi";
import { CustomizedDialogs } from "components/shared/ModalDialog";

export interface UserHomepageProps {

}

export const UserHomepage = ({ }: UserHomepageProps) => {
    const [currName, setCurrName] = useState("ETH");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorEl1, setAnchorEl1] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const openMenu1 = Boolean(anchorEl1);
    const [data1, setData1] = useState<any>();
    const [loading1, setLoading1] = useState(true);
    const [months, setMonths] = useState<any>();
    const [occurences, setOccurences] = useState<any>();
    const [matchedMonths, setMatchedMonths] = useState<any>([]);
    const [clickedElement, setClickedElement] = useState<any>();
    const [currency, setCurrency] = useState<any>([]);
    const [years, setYears] = useState<any>([]);
    // const [monthOrYear, setmonthOrYear] = useState<any>('year');
    const [arrOfYears, setArrOfYears] = useState<any>([]);
    const [yearViewEnabled, setYearViewEnabled] = useState<boolean>(true);
    const [backgroundColor, setBackgroundColor] = useState("#FFF7EE");
    const [hoverElementId, setHoverElementId] = useState(null);
    const { ethToUsdc } = useEthToUsdcConversion();

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
    const [test, setData] = useState<any>();
    const [openWalletModal, setOpenWalletModal] = useState(false);
    const [chosenCurrency, setChosenCurrency] = useState<any>([]);
    const [coordinates, setCoordinates] = useState<any>({
        // x: -53,
        // y: -31,
        x: 0,
        y: 0,
    });
    // const [ethToUsdc, setEthToUsdc] = useState<any>();
    // const [ethToUsdcYvsTPercent, setEthToUsdcYvsTPercent] = useState<any>();
    const [yAxisItems, setYAxisItems] = useState<any>([]);
    const [chosenData, setChosenData] = useState([]);
    const [range, setRange] = useState(false);
    const [newChosenData, setNewChosenData] = useState<any>(false);
    const [lowerRange, setLowerRange] = useState<any>();
    const [higherRange, setHigherRange] = useState<any>();
    const [yAxisValue, setYAxisValue] = useState({
        yAxisValueMin: 0,
        yAxisValueMax: 0,
    });
    const [xAxisValue, setXAxisValue] = useState({
        xAxisDateMin: 0,
        xAxisDateMax: 0,
    });

    const [abcd, setAbcd] = useState([]);
    const [abcd1, setAbcd1] = useState([]);

    const [yAxisItemClicked, setYAxisItemClicked] = useState<any>();
    const [yAxisItemHovered, setYAxisItemHovered] = useState<any>();
    // const [difference, setDifference] = useState<string>('');
    const [arrOfMonths, setArrOfMonths] = useState<any>([]);
    const [arrOfDays, setArrOfDays] = useState<any>([]);
    const [someYear, setSomeYear] = useState<any>();
    const [selectedItem1, setSelectedItem1] = useState<any>();
    const [testData, setTestData] = useState([]);
    const [leastDimension, setLeastDimension] = useState<number>(0);
    const [monthInLetters, setmonthInLetters] = useState<any>();
    const { address } = useAccount();
    const [walletAddress, setWalletAddress] = useState<string>();
    const [helpIconClicked, setHelpIconClicked] = useState<Boolean>(false);
    const { data, data2, apiLoading, apiError } = AxiosFetch(walletAddress);

    const [showDays, setShowDays] = useState<boolean | undefined>(false);
    const [furtherPropagation, setfurtherPropagation] = useState<
        boolean | undefined
    >(true);
    const [dayClicked, setdayClicked] = useState<boolean | undefined>(false);
    const [clickedDay, setClickedDay] = useState<any>();
    const [abcd2, setAbcd2] = useState<any>([]);
    const [abcd3, setAbcd3] = useState<any>([]);
    const [clickedMonth, setClickedMonth] = useState<any>();

    const onHelpSectionClose = () => {
        setHelpIconClicked(false);
    }

    const onHelpSectionOpen = () => {
        setHelpIconClicked(true);
    }

    useEffect(() => {
        if (address) {
            setWalletAddress(address);
            return;
        }
        setWalletAddress("");
    }, [address]);

    const onFindingXAxisMinAndMax = useCallback(() => {
        let arr: number[] = [];
        matchedMonths?.map((item: any) => {
            arr.push(Number(moment(item.timestamp).format("DD")));
        });
        if (arr.length > 1) {
            let max = arr[0];
            let min = arr[1];
            let n = arr.length;
            for (let i = 0; i < n; i++) {
                if (arr[i] > max) {
                    max = arr[i];
                } else if (arr[i] < min) {
                    min = arr[i];
                }
                setXAxisValue({ xAxisDateMin: min, xAxisDateMax: max });
            }
        } else if (arr.length === 1) {
            let max = arr[0];
            let min = arr[0];
            let n = arr.length;
            for (let i = 0; i < n; i++) {
                if (arr[i] > max) {
                    max = arr[i];
                } else if (arr[i] < min) {
                    min = arr[i];
                }
                setXAxisValue({ xAxisDateMin: min, xAxisDateMax: max });
            }
        }
    }, [matchedMonths]);

    useEffect(() => {
        onFindingXAxisMinAndMax();
    }, [onFindingXAxisMinAndMax]);

    // useEffect(() => {
    //     const w: any = window;
    //     if (w && w.ethereum) {
    //         let provider = new ethers.providers.Web3Provider(w.ethereum);
    //         setEtherProvider(provider);
    //     }
    // }, []);

    const onDisplayMonth = useCallback(
        (year: number) => {
            // console.log('onDisplayMonth', year);
            setYAxisValue({ yAxisValueMin: 0, yAxisValueMax: 0 });
            setCurrency([]);
            setSomeYear(year);
            setYearViewEnabled(false);
            if (data1?.length > 0) {
                const arrIndexesOfClickedYears = data1?.filter(
                    (item: { timestamp: moment.MomentInput }) => {
                        let monthFromApi = Number(moment(item.timestamp).format("YYYY"));
                        return Number(monthFromApi) === Number(year);
                    }
                );
                setAbcd(arrIndexesOfClickedYears);
            }
        },
        [data1]
    );

    useEffect(() => {
        onDisplayMonth(arrOfYears[arrOfYears?.length - 1]?.month);
    }, [arrOfYears, onDisplayMonth]);

    const clamp = (a: number, min = 0, max = 1) => {
        // console.log('test', a, min, max);
        return Math.min(max, Math.max(min, a)); //0.33
    };
    const invlerp = useCallback((min: number, max: number, item: number) => {
        return clamp((item - min) / (max - min)); //0.35
    }, []);

    const showDaysEnabled = () => {
        setShowDays(true);
    };

    const showDaysDsiabled = () => {
        setShowDays(false);
    };

    const furtherPropagationEnabled = () => {
        setfurtherPropagation(true);
    };

    const furtherPropagationDisabled = () => {
        setfurtherPropagation(false);
    };

    const allEqual = (noOfTxns: any[], param: any) =>
        noOfTxns.every((item: any) => {
            return item === param;
        });

    const anotherFunc3 = useCallback(
        (abcd2: any, month: any) => {
            // console.log('anotherFunc3', abcd2, month);
            if (abcd2?.length > 0) {
                // console.log('month', month);
                let arrOfDuration,
                    freqOfDuration,
                    duration: string | any[],
                    noOfTxns: any[],
                    arrDaysPointsOfAxis: any[] = [];
                // console.log('abcd2', abcd2)
                arrOfDuration = abcd2?.map((item: any) => {
                    // console.log('Number(moment(item.timestamp).format("MM")', Number(moment(item.timestamp).format("MM")));
                    // console.log('Number(month)', Number(month));
                    if (Number(moment(item.timestamp).format("MM")) === Number(month)) {
                        // console.log('Number(moment(item.timestamp).format("DD")', Number(moment(item.timestamp).format("DD")));
                        return Number(moment.utc(item.timestamp).format("DD"));
                    }
                });
                freqOfDuration = arrOfDuration.reduce((acc: any, item: any) => {
                    acc[item] = acc[item] ? acc[item] + 1 : 1;
                    return acc;
                }, {});
                duration = Object.keys(freqOfDuration);
                noOfTxns = Object.values(freqOfDuration);
                let min = Math.min(...noOfTxns);
                let max = Math.max(...noOfTxns);
                // console.log('noOfTxns', noOfTxns)
                noOfTxns.forEach((item: number) => {
                    let val1;
                    if (allEqual(noOfTxns, min) || duration?.length === 1) {
                        val1 = 35;
                        // const arr = whichDuration?.map((item: any) => item.dimension);
                        // setLeastDimension(Math.min(...arr));
                        const half = val1 / 2;
                        setLeastDimension(half);
                    } else {
                        val1 = (35 - 10) * invlerp(min, max, item) + 10;
                    }
                    arrDaysPointsOfAxis = [...arrDaysPointsOfAxis, val1]; //processed count
                });
                const arrOfDays: { month: any; dimension: any; noOfGlyphs: any }[] = [];
                arrDaysPointsOfAxis.forEach((_, index) => {
                    arrOfDays.push({
                        month: duration[index],
                        dimension: arrDaysPointsOfAxis[index],
                        noOfGlyphs: noOfTxns[index],
                    });
                });
                // console.log('arrOfDays', arrOfDays);
                setmonthInLetters(
                    moment()
                        .month(month - 1)
                        .format("MMM")
                );
                setArrOfDays(arrOfDays);
            }
            setfurtherPropagation(false);
        },
        [invlerp]
    );

    const onCircleClicked = useCallback(
        (month: any) => {
            // console.log('onCircleClicked', month);
            setYAxisValue({ yAxisValueMin: 0, yAxisValueMax: 0 });
            setCurrency([]);
            setYAxisItems([]);
            setYAxisItemClicked(null);
            setYAxisItemHovered(null);
            // onClickedElementEnabled(month);
            const arrIndexesOfClickedMonths = abcd?.filter(
                (item: { timestamp: moment.MomentInput }) => {
                    let monthFromApi = Number(moment(item.timestamp).format("MM"));
                    return monthFromApi === Number(month);
                }
            );
            setMatchedMonths(arrIndexesOfClickedMonths);
            // console.log('arrIndexesOfClickedMonths', arrIndexesOfClickedMonths);
            setAbcd1(arrIndexesOfClickedMonths);
        },
        [abcd]
    );

    useEffect(() => {
        // console.log('useEffect ran')
        if (years[0]?.month === arrOfYears[arrOfYears?.length - 1]?.month) {
            const a = arrOfMonths[arrOfMonths.length - 1]?.month;
            // console.log('a1', a);
            onCircleClicked(a);
            onClickedElementEnabled(a);
            setClickedMonth(a);
        } else {
            const a = arrOfMonths[0]?.month;
            // console.log('a2', a);
            onCircleClicked(a);
            onClickedElementEnabled(a);
            setClickedMonth(a);
        }
    }, [arrOfMonths, arrOfYears, onCircleClicked, years]);

    const onShowDaysInfo = useCallback((abcd: any, month: any) => {
        // console.log('onShowDaysInfo')
        setYAxisValue({ yAxisValueMin: 0, yAxisValueMax: 0 });
        setCurrency([]);
        setYAxisItems([]);
        setYAxisItemClicked(null);
        setYAxisItemHovered(null);

        const arrIndexesOfClickedDays = abcd?.filter((item: any) => {
            let monthsFromApi = Number(moment(item.timestamp).format("MM"));
            // console.log('monthsFromApi', monthsFromApi)
            // console.log('month', month)
            return monthsFromApi === Number(month);
        });
        // console.log('arrIndexesOfClickedDays', arrIndexesOfClickedDays)
        setAbcd2(arrIndexesOfClickedDays);
        // setMatchedMonths(arrIndexesOfClickedDays);
        setfurtherPropagation(false);
    }, []);

    const onClickOfADay = useCallback((abcd2: any[], day: number) => {
        // console.log('onClickOfADay');
        setYAxisValue({ yAxisValueMin: 0, yAxisValueMax: 0 });
        setCurrency([]);
        setYAxisItems([]);
        setYAxisItemClicked(null);
        setYAxisItemHovered(null);
        if (abcd2?.length > 0) {
            let filteredDays: any[];
            filteredDays = abcd2?.filter((item) => {
                // console.log('test', Number(moment.utc(item.timestamp).format("DD")))
                // console.log('day', Number(day));
                // console.log('Number(moment(item.timestamp).format("DD)) === day', Number(moment(item.timestamp).format('DD')) === Number(day));
                return Number(moment.utc(item.timestamp).format("DD")) === Number(day);
            });
            // console.log('filteredDays', filteredDays);
            setAbcd3(filteredDays);
            setMatchedMonths(filteredDays);
        }
    }, []);

    useEffect(() => {
        if (showDays) {
            const a = arrOfDays[0]?.month;
            onClickedElementEnabled(a);
            onClickOfADay(abcd2, arrOfDays[0]?.month);
        }
    }, [abcd2, arrOfDays, onClickOfADay, showDays]);

    useEffect(() => {
        if (showDays) {
            onShowDaysInfo(abcd, clickedMonth);
        }
    }, [showDays, abcd, clickedMonth, onCircleClicked, onShowDaysInfo]);

    useEffect(() => {
        if (showDays) {
            // console.log('inside useEffect2', abcd2, clickedMonth);
            anotherFunc3(abcd2, clickedMonth);
        }
    }, [showDays, abcd2, clickedMonth, anotherFunc3]);

    const onCaptureDayWhenDayClickedEnabled = (day: number) => {
        setClickedDay(day);
    };

    useEffect(() => {
        if (dayClicked) {
            onClickOfADay(abcd2, clickedDay);
        }
    }, [abcd2, clickedDay, dayClicked, onClickOfADay]);

    const anotherFunc1 = useCallback(() => {
        if (data1?.length > 0) {
            let arrOfDuration,
                freqOfDuration,
                duration: string | any[],
                noOfTxns: any[],
                arrYearPointsOfAxis: any[] = [];
            arrOfDuration = data1?.map((item: any) => {
                return Number(moment(item.timestamp).format("YYYY"));
            });
            freqOfDuration = arrOfDuration.reduce((acc: any, item: any) => {
                acc[item] = acc[item] ? acc[item] + 1 : 1;
                return acc;
            }, {});

            duration = Object.keys(freqOfDuration);
            noOfTxns = Object.values(freqOfDuration);
            if (duration?.length === 1) {
                let val1 = 35;
                arrYearPointsOfAxis = [...arrYearPointsOfAxis, val1];
            } else {
                arrOfDuration = data1?.map((item: any) =>
                    Number(moment(item.timestamp).format("YYYY"))
                );
                freqOfDuration = arrOfDuration.reduce((acc: any, item: any) => {
                    acc[item] = acc[item] ? acc[item] + 1 : 1;
                    return acc;
                }, {});
                duration = Object.keys(freqOfDuration);
                noOfTxns = Object.values(freqOfDuration);
                const min = Math.min(...noOfTxns);
                const max = Math.max(...noOfTxns);
                noOfTxns.forEach((item: number) => {
                    let val1 = (35 - 10) * invlerp(min, max, item) + 10;
                    arrYearPointsOfAxis = [...arrYearPointsOfAxis, val1]; //processed count
                });
            }
            const arrOfYears: { month: any; dimension: any; noOfGlyphs: any }[] = [];
            arrYearPointsOfAxis?.forEach((_, index) => {
                arrOfYears.push({
                    month: duration[index],
                    dimension: arrYearPointsOfAxis[index],
                    noOfGlyphs: noOfTxns[index],
                });
            });
            setArrOfYears(arrOfYears);
        }
    }, [data1, invlerp]);

    useEffect(() => {
        // if (monthOrYear === 'year') {
        anotherFunc1();
        // onDisplayAllTimeTxnInDescOrder();
        // }
    }, [anotherFunc1]);

    useEffect(() => {
        setYears(arrOfYears.slice(-1));
    }, [arrOfYears]);

    const anotherFunc2 = useCallback(
        (someYear1: any) => {
            if (abcd?.length > 0) {
                // console.log('abcd', abcd);
                let arrOfDuration,
                    freqOfDuration,
                    duration: string | any[],
                    noOfTxns: any[],
                    arrMonthPointsOfAxis: any[] = [];
                arrOfDuration = abcd?.map((item: any) => {
                    if (
                        Number(moment(item.timestamp).format("YYYY")) == Number(someYear1)
                    ) {
                        return Number(moment(item.timestamp).format("MM"));
                    }
                });
                // console.log('arrOfDuration', arrOfDuration);
                freqOfDuration = arrOfDuration.reduce((acc: any, item: any) => {
                    acc[item] = acc[item] ? acc[item] + 1 : 1;
                    return acc;
                }, {});
                duration = Object.keys(freqOfDuration);
                noOfTxns = Object.values(freqOfDuration);
                const min = Math.min(...noOfTxns);
                const max = Math.max(...noOfTxns);
                noOfTxns.forEach((item: number) => {
                    let val1 = (35 - 10) * invlerp(min, max, item) + 10;
                    arrMonthPointsOfAxis = [...arrMonthPointsOfAxis, val1]; //processed count
                });
                const arrOfMonths: { month: any; dimension: any; noOfGlyphs: any }[] =
                    [];
                arrMonthPointsOfAxis.forEach((_, index) => {
                    arrOfMonths.push({
                        month: duration[index],
                        dimension: arrMonthPointsOfAxis[index],
                        noOfGlyphs: noOfTxns[index],
                    });
                });
                setArrOfMonths(arrOfMonths);
                //setValueMenuItemClicked(false);
            }
        },
        [invlerp, abcd]
    );

    useEffect(() => {
        // console.log('years', years);
        const a = years[0]?.month;
        anotherFunc2(a);
    }, [anotherFunc2, years]);

    // useEffect(() => {
    //     onEthToUsdcConversion();
    // }, [difference])

    useEffect(() => {
        const a = data2?.filter((item: any) => item.isWallet === 0);
        const sortedTxnInDescOrder = (a || [])?.sort((a: any, b: any) => {
            return +new Date(b.timestamp) - +new Date(a.timestamp);
        });
        setData1(sortedTxnInDescOrder);
    }, [data2]);

    useEffect(() => {
        let arr: any[] = [];
        // arr = data2;
        if (furtherPropagation) {
            arr = abcd1;
        } else {
            arr = abcd3
        }
        // console.log('arr', arr);
        const tArr = arr?.map((item: any) => item.targetValue1);
        const sortedTArr = tArr?.sort((a: any, b: any) => a - b);
        const requiredArr = CalcRange(sortedTArr);
        // console.log('requiredArr', requiredArr);
        setChosenCurrency(requiredArr);
    }, [abcd1, abcd3, furtherPropagation]);

    const onHelpIconClicked = () => {
        setHelpIconClicked(!helpIconClicked);
    };

    const onOpenConnectWalletModal = useCallback(() => {
        setOpen(true);
    }, []);

    const onClose = () => {
        setOpen(false);
    };

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
    };

    const renderDialogContainers = (claimProcess: string): any => {
        switch (claimProcess) {
            case CLAIM_PROCESS.CONNECT_WALLET_LOADING:
                setLoading(true);
        }
    };

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
    ): Promise<void> => { };

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

    const onOpenYearMenu = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };
    const onOpenYearMenu1 = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl1(e.currentTarget);
    };
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
                    backgroundColor: "#000000",
                    cursor: "pointer",
                    width: "25px",
                    marginLeft: "10px",
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
    // const [valueMenuItemClicked, setValueMenuItemClicked] = useState(false);
    // useEffect(() => {
    //     setChosenData(matchedMonths);
    // }, [valueMenuItemClicked]);

    const onValueMenuItemClicked = useCallback(
        (id: number) => {
            showDaysDsiabled();
            furtherPropagationEnabled();
            setAbcd2([]);
            setShowDays(false);
            setClickedElement(null);
            setHoverElementId(null);
            setCurrency([]);
            setYAxisItems([]);
            setYAxisItemClicked(null);
            setYAxisItemHovered(null);
            onCloseYearMenu();
            setMatchedMonths([]);
            onDisplayMonth(id);
            const selectedItem = arrOfYears.filter((item: any) => {
                return Number(item.month) === Number(id);
            });
            setYears(selectedItem);
        },
        [arrOfYears, onDisplayMonth]
    );

    const onValueMenuItemClicked1 = (id: number) => {
        // console.log('onValueMenuItemClicked1')
        // setShowDays(false);
        setYAxisItems([]);
        setYAxisItemClicked(null);
        setYAxisItemHovered(null);
        onCloseYearMenu1();
        setYAxisValue({ yAxisValueMin: 0, yAxisValueMax: 0 });
        let res = "";
        const selectedItem = chosenCurrency.filter((item: any, index: number) => {
            if (index === id) {
                if (currName === "USDC") {
                    res =
                        (item[0] * (ethToUsdc ? ethToUsdc : 1))?.toFixed(2) +
                        " - " +
                        (item[item?.length - 1] * (ethToUsdc ? ethToUsdc : 1))?.toFixed(2) +
                        " " +
                        currName;
                } else {
                    res =
                        item[0]?.toFixed(2) +
                        " - " +
                        item[item?.length - 1]?.toFixed(2) +
                        " " +
                        currName;
                }
            }
        });
        testFunc(res);
        setCurrency(res);
    };

    const testFunc = (selectedItem: any) => {
        // console.log('selectedItem', selectedItem)
        let range = false;
        setRange(true);
        range = true;
        let lowerRange = 0,
            higherRange = 0;
        if (range) {
            const b = selectedItem.split(" ");

            // if (b[b.length - 1] === 'ETH') {
            lowerRange = Number(b[0]);
            higherRange = Number(b[2]);
            // } else if (b[b.length - 1] === 'USDC') {
            // if (b[0] === '<') {
            //     lowerRange = 50;
            //     const newB = b[1].substr(1);
            //     higherRange = Number(newB);
            // } else if (b[0] === '>') {
            //     const newB = b[1].substr(1);
            //     lowerRange = Number(newB);
            //     higherRange = 20000;
            // } else {
            //     lowerRange = Number(b[0].substr(1));
            //     higherRange = Number(b[2].substr(1));
            // }
            //     lowerRange = Number(b[0]) / (ethToUsdc ? ethToUsdc : 1);
            //     higherRange = Number(b[2]) / (ethToUsdc ? ethToUsdc : 1);
            // }
        }

        if (lowerRange > 0 && higherRange > 0) {
            let c = higherRange - lowerRange;
            let d = c / 4;
            let d1 = Number((lowerRange + d).toFixed(3));
            let d2 = Number((d1 + d).toFixed(3));
            let d3 = Number((d2 + d).toFixed(3));
            const lengthsArr: any[] = [];
            setLowerRange(lowerRange);
            setHigherRange(higherRange);
            lengthsArr.push(testFunc2(lowerRange, d1));
            lengthsArr.push(testFunc2(d1, d2));
            lengthsArr?.push(testFunc2(d2, d3));
            lengthsArr.push(testFunc2(d3, higherRange));
            let arr3: any[] = [];
            if (furtherPropagation) {
                arr3 = abcd1;
            } else {
                arr3 = abcd2
            }
            const arr = arr3?.filter((item: any) => {
                // console.log('item', item);
                let a = 1;
                if (currName === "ETH") {
                    a = 1;
                } else if (currName === "USDC") {
                    if (ethToUsdc) {
                        a = ethToUsdc;
                    } else {
                        a = 1;
                    }
                }
                // console.log('a', item.targetValue1.toFixed(2), lowerRange, higherRange);
                return (
                    a * (item.targetValue1.toFixed(2)) >= lowerRange &&
                    a * (item.targetValue1.toFixed(2)) <= higherRange
                );
            });
            // console.log('arr', arr)
            // let processedArrays: any[] = [];
            let processedArrays1: any[] = [];
            setMatchedMonths(arr);
            // console.log('lengthsArr', lengthsArr)
            processedArrays1 = lengthsArr?.map((item: any) => {
                // console.log('item', item)
                return processedArrays1.concat(item[0]);
            });
            // processedArrays = processedArrays1.flat();
            // console.log('processedArrays', processedArrays)
            const processedInput = lengthsArr?.map((item: any) => item[0].length);
            // console.log('processedInput', processedInput)
            const min = Math.min(...processedInput);
            const max = Math.max(...processedInput);
            // console.log(min, max);
            const rangeArr = lengthsArr?.map(
                (item: any) => item[1] + " - " + item[2]
            );
            // const rangeArr = lengthsArr?.map((item: any) => item[1])
            // console.log('rangeArr', rangeArr)
            let arrOfInterest: any = [];
            processedInput.forEach((item: any) => {
                // console.log('item', item)
                let val1 = Math.round((35 - 10) * invlerp(min, max, item) + 10);
                // console.log('val1', val1)
                arrOfInterest = [...arrOfInterest, val1];
            });
            let yAxisItems: any = [];
            // console.log('arrOfInterest', arrOfInterest)
            arrOfInterest.forEach((_: any, index: number) => {
                yAxisItems.push({
                    id: index,
                    range: rangeArr[index],
                    dimension: arrOfInterest[index],
                    noOfGlyphs: processedInput[index],
                    lowerRange: lowerRange,
                    higherRange: higherRange,
                });
            });
            // console.log('yAxisItems', yAxisItems);
            setRange(false);
            setYAxisItems(yAxisItems);
        }
    };

    const testFunc2 = (lowerRange: any, higherRange: any) => {
        let data2: any = [];
        // data2 = abcd;
        data2 = abcd1;
        const arr = data2?.filter((item: any) => {
            let a = 1;
            if (currName === "ETH") {
                a = 1;
            } else if (currName === "USDC") {
                if (ethToUsdc) {
                    a = ethToUsdc;
                } else {
                    a = 1;
                }
            }
            // console.log('a', a, item.targetValue1, a * item.targetValue1, lowerRange, higherRange);
            return (
                a * item.targetValue1 >= lowerRange &&
                a * item.targetValue1 <= higherRange
            );
        });
        return [arr, lowerRange, higherRange];
    };

    const onYAxisItemClicked = (id: any, lowerRange: any, higherRange: any) => {
        // let lowerRange = 0, higherRange = 0;
        // const b = range.split(' ');
        // lowerRange = Number(b[0]);
        // higherRange = Number(b[2]);
        setYAxisValue({ yAxisValueMin: lowerRange, yAxisValueMax: higherRange });
        let data2: any = [];
        let idd = Number(id);
        setYAxisItemClicked(idd);
        // if (monthOrYear === 'year') {
        // data2 = abcd;
        // } else if (monthOrYear === 'month') {
        data2 = abcd1;
        // }
        const arr = data2?.filter((item: any) => {
            let a = 1;
            if (currName === "ETH") {
                a = 1;
            } else if (currName === "USDC") {
                if (ethToUsdc) {
                    a = ethToUsdc;
                } else {
                    a = 1;
                }
            }
            // console.log('a', a, item.targetValue1, a * item.targetValue1, lowerRange, higherRange);
            return (
                a * item.targetValue1 >= lowerRange &&
                a * item.targetValue1 <= higherRange
            );
        });
        // console.log('arr', arr);
        setMatchedMonths(arr);
    };

    const onYAxisItemHoverOn = (id: any) => {
        setYAxisItemHovered(id);
    };

    const onYAxisItemHoverOff = (id: any) => {
        setYAxisItemHovered(null);
    };

    const onCircleHoverStarts = (elementId: any) => {
        setHoverElementId(elementId);
    };

    const onCircleHoverEnds = (elementId: any) => {
        setHoverElementId(null);
    };

    const onWalletBtnClickOpen = () => {
        setOpenWalletModal(true);
    };

    const onWalletBtnClickClose = () => {
        setOpenWalletModal(false);
    };

    const onChosingCurrency = (currency: any) => {
        setRange(false);
        if (currency === "ETH") {
            setCurrName("ETH");
            setCurrency([]);
            // setChosenCurrency(eth);
            setYAxisItems([]);
            setYAxisItemClicked(null);
            setYAxisItemHovered(null);
        } else if (currency === "USDC") {
            setCurrName("USDC");
            setCurrency([]);
            // setChosenCurrency(usdc);
            setYAxisItems([]);
            setYAxisItemClicked(null);
            setYAxisItemHovered(null);
        }
    };

    const onMoveHexes = (param: any) => {
        if (param === "left") {
            setCoordinates({ x: coordinates.x - 10, y: coordinates.y });
        } else if (param === "up") {
            setCoordinates({ x: coordinates.x, y: coordinates.y - 10 });
        } else if (param === "down") {
            setCoordinates({ x: coordinates.x, y: coordinates.y + 10 });
        } else if (param === "right") {
            setCoordinates({ x: coordinates.x + 10, y: coordinates.y });
        }
    };

    const onClickedElementEnabled = (month: any) => {
        setClickedElement(month);
    };

    const onYearButtonClicked = useCallback(
        (year: any) => {
            // setShowDays(false);
            // setfurtherPropagation(true);
            onValueMenuItemClicked(year);
        },
        [onValueMenuItemClicked]
    );

    const onMonthButtonClicked = useCallback(() => {
        setShowDays(true);
        setfurtherPropagation(false);
    }, []);
    // console.log('data2', data2);
    // console.log('clickedElement', clickedElement)
    // console.log('clickedMonth', clickedMonth)
    // console.log('abcd1', abcd1);
    // console.log('abcd2', abcd2);
    // console.log('furtherPropagation', furtherPropagation);
    // console.log('showDays', showDays);
    // console.log('monthInLetters', monthInLetters);
    // console.log('dayClicked', dayClicked);
    // console.log('clickedDay', clickedDay);
    // console.log('matchedMonths', matchedMonths);
    // console.log('leastDimension', leastDimension);
    // console.log('arrOfDays', arrOfDays);
    // console.log('month', month);
    // console.log('chosenCurrency', chosenCurrency);
    // console.log('currency', currency);
    // console.log('yAxisItems', yAxisItems)
    // console.log('yAxisValue', yAxisValue)
    return (
        <>
            <Box
                sx={{
                    backgroundColor: "#FFFDFB",
                    height: "100vh",
                    overflowY: "hidden",
                    position: "relative",
                }}
            >
                <Box sx={{ height: "7.6%" }}>
                    <Header
                        openWalletModal={openWalletModal}
                        onWalletBtnClickOpen={onWalletBtnClickOpen}
                        onWalletBtnClickClose={onWalletBtnClickClose}
                    />
                </Box>

                <Container height="88.5%" padding="0 3rem 0 2rem" position="relative">
                    <PostHeaderLayer
                        matchedMonths={matchedMonths}
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
                    />

                    <Box className={styles.body}>
                        <Box>
                            <Yaxis
                                currName={currName}
                                yAxisItems={yAxisItems}
                                onYAxisItemClicked={onYAxisItemClicked}
                                yAxisItemClicked={yAxisItemClicked}
                                onYAxisItemHoverOn={onYAxisItemHoverOn}
                                onYAxisItemHoverOff={onYAxisItemHoverOff}
                                yAxisItemHovered={yAxisItemHovered}
                            />
                        </Box>
                        <Box className={styles.midBody}>
                            {/* {helpIconClicked && (
                                <HelpPage />
                            )} */}
                            {!helpIconClicked && <Hexgrid
                                matchedMonths={matchedMonths}
                                arrOfMonths={arrOfMonths}
                                arrOfYears={arrOfYears}
                                setArrOfYears={setArrOfYears}
                                coordinates={coordinates}
                                loading1={loading1}
                                chosenData={chosenData}
                                testData={testData}
                                yAxisValue={yAxisValue}
                                xAxisValue={xAxisValue}
                                data1={data1}
                                data={data}
                            />}
                        </Box>
                        <RhsNav
                            clickedElement={clickedElement}
                            onMonthButtonClicked={onMonthButtonClicked}
                            onYearButtonClicked={onYearButtonClicked}
                            showDays={showDays}
                            monthInLetters={monthInLetters}
                            openMenu={openMenu}
                            onOpenYearMenu={onOpenYearMenu}
                            years={years}
                            anchorEl={anchorEl}
                            onCloseYearMenu={onCloseYearMenu}
                            arrOfYears={arrOfYears}
                            onValueMenuItemClicked={onValueMenuItemClicked}
                            onWalletBtnClickOpen={onWalletBtnClickOpen}
                            onMoveHexes={onMoveHexes}
                            coordinates={coordinates}
                            loading1={loading1}
                            yAxisValue={yAxisValue}
                            xAxisValue={xAxisValue}
                            helpIconClicked={helpIconClicked}
                            onHelpIconClicked={onHelpIconClicked}
                        />
                    </Box>

                    <Box
                        sx={{
                            width: "100%",
                        }}
                    >
                        <Xaxis
                            monthInLetters={monthInLetters}
                            leastDimension={leastDimension}
                            onCaptureDayWhenDayClickedEnabled={
                                onCaptureDayWhenDayClickedEnabled
                            }
                            showDaysEnabled={showDaysEnabled}
                            furtherPropagationDisabled={furtherPropagationDisabled}
                            setdayClicked={setdayClicked}
                            onClickedElementEnabled={onClickedElementEnabled}
                            furtherPropagation={furtherPropagation}
                            setClickedElement={setClickedElement}
                            setClickedMonth={setClickedMonth}
                            setShowDays={setShowDays}
                            arrOfDays={arrOfDays}
                            onShowDaysInfo={onShowDaysInfo}
                            showDays={showDays}
                            years={years}
                            anchorEl={anchorEl}
                            onCloseYearMenu={onCloseYearMenu}
                            openMenu={openMenu}
                            onValueMenuItemClicked={onValueMenuItemClicked}
                            onOpenYearMenu={onOpenYearMenu}
                            // monthOrYear={monthOrYear}
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
                            range={range}
                            setChosenData={setChosenData}
                            chosenData={chosenData}
                        />
                    </Box>
                </Container>

                <ConnectWalletModal
                    open={open}
                    onClose={onClose}
                    onConnectMetamask={onConnectMetamask}
                    connectWalletConnectWallet={connectWalletConnectWallet}
                />
            </Box>
            {/* <ModalDialog
                fullScreen="fullScreen"
                openWalletModal={openWalletModal}
                onWalletBtnClickClose={onWalletBtnClickClose}
            >
            <Wallet
                openWalletModal={openWalletModal}
                onWalletBtnClickClose={onWalletBtnClickClose}
                coordinates={coordinates}
                yAxisValue={yAxisValue}
                xAxisValue={xAxisValue}
            monthOrYear={monthOrYear}
            />
            </ModalDialog> */}
            <CustomizedDialogs
                open={helpIconClicked}
                onClose={onHelpSectionClose}
                helpPageComponent={<HelpPage />}
                borderRadius='30px'
            />

            <BackdropDuringApiLoading show={apiLoading} />
        </>
    );
};
