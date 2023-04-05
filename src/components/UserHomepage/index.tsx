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
import axios from "axios";
import { Yaxis } from "components/shared/Yaxis";
import { AnyAaaaRecord } from "dns";
import { AxiosFetch, BackdropDuringApiLoading } from '../utils';

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
    { id: 3, value: '$5000 - $10000 USDC' },
    { id: 4, value: '> $10000 USDC' },
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
    const [test1, setData1] = useState<any>();
    const [loading1, setLoading1] = useState(true);
    const [months, setMonths] = useState<any>();
    const [occurences, setOccurences] = useState<any>();
    const [matchedMonths, setMatchedMonths] = useState<any>([]);
    const [clickedElement, setClickedElement] = useState<any>();
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
    const [test, setData] = useState<any>();
    const [openWalletModal, setOpenWalletModal] = useState(false);
    const [chosenCurrency, setChosenCurrency] = useState<any>(eth);
    const [coordinates, setCoordinates] = useState<any>({
        // x: -53,
        // y: -31,
        x: 0,
        y: 0,
    })
    const [ethToUsdc, setEthToUsdc] = useState<any>();
    const [ethToUsdcYvsTPercent, setEthToUsdcYvsTPercent] = useState<any>();
    const [yAxisItems, setYAxisItems] = useState<any>([]);
    const [chosenData, setChosenData] = useState([]);
    const [range, setRange] = useState(false);
    const [newChosenData, setNewChosenData] = useState<any>(false);
    const [lowerRange, setLowerRange] = useState<any>();
    const [higherRange, setHigherRange] = useState<any>();
    const [yAxisValue, setYAxisValue] = useState({
        yAxisValueMin: 0, yAxisValueMax: 0,
    });
    const [xAxisValue, setXAxisValue] = useState({
        xAxisDateMin: 0, xAxisDateMax: 0,
    });

    const [abcd, setAbcd] = useState([]);
    const [abcd1, setAbcd1] = useState([]);

    const [yAxisItemClicked, setYAxisItemClicked] = useState<any>();
    const [yAxisItemHovered, setYAxisItemHovered] = useState<any>();
    const [difference, setDifference] = useState<string>('');
    const { data, data1, apiLoading, apiError } = AxiosFetch();

    // useEffect(() => {
    //     setData(data?.hexes);
    // }, [data]);

    useEffect(() => {
        onFindingXAxisMinAndMax();
    }, [matchedMonths]);

    // useEffect(() => {
    //     const w: any = window;
    //     if (w && w.ethereum) {
    //         let provider = new ethers.providers.Web3Provider(w.ethereum);
    //         setEtherProvider(provider);
    //     }
    // }, []);

    useEffect(() => {
        onDisplayYear();
    }, [])

    useEffect(() => {
        if (monthOrYear === '') {
            anotherFunc1();
            onDisplayAllTimeTxnInDescOrder();
        }
    }, [data1, matchedMonths]);

    useEffect(() => {
        if (monthOrYear === 'year') {
            anotherFunc2(someYear);
        }
    }, [matchedMonths]);

    useEffect(() => {
        onEthToUsdcConversion();
    }, [difference])

    const onDisplayAllTimeTxnInDescOrder = () => {
        const sortedTxnInDescOrder = (data1 || [])?.sort((a: any, b: any) => {
            return +new Date(b.timestamp) - +new Date(a.timestamp);
        });
        // console.log('sortedTxnInDescOrder', sortedTxnInDescOrder)
        setMatchedMonths(sortedTxnInDescOrder);
    }

    const onFindingXAxisMinAndMax = () => {
        let arr: number[] = [];
        matchedMonths?.map((item: any) => {
            arr.push(Number(moment(item.timestamp).format("DD")));
        });
        if (arr.length > 0) {
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
        }
    }

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

    const clamp = (a: number, min = 0, max = 1) => Math.min(max, Math.max(min, a)); //0.33
    const invlerp = (x: number, y: number, a: number) => { //0.35
        return clamp((a - x) / (y - x))
    };

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
    // const [valueMenuItemClicked, setValueMenuItemClicked] = useState(false);
    // useEffect(() => {
    //     setChosenData(matchedMonths);
    // }, [valueMenuItemClicked]);

    const onValueMenuItemClicked = (id: number) => {
        setClickedElement(null);
        setCurrency([]);
        setYAxisItems([]);
        setYAxisItemClicked(null);
        setYAxisItemHovered(null);
        onCloseYearMenu();
        setMatchedMonths([]);
        setmonthOrYear('year');
        onDisplayMonth(id);
        //setValueMenuItemClicked(true);
        // setYearViewEnabled(true);
        const selectedItem = YEARS.filter((item) => item.id === id);
        setYears(selectedItem);
    }
    const [selectedItem1, setSelectedItem1] = useState<any>();
    const onValueMenuItemClicked1 = (id: number) => {
        setYAxisItems([]);
        setYAxisItemClicked(null);
        setYAxisItemHovered(null);
        onCloseYearMenu1();
        const selectedItem = chosenCurrency.filter((item: any) => item.id === id);
        setSelectedItem1(selectedItem[0].value);
        testFunc(selectedItem[0].value)
        setCurrency(selectedItem);
    }
    const [testData, setTestData] = useState([]);

    const testFunc = (selectedItem1: any) => {
        let range = false;
        setRange(true);
        range = true;
        let lowerRange = 0, higherRange = 0;
        if (range) {
            const b = selectedItem1.split(' ');
            if (b[b.length - 1] === 'ETH') {
                lowerRange = Number(b[0]);
                higherRange = Number(b[2]);
            } else if (b[b.length - 1] === 'USDC') {
                if (b[0] === '<') {
                    lowerRange = 50;
                    const newB = b[1].substr(1);
                    higherRange = Number(newB);
                } else if (b[0] === '>') {
                    const newB = b[1].substr(1);
                    lowerRange = Number(newB);
                    higherRange = 20000;
                } else {
                    lowerRange = Number(b[0].substr(1));
                    higherRange = Number(b[2].substr(1));
                }
            }
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
            lengthsArr.push(testFunc2(lowerRange, d1))
            lengthsArr.push(testFunc2(d1, d2))
            lengthsArr?.push(testFunc2(d2, d3))
            lengthsArr.push(testFunc2(d3, higherRange))
            let data2: any = [];
            if (monthOrYear === 'year') {
                data2 = abcd;
            } else if (monthOrYear === 'month') {
                data2 = abcd1;
            }
            const arr = data2?.filter((item: any) => {
                return item.targetValue >= lowerRange && item.targetValue <= higherRange;
            })
            let processedArrays: any[] = [];
            let processedArrays1: any[] = [];
            // setTestData(arr);
            setMatchedMonths(arr);
            processedArrays1 = lengthsArr?.map((item: any) => {
                return processedArrays1.concat(item[0])
            })
            processedArrays = processedArrays1.flat();
            const processedInput = lengthsArr?.map((item: any) => item[0].length);
            const min = Math.min(...processedInput);
            const max = Math.max(...processedInput);
            const rangeArr = lengthsArr?.map((item: any) => item[1] + ' - ' + item[2])
            let arrOfInterest: any = [];
            processedInput.forEach((item: any) => {
                let val1 = Math.round(((35 - 10) * invlerp(min, max, item)) + 10);
                arrOfInterest = [...arrOfInterest, val1]
            })
            let yAxisItems: any = [];
            arrOfInterest.forEach((_: any, index: number) => {
                yAxisItems.push({
                    id: index,
                    range: rangeArr[index],
                    dimension: arrOfInterest[index],
                    noOfGlyphs: processedInput[index],
                })
            })
            setRange(false);
            setYAxisItems(yAxisItems);
        }
    }

    const testFunc2 = (lowerRange: any, higherRange: any) => {
        let data2: any = [];
        if (monthOrYear === 'year') {
            data2 = abcd;
        } else if (monthOrYear === 'month') {
            data2 = abcd1;
        }
        const arr = data2?.filter((item: any) => {
            return item.targetValue >= lowerRange && item.targetValue <= higherRange;
        })
        return [arr, lowerRange, higherRange];
    }

    const onYAxisItemClicked = (id: any, range: any) => {
        let lowerRange = 0, higherRange = 0;
        const b = range.split(' ');
        lowerRange = Number(b[0]);
        higherRange = Number(b[2]);
        setYAxisValue({ yAxisValueMin: lowerRange, yAxisValueMax: higherRange });
        let data2: any = [];
        let idd = Number(id);
        setYAxisItemClicked(idd);
        if (monthOrYear === 'year') {
            data2 = abcd;
        } else if (monthOrYear === 'month') {
            data2 = abcd1;
        }
        const arr = data2?.filter((item: any) => {
            return item.targetValue >= lowerRange && item.targetValue <= higherRange;
        })
        // setTestData(arr);
        setMatchedMonths(arr);
    }

    const onYAxisItemHoverOn = (id: any) => {
        setYAxisItemHovered(id);
    }

    const onYAxisItemHoverOff = (id: any) => {
        setYAxisItemHovered(null);
    }

    const onDisplayYear = () => {
        setmonthOrYear('');
    }

    const anotherFunc1 = () => {
        // if (monthOrYear === '' && !range) {
        //setChosenData(data1);
        // } else if ((monthOrYear === '') && range) {
        //     setChosenData(matchedMonths);
        // }
        if (data1?.length > 0) {
            let arrOfDuration, freqOfDuration, duration: string | any[], noOfTxns: any[], arrYearPointsOfAxis: any[] = [];
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
                arrOfDuration = data1?.map((item: any) => Number(moment(item.timestamp).format('YYYY')));
                freqOfDuration = arrOfDuration.reduce((acc: any, item: any) => {
                    acc[item] = acc[item] ? acc[item] + 1 : 1;
                    return acc;
                }, {});
                duration = Object.keys(freqOfDuration);
                noOfTxns = Object.values(freqOfDuration);
                const min = Math.min(...noOfTxns);
                const max = Math.max(...noOfTxns);
                noOfTxns.forEach((item: number) => {
                    let val1 = (((35 - 10) * invlerp(min, max, item)) + 10);
                    arrYearPointsOfAxis = [...arrYearPointsOfAxis, val1] //processed count
                })
            }
            const arrOfYears: { month: any; dimension: any; noOfGlyphs: any; }[] = [];
            arrYearPointsOfAxis?.forEach((_, index) => {
                arrOfYears.push({
                    month: duration[index],
                    dimension: arrYearPointsOfAxis[index],
                    noOfGlyphs: noOfTxns[index],
                });
            })
            setArrOfYears(arrOfYears);
        }
    }

    const [arrOfMonths, setArrOfMonths] = useState<any>([]);

    const [someYear, setSomeYear] = useState<any>();

    const onDisplayMonth = (year: number) => {
        setYAxisValue({ yAxisValueMin: 0, yAxisValueMax: 0 });
        setCurrency([]);
        setSomeYear(year);
        setYearViewEnabled(false);
        // if (matchedMonths === 0) {
        //setChosenData(data1);
        // } else if (matchedMonths > 0) {
        //     setChosenData(matchedMonths);
        // }
        if (data1?.length > 0) {
            const arrIndexesOfClickedYears = data1?.filter((item: { timestamp: moment.MomentInput; }) => {
                //console.log('Number(moment(item.timestamp).format("MM"))', Number(moment(item.timestamp).format("MM")))
                let monthFromApi = Number(moment(item.timestamp).format("YYYY"));
                return monthFromApi === Number(year);
            });
            setMatchedMonths(arrIndexesOfClickedYears);
            setAbcd(arrIndexesOfClickedYears);
        }
        setmonthOrYear('year');
    }

    const anotherFunc2 = (someYear: any) => {
        // if (matchedMonths?.length === 0) {
        //     setChosenData(data1);
        // } else {
        //setChosenData(matchedMonths);
        // }
        if (matchedMonths?.length > 0) {
            let arrOfDuration, freqOfDuration, duration: string | any[], noOfTxns: any[], arrMonthPointsOfAxis: any[] = [];
            arrOfDuration = matchedMonths?.map((item: any) => {
                // return Number(moment(item.timestamp).format("YYYY")) == year ? Number(moment(item.timestamp).format("MM")) : undefined;
                if (Number(moment(item.timestamp).format("YYYY")) == Number(someYear)) {
                    return Number(moment(item.timestamp).format("MM"));
                }
                // else {
                //     return undefined;
                // }
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
            //setValueMenuItemClicked(false);
        }
    }

    const onCircleClicked = (month: any) => {
        setYAxisValue({ yAxisValueMin: 0, yAxisValueMax: 0 });
        setCurrency([]);
        setYAxisItems([]);
        setYAxisItemClicked(null);
        setYAxisItemHovered(null);
        // setYearViewEnabled(false);
        setClickedElement(month);
        setmonthOrYear('month');
        // if (monthOrYear === 'month' && !range) {
        //     setChosenData(data1);
        // } else if ((monthOrYear === 'month') && range) {

        // }
        const arrIndexesOfClickedMonths = abcd?.filter((item: { timestamp: moment.MomentInput; }) => {
            let monthFromApi = Number(moment(item.timestamp).format("MM"));
            return monthFromApi === Number(month);
        });
        setMatchedMonths(arrIndexesOfClickedMonths);
        setAbcd1(arrIndexesOfClickedMonths);
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
        setRange(false);
        if (currency === 'ETH') {
            setCurrName('ETH');
            setCurrency([]);
            setChosenCurrency(eth);
            setYAxisItems([]);
            setYAxisItemClicked(null);
            setYAxisItemHovered(null);
        } else if (currency === 'USDC') {
            setCurrName('USDC');
            setCurrency([]);
            setChosenCurrency(usdc);
            setYAxisItems([]);
            setYAxisItemClicked(null);
            setYAxisItemHovered(null);
        }
    }

    const onMoveHexes = (param: any) => {
        if (param === 'left') {
            setCoordinates({ x: coordinates.x - 10, y: coordinates.y, })
        } else if (param === 'up') {
            setCoordinates({ x: coordinates.x, y: coordinates.y - 10, })
        } else if (param === 'down') {
            setCoordinates({ x: coordinates.x, y: coordinates.y + 10, })
        } else if (param === 'right') {
            setCoordinates({ x: coordinates.x + 10, y: coordinates.y, })
        }
    }

    const onEthToUsdcConversion = async () => {
        const yesterday = moment().subtract(1, 'days').format("DD-MM-YYYY");
        const response1 = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false&precision=0')
        const response2 = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum/history?date=' + yesterday + '&localization=false');
        if (response1 !== undefined && response2 !== undefined) {
            let ethToUsdcToday;
            // if (response1?.data?.ethereum?.usd !== undefined) {
            ethToUsdcToday = response1?.data?.ethereum?.usd;
            // }
            setEthToUsdc(ethToUsdcToday);
            let ethToUsdcYesterday;
            // if (response2?.data?.market_data?.current_price?.usd) {
            ethToUsdcYesterday = response2?.data?.market_data?.current_price?.usd;
            // }
            const difference1 = ethToUsdcToday - ethToUsdcYesterday;
            if (difference1 <= 0) {
                setDifference('increment');
            } else {
                setDifference('decrement')
            }
            const difference2 = Math.abs(difference1)
            const percent = Math.round((difference2 / ethToUsdcToday) * 100);
            setEthToUsdcYvsTPercent(percent);
        }
    }

    return (
        <>
            <Box sx={{
                // backgroundColor: '#1C223D',
                // opacity: '50%',
                backgroundColor: '#FFFDFB',
            }}>
                <Box
                    sx={{ height: '7.6vh', }}
                >
                    <Header
                        homeLocation={homeLocation}
                        walletLocation={walletLocation}
                        mapsLocation={mapsLocation}
                        discoveryLocation={discoveryLocation}
                        openWalletModal={openWalletModal}
                        onWalletBtnClickOpen={onWalletBtnClickOpen}
                        onWalletBtnClickClose={onWalletBtnClickClose}
                    />
                </Box>

                <Container
                    height="92.4vh"
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
                            width={`${(currency?.length > 0 || openMenu1) ? '17rem' : '8.3rem'}`}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            border="1px solid #000"
                            borderBottom={`${openMenu1 ? '0' : '1px solid #000'}`}
                            onClick={onOpenYearMenu1}
                            height="2.9rem"
                            disabled={monthOrYear === ''}
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
                                    marginTop: '2px',
                                    transform: openMenu1 ? 'rotate(180deg)' : '',
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
                                    width: '17rem',
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
                        marginLeft: (currency?.length > 0 || openMenu1) ? '19rem' : '10rem',
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
                            margin="0 5px"
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

                    {ethToUsdc !== undefined && difference !== undefined && <Box sx={{
                        position: 'absolute',
                        zIndex: 101,
                        top: '22px',
                        left: '190px',
                        marginLeft: (currency?.length > 0 || openMenu1) ? '11rem' : '2rem',
                    }}>
                        <span>
                            <img
                                src={'./assets/images/ethereum_logo.svg'}
                                alt=''
                                style={{
                                    position: 'absolute',
                                    width: '18px',
                                    height: '16px'
                                }}
                            />
                        </span>
                        <span style={{
                            position: 'absolute',
                            top: '2px',
                            left: '20px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                        }}>=</span>
                        <span style={{
                            position: 'absolute',
                            top: '-1px',
                            left: '32px',
                        }}>
                            <Typography
                                text={'$' + ethToUsdc}
                                fontSize='13px'
                                fontWeight='bold'
                            />
                        </span>
                        <span style={{
                            position: 'absolute',
                            top: '4px',
                            left: '76px',
                        }}>
                            <img
                                src={'./assets/images/redDownArrow.svg'}
                                alt=''
                                style={{
                                    position: 'absolute',
                                    width: '12px',
                                    height: '12px',
                                    transform: difference === 'increment' ? '' : 'rotate(180deg)',
                                }}
                            />
                        </span>
                        <span style={{
                            position: 'absolute',
                            top: '1px',
                            left: '86px',
                            marginTop: difference === 'increment' ? '0' : '5px',
                        }}>
                            <Typography
                                text={ethToUsdcYvsTPercent + '%'}
                                fontSize='9px'
                                fontWeight='bold'
                                color="#EA1313"
                            />
                        </span>
                    </Box>}

                    <Box sx={{
                        position: 'absolute',
                        top: '60px',
                        left: '70px',
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
                            style={{
                                marginLeft: (yAxisItems?.length > 0) ? '0rem' : '3.6rem',
                            }}
                        >
                            <Yaxis
                                yAxisItems={yAxisItems}
                                onYAxisItemClicked={onYAxisItemClicked}
                                yAxisItemClicked={yAxisItemClicked}
                                onYAxisItemHoverOn={onYAxisItemHoverOn}
                                onYAxisItemHoverOff={onYAxisItemHoverOff}
                                yAxisItemHovered={yAxisItemHovered}
                            />
                        </Box>
                        <Box className={styles.midBody}>
                            <Hexgrid
                                matchedMonths={matchedMonths}
                                arrOfMonths={arrOfMonths}
                                arrOfYears={arrOfYears}
                                monthOrYear={monthOrYear}
                                onDisplayYear={onDisplayYear}
                                setArrOfYears={setArrOfYears}
                                coordinates={coordinates}
                                loading1={loading1}
                                chosenData={chosenData}
                                testData={testData}
                                yAxisValue={yAxisValue}
                                xAxisValue={xAxisValue}
                                data1={data1}
                                data={data}
                            />
                            <Xaxis
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
                                range={range}
                                setChosenData={setChosenData}
                                chosenData={chosenData}
                            />
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
                            onMoveHexes={onMoveHexes}
                            coordinates={coordinates}
                            loading1={loading1}
                            monthOrYear={monthOrYear}
                            yAxisValue={yAxisValue}
                            xAxisValue={xAxisValue}
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

            <BackdropDuringApiLoading show={apiLoading} />
        </>
    )
}