import { Box } from "@mui/material";
import { useCallback, useEffect, useState, MouseEvent } from "react";
import styles from "./styles.module.css";

import { Container } from "components/shared/Container";
import moment from "moment";
import { Hexgrid } from "../shared/Hexgrid";
import { Xaxis } from "../shared/Xaxis";
import { Header } from "components/shared/Header";
import { RhsNav } from "components/shared/RhsNav";
import { HelpPage } from "components/HelpPage";
import PostHeaderLayer from "components/PostHeaderLayer";
import { CustomizedDialogs } from "components/shared/ModalDialog";
import { Yaxis } from "components/shared/Yaxis";
import {
    AxiosFetch,
    BackdropDuringApiLoading,
    CalcRange
} from "components/utils";
import { useAccount } from "wagmi";
import useEthToUsdcConversion from "../../hooks/useEthToUsdcConversion";
import { ArrOfYMDProps, VerticalSelectionProps } from "interface/UserHomepage";
import { HorizontalSelectionProps } from "interface/Utils";
import GlyphDetailPage from "components/GlyphDetailPage";

const UserHomepage = () => {
    const [currName, setCurrName] = useState("ETH");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorEl1, setAnchorEl1] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const openMenu1 = Boolean(anchorEl1);
    const [data1, setData1] = useState<any>();
    const [matchedMonths, setMatchedMonths] = useState<any>([]);
    const [clickedElement, setClickedElement] = useState<string | undefined>('');
    const [currency, setCurrency] = useState<any>([]);
    const [years, setYears] = useState<ArrOfYMDProps[] | undefined>([]);
    const [arrOfYears, setArrOfYears] = useState<any>([]);
    const [hoverElementId, setHoverElementId] = useState<string | undefined>('');
    const { ethToUsdc } = useEthToUsdcConversion();
    const [openWalletModal, setOpenWalletModal] = useState(false);
    const [chosenCurrency, setChosenCurrency] = useState<any>([]);
    const [coordinates, setCoordinates] = useState<any>({
        x: 0,
        y: 0,
    });
    const [yAxisItems, setYAxisItems] = useState<VerticalSelectionProps[] | undefined>([]);
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
    const [arrOfMonths, setArrOfMonths] = useState<any>([]);
    const [arrOfDays, setArrOfDays] = useState<ArrOfYMDProps[]>([]);
    const [monthInLetters, setmonthInLetters] = useState<string>('');
    const { address } = useAccount();
    const [walletAddress, setWalletAddress] = useState<string>();
    const [helpIconClicked, setHelpIconClicked] = useState<Boolean>(false);
    const { data, data2, apiLoading } = AxiosFetch(walletAddress);
    // console.log(data2)
    const [showDays, setShowDays] = useState<boolean | undefined>(false);
    const [furtherPropagation, setfurtherPropagation] = useState<boolean>(true);
    const [dayClicked, setdayClicked] = useState<boolean | undefined>(false);
    const [clickedDay, setClickedDay] = useState<string | undefined>('');
    const [abcd2, setAbcd2] = useState<HorizontalSelectionProps[]>([]);
    const [abcd3, setAbcd3] = useState<any>([]);
    const [clickedMonth, setClickedMonth] = useState<string | undefined>('');
    const [eachGlyphClicked, setEachGlyphClicked] = useState<boolean>(false);
    const [eachTxnHash, setEachTxnHash] = useState<string>('');

    const onEachGlyphClickedOpen = (txnHash: string) => {
        setEachTxnHash(txnHash);
        txnHash && setEachGlyphClicked(true);
    };
    const onEachGlyphClickedClose = () => setEachGlyphClicked(false);

    const onSetdayClicked = (dayClicked: boolean | undefined) => {
        setdayClicked(dayClicked);
    }

    const onClickedMonth = (month: string | undefined) => {
        setClickedMonth(month);
    }

    const onHelpSectionClose = () => {
        setHelpIconClicked(false);
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
            return Number(moment(item.timestamp).format("DD"));
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

    const onDisplayMonth = useCallback(
        (year: string) => {
            setYAxisValue({ yAxisValueMin: 0, yAxisValueMax: 0 });
            setCurrency([]);
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
        return Math.min(max, Math.max(min, a)); //0.33
    };
    const invlerp = useCallback((min: number, max: number, item: number) => {
        // if (item === min || max === min) {
        //     min -= 0.01;
        //     max += 0.01;
        // }
        // console.log('invlerp', min, max, item);
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
                    let a;
                    // console.log('Number(moment(item.timestamp).format("MM")', Number(moment(item.timestamp).format("MM")));
                    // console.log('Number(month)', Number(month));
                    if (Number(moment(item.timestamp).format("MM")) === Number(month)) {
                        // console.log('Number(moment(item.timestamp).format("DD")', Number(moment(item.timestamp).format("DD")));
                        a = Number(moment.utc(item.timestamp).format("DD"));
                        return Number(moment.utc(item.timestamp).format("DD"));
                    }
                    return a;
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
        (month: string) => {
            // console.log('onCircleClicked', month);
            setYAxisValue({ yAxisValueMin: 0, yAxisValueMax: 0 });
            setCurrency([]);
            setYAxisItems([]);
            setYAxisItemClicked(null);
            setYAxisItemHovered(null);
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
        if ((years || [])[0]?.month === arrOfYears[arrOfYears?.length - 1]?.month) {
            const a = arrOfMonths[arrOfMonths.length - 1]?.month;
            // console.log('a1', a);
            onCircleClicked(a);
            onClickedElementEnabled(a);
            onClickedMonth(a);
        } else {
            const a = arrOfMonths[0]?.month;
            // console.log('a2', a);
            onCircleClicked(a);
            onClickedElementEnabled(a);
            onClickedMonth(a);
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

    const onClickOfADay = useCallback((abcd2: any[], day: any) => {
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

    const onCaptureDayWhenDayClickedEnabled = (day: string | undefined) => {
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
                    let a;
                    if (
                        Number(moment(item.timestamp).format("YYYY")) === Number(someYear1)
                    ) {
                        a = Number(moment(item.timestamp).format("MM"));
                        return Number(moment(item.timestamp).format("MM"));
                    }
                    return a;
                });
                // console.log('arrOfDuration', arrOfDuration);
                freqOfDuration = arrOfDuration.reduce((acc: any, item: any) => {
                    acc[item] = acc[item] ? acc[item] + 1 : 1;
                    return acc;
                }, {});
                // console.log('freqOfDuration', freqOfDuration);
                duration = Object.keys(freqOfDuration);
                noOfTxns = Object.values(freqOfDuration);
                const min = Math.min(...noOfTxns);
                const max = Math.max(...noOfTxns);
                // console.log('', min, max, noOfTxns)
                noOfTxns.forEach((item: number, index: number) => {
                    if (index === 0) {
                        item -= 0.01
                    } else {
                        item += 0.01;
                    };
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
                // console.log('arrOfMonths', arrOfMonths)
                setArrOfMonths(arrOfMonths);
                //setValueMenuItemClicked(false);
            }
        },
        [invlerp, abcd]
    );

    useEffect(() => {
        // console.log('years', years);
        const a = (years || [])[0]?.month;
        anotherFunc2(a);
    }, [anotherFunc2, years]);

    // useEffect(() => {
    //     onEthToUsdcConversion();
    // }, [difference])

    useEffect(() => {
        const a = data2?.filter((item: any) => {
            return item.isWallet === 0;
        });
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
        const tArr = arr?.map((item: any) => item.targetValue);
        const sortedTArr = tArr?.sort((a: any, b: any) => a - b);
        const requiredArr = CalcRange(sortedTArr);
        // console.log('requiredArr', requiredArr);
        setChosenCurrency(requiredArr);
    }, [abcd1, abcd3, furtherPropagation]);

    const onHelpIconClicked = () => {
        setHelpIconClicked(!helpIconClicked);
    };

    const onOpenYearMenu = (e: MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };
    const onOpenYearMenu1 = (e: MouseEvent<HTMLElement>) => {
        setAnchorEl1(e.currentTarget);
    };
    const onCloseYearMenu = () => {
        setAnchorEl(null);
    };
    const onCloseYearMenu1 = () => {
        setAnchorEl1(null);
    };

    const onValueMenuItemClicked = useCallback(
        (id: string) => {
            showDaysDsiabled();
            furtherPropagationEnabled();
            setAbcd2([]);
            setShowDays(false);
            setClickedElement('');
            setHoverElementId('');
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
            // return selectedItem;
        });
        testFunc(res);
        setCurrency(res);
    };

    const testFunc = (selectedItem: any) => {
        // console.log('selectedItem', selectedItem)
        let lowerRange = 0,
            higherRange = 0;
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

        if (lowerRange > 0 && higherRange > 0) {
            let c = higherRange - lowerRange;
            let d = c / 4;
            let d1 = Number((lowerRange + d).toFixed(3));
            let d2 = Number((d1 + d).toFixed(3));
            let d3 = Number((d2 + d).toFixed(3));
            const lengthsArr: any[] = [];
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
                return (
                    a * (item.targetValue.toFixed(2)) >= lowerRange &&
                    a * (item.targetValue.toFixed(2)) <= higherRange
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
            let yAxisItems: VerticalSelectionProps[] = [];
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
            setYAxisItems(yAxisItems);
        }
    };

    const testFunc2 = (lowerRange: number, higherRange: number) => {
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
            return (
                a * item.targetValue >= lowerRange &&
                a * item.targetValue <= higherRange
            );
        });
        return [arr, lowerRange, higherRange];
    };

    const onYAxisItemClicked = (id: number, lowerRange: number, higherRange: number) => {
        setYAxisValue({ yAxisValueMin: lowerRange, yAxisValueMax: higherRange });
        let data2: any = [];
        let idd = Number(id);
        setYAxisItemClicked(idd);
        data2 = abcd1;
        const arr = data2?.filter((item: HorizontalSelectionProps) => {
            console.log(item)
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
            return (
                a * item.targetValue >= lowerRange &&
                a * item.targetValue <= higherRange
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

    const onCircleHoverStarts = (elementId: string | undefined) => {
        setHoverElementId(elementId);
    };

    const onCircleHoverEnds = (elementId: string | undefined) => {
        setHoverElementId('');
    };

    const onWalletBtnClickOpen = () => {
        setOpenWalletModal(true);
    };

    const onWalletBtnClickClose = () => {
        setOpenWalletModal(false);
    };

    const onChosingCurrency = (currency: any) => {
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

    const onClickedElementEnabled = (month: string | undefined) => {
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
    // console.log('arrOfDays', arrOfDays);
    // console.log('arrOfMonths', arrOfMonths);
    // console.log('arrOfYears', arrOfYears);
    // console.log('month', month);
    // console.log('chosenCurrency', chosenCurrency);
    // console.log('currency', currency);
    // console.log('yAxisItems', yAxisItems)
    // console.log('years', years)

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
                            <Hexgrid
                                onEachGlyphClickedOpen={onEachGlyphClickedOpen}
                                matchedMonths={matchedMonths}
                                arrOfMonths={arrOfMonths}
                                arrOfYears={arrOfYears}
                                setArrOfYears={setArrOfYears}
                                coordinates={coordinates}
                                yAxisValue={yAxisValue}
                                xAxisValue={xAxisValue}
                                data={data}
                            />
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
                            onCaptureDayWhenDayClickedEnabled={
                                onCaptureDayWhenDayClickedEnabled
                            }
                            showDaysEnabled={showDaysEnabled}
                            onSetdayClicked={onSetdayClicked}
                            onClickedElementEnabled={onClickedElementEnabled}
                            furtherPropagation={furtherPropagation}
                            onClickedMonth={onClickedMonth}
                            arrOfDays={arrOfDays}
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
                            arrOfMonths={arrOfMonths}
                            arrOfYears={arrOfYears}
                            onCircleHoverStarts={onCircleHoverStarts}
                            onCircleHoverEnds={onCircleHoverEnds}
                            hoverElementId={hoverElementId}
                        />
                    </Box>
                </Container>
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
                componentLoaded={<HelpPage />}
                maxWidth='lg'
                borderRadius='30px'
                position='absolute'
                right='160px'
                bottom='100px'
            />
            <CustomizedDialogs
                fullScreen={true}
                open={eachGlyphClicked}
                onClose={onEachGlyphClickedClose}
                componentLoaded={<GlyphDetailPage altTxnHash={eachTxnHash} />}
                // opacity="0.8"
                backgroundColor="rgba(28, 34, 61, 0.8)"
                eachGlyphClicked={eachGlyphClicked}
                onEachGlyphClickedClose={onEachGlyphClickedClose}
            />

            <BackdropDuringApiLoading show={apiLoading} />
        </>
    );
};

export default UserHomepage;