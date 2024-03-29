import { Box } from "@mui/material";
import {
  useCallback,
  useEffect,
  useState,
  MouseEvent,
  useContext,
} from "react";
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
  CalcRange,
} from "components/utils";
import { useAccount, useConnect } from "wagmi";
import useEthToUsdcConversion from "../../hooks/useEthToUsdcConversion";
import { ArrOfYMDProps, VerticalSelectionProps } from "interface/UserHomepage";
import { HorizontalSelectionProps } from "interface/Utils";
import GlyphDetailPage from "components/GlyphDetailPage";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import useSearchTxnAddress from "hooks/useSearchTxnAddress";
import TwitterConnectAlert from "components/shared/TwitterConnectAlert";
import useTwitterFlow from "hooks/useTwitterFlow";
import SnackbarContext from "context/snackbar.context";
import ReactGA from 'react-ga';
const UserHomepage = () => {
  const [currName, setCurrName] = useState("ETH");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl1, setAnchorEl1] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const openMenu1 = Boolean(anchorEl1);

  const [data1, setData1] = useState<any>(); // Sorted Arr is put here

  const [matchedMonths, setMatchedMonths] = useState<any>([]); // This is what is passed to the hex grid

  const [clickedElement, setClickedElement] = useState<string | undefined>("");
  const [currency, setCurrency] = useState<any>([]);
  const [years, setYears] = useState<ArrOfYMDProps[] | undefined>([]);
  const [arrOfYears, setArrOfYears] = useState<any>([]);
  const [hoverElementId, setHoverElementId] = useState<string | undefined>("");
  const { ethToUsdc } = useEthToUsdcConversion();
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const [chosenCurrency, setChosenCurrency] = useState<any>([]);
  const [coordinates, setCoordinates] = useState<any>({
    x: 0,
    y: 0,
  });
  const [yAxisItems, setYAxisItems] = useState<
    VerticalSelectionProps[] | undefined
  >([]);
  const [yAxisValue, setYAxisValue] = useState({
    yAxisValueMin: 0,
    yAxisValueMax: 0,
  });
  const [xAxisValue, setXAxisValue] = useState({
    xAxisDateMin: 0,
    xAxisDateMax: 0,
  });
  const [arrIndexesOfClickedYears, setArrIndexesOfClickedYears] = useState<
    any[]
  >([]); // data for the year selected

  const [arrIndexesOfClickedMonths, setArrIndexesOfClickedMonths] = useState<
    any[]
  >([]); //

  const [arrIndexesOfClickedDays, setArrIndexesOfClickedDays] = useState<
    HorizontalSelectionProps[]
  >([]); //

  const [filteredDays, setFilteredDays] = useState<any>([]); //

  const { searchTxnAddress } = useSearchTxnAddress();
  const [yAxisItemClicked, setYAxisItemClicked] = useState<any>();
  const [yAxisItemHovered, setYAxisItemHovered] = useState<any>();
  const [arrOfMonths, setArrOfMonths] = useState<ArrOfYMDProps[]>([]);
  const [arrOfDays, setArrOfDays] = useState<ArrOfYMDProps[]>([]);
  const [monthInLetters, setmonthInLetters] = useState<string>("");
  const { address, isConnected, isDisconnected } = useAccount();
  const [walletAddress, setWalletAddress] = useState<string>();
  const [helpIconClicked, setHelpIconClicked] = useState<Boolean>(false);

  const { data, data2, apiLoading } = AxiosFetch(walletAddress);

  const [showDays, setShowDays] = useState<boolean | undefined>(false);

  const [xAxisItem, setXAxisItem] = useState<{
    items: ArrOfYMDProps[];
    current: string;
  }>({
    items: [],
    current: "YEAR",
  });

  const [furtherPropagation, setfurtherPropagation] = useState<boolean>(true);
  const [dayClicked, setdayClicked] = useState<boolean | undefined>(false);
  const [clickedDay, setClickedDay] = useState<string | undefined>("");

  const [clickedMonth, setClickedMonth] = useState<string | undefined>("");
  const [eachGlyphClicked, setEachGlyphClicked] = useState<boolean>(false);
  const [eachTxnHash, setEachTxnHash] = useState<string>("");

  const { openConnectModal } = useConnectModal();

  const { isTwitterConnectedFlagFromLandingPage, removeTwitterConnectFlag } =
    useTwitterFlow();

  const [isTwitterConnectedAlert, setTwitterConnectedAlert] = useState(false);
  const { openSnackBar } = useContext(SnackbarContext);
  // Get all the years content for the x axis


  useEffect(() => {
    // Track page view for the home page
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    if (data && Object.keys(data).length === 0) {
      if (openSnackBar) {
        openSnackBar("Please enter a valid txn or ens name", 5000);
      }
    }
  }, [data2]);

  useEffect(() => {
    if (isTwitterConnectedFlagFromLandingPage()) {
      setTwitterConnectedAlert(true);
      setTimeout(() => {
        removeTwitterConnectFlag();
        setTwitterConnectedAlert(false);
      }, 5000);
    }
  }, []);

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
        setMatchedMonths(arrIndexesOfClickedYears);
        setArrIndexesOfClickedYears(arrIndexesOfClickedYears);
      } else {
        setArrIndexesOfClickedYears([]);
      }
    },
    [data1]
  );

  /* Use Effects */
  useEffect(() => {
    const isNewUser = localStorage.getItem("wallet");
    if (isNewUser) {
      localStorage.removeItem("wallet");
      if (openConnectModal) openConnectModal();
    }
  }, []);

  useEffect(() => {
    setClickedElement("");
  }, []);

  useEffect(() => {
    if (isConnected) {
      setWalletAddress(address);
    }
  }, [isConnected, address]);

  useEffect(() => {
    if (isDisconnected) {
      setWalletAddress(undefined);
    }
  }, [isDisconnected]);

  useEffect(() => {
    if (arrOfYears.length > 0) {
      setXAxisItem({ items: arrOfYears, current: "YEAR" });
    }
  }, [arrOfYears]);

  useEffect(() => {
    const pathname = window.location.pathname;
    const arr = pathname.split("maps/");
    const txn = arr[1];
    if (txn?.length > 0) {
      const address = arr[1];
      setWalletAddress(address);
    }
  }, []);

  const onEachGlyphClickedOpen = (txnHash: string) => {
    setEachTxnHash(txnHash);
    txnHash && setEachGlyphClicked(true);
  };
  const onEachGlyphClickedClose = () => {
    setEachGlyphClicked(false);
  };

  const onSetdayClicked = (dayClicked: boolean | undefined) => {
    setdayClicked(dayClicked);
  };

  const onClickedMonth = (month: string | undefined) => {
    setClickedMonth(month);
  };

  const onHelpSectionClose = () => {
    setHelpIconClicked(false);
  };

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

  const clamp = (a: number, min = 0, max = 1) => {
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

  const allEqual = (noOfTxns: any[], param: any) =>
    noOfTxns.every((item: any) => {
      return item === param;
    });

  const anotherFunc3 = useCallback(
    (abcd2: any, month: any) => {
      if (abcd2?.length > 0) {
        let arrOfDuration,
          freqOfDuration,
          duration: string | any[],
          noOfTxns: any[],
          arrDaysPointsOfAxis: any[] = [];
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
        setmonthInLetters(
          moment()
            .month(month - 1)
            .format("MMM")
        );
        setArrOfDays(arrOfDays);
        setXAxisItem({
          items: arrOfDays,
          current: "DAY",
        });
      }
      setfurtherPropagation(false);
    },
    [invlerp]
  );

  const resetXAxis = (): void => {
    setYAxisValue({ yAxisValueMin: 0, yAxisValueMax: 0 });
    setCurrency([]);
    setYAxisItems([]);
    setYAxisItemClicked(null);
    setYAxisItemHovered(null);
  };

  const onCircleClicked = useCallback(
    (month: string) => {
      resetXAxis();
      const arrIndexesOfClickedMonths: any[] = arrIndexesOfClickedYears?.filter(
        (item: { timestamp: moment.MomentInput }) => {
          let monthFromApi = Number(moment(item.timestamp).format("MM"));
          return monthFromApi === Number(month);
        }
      );
      setMatchedMonths(arrIndexesOfClickedMonths);
      setArrIndexesOfClickedMonths(arrIndexesOfClickedMonths);
    },
    [arrIndexesOfClickedYears]
  );

  // This is setting the data for all the years combined
  useEffect(() => {
    if (data1 && data1.length > 0) {
      setMatchedMonths(data1);
    }
  }, [data1]);

  const onShowDaysInfo = useCallback(
    (arrIndexesOfClickedYears: any, month: any) => {
      resetYAxis();
      const arrIndexesOfClickedDays = arrIndexesOfClickedYears?.filter(
        (item: any) => {
          let monthsFromApi = Number(moment(item.timestamp).format("MM"));
          return monthsFromApi === Number(month);
        }
      );
      setArrIndexesOfClickedDays(arrIndexesOfClickedDays);
      setMatchedMonths(arrIndexesOfClickedDays);
      setfurtherPropagation(false);
    },
    []
  );

  const resetYAxis = () => {
    setYAxisValue({ yAxisValueMin: 0, yAxisValueMax: 0 });
    setCurrency([]);
    setYAxisItems([]);
    setYAxisItemClicked(null);
    setYAxisItemHovered(null);
  };

  const onClickOfADay = useCallback(
    (arrIndexesOfClickedDays: any[], day: any) => {
      setYAxisValue({ yAxisValueMin: 0, yAxisValueMax: 0 });
      setCurrency([]);
      setYAxisItems([]);
      setYAxisItemClicked(null);
      setYAxisItemHovered(null);
      console.log(arrIndexesOfClickedDays, "arrIndexesOfClickedDays");
      if (arrIndexesOfClickedDays?.length > 0) {
        let filteredDays: any[];
        filteredDays = arrIndexesOfClickedDays?.filter((item) => {
          return (
            Number(moment.utc(item.timestamp).format("DD")) === Number(day)
          );
        });
        if (filteredDays.length > 0) {
          setFilteredDays(filteredDays);
          setMatchedMonths(filteredDays); // Automatically clicking the day here
        }
      }
    },
    []
  );

  useEffect(() => {
    if (showDays) {
      onShowDaysInfo(arrIndexesOfClickedYears, clickedMonth);
    }
  }, [
    showDays,
    arrIndexesOfClickedYears,
    clickedMonth,
    onCircleClicked,
    onShowDaysInfo,
  ]);

  useEffect(() => {
    if (xAxisItem.current === "MONTH") {
      const year = clickedMonth;
      onValueMenuItemClicked(year as string);
    }
  }, [clickedMonth]);

  useEffect(() => {
    if (arrIndexesOfClickedYears.length > 0) {
      const year = clickedMonth;
      calculateArrOfMonthsForXAxis(year as string);
    }
  }, [arrIndexesOfClickedYears]);

  useEffect(() => {
    if (showDays) {
      anotherFunc3(arrIndexesOfClickedDays, clickedMonth);
    }
  }, [showDays, arrIndexesOfClickedDays, clickedMonth, anotherFunc3]);

  const onCaptureDayWhenDayClickedEnabled = (day: string | undefined) => {
    setClickedDay(day);
  };

  useEffect(() => {
    if (dayClicked) {
      onClickOfADay(arrIndexesOfClickedDays, clickedDay);
    }
  }, [arrIndexesOfClickedDays, clickedDay, dayClicked, onClickOfADay]);

  const calculateMonthDimensionNoOfGlyphs = useCallback(() => {
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
    calculateMonthDimensionNoOfGlyphs();
  }, [calculateMonthDimensionNoOfGlyphs]);

  const calculateArrOfMonthsForXAxis = useCallback(
    (year: string) => {
      if (arrIndexesOfClickedYears?.length > 0) {
        let arrOfDuration,
          freqOfDuration,
          duration: string | any[],
          noOfTxns: any[],
          arrMonthPointsOfAxis: any[] = [];
        arrOfDuration = arrIndexesOfClickedYears?.map((item: any) => {
          let a;
          if (Number(moment(item.timestamp).format("YYYY")) === Number(year)) {
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
            item -= 0.01;
          } else {
            item += 0.01;
          }
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
        setXAxisItem({
          items: arrOfMonths,
          current: "MONTH",
        });
        //setValueMenuItemClicked(false);
      } else {
        setArrOfMonths([]);
      }
    },
    [invlerp, arrIndexesOfClickedYears]
  );

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
    if (matchedMonths.length > 0) {
      calculateTheCurrencyArr(matchedMonths);
    }
  }, [matchedMonths]);

  const calculateTheCurrencyArr = (arr: any[]) => {
    const tArr = arr?.map((item: any) => item.targetValue);
    const sortedTArr = tArr?.sort((a: any, b: any) => a - b);
    const requiredArr = CalcRange(sortedTArr);
    setChosenCurrency(requiredArr);
  };

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
      setArrIndexesOfClickedDays([]);
      setShowDays(false);
      setClickedElement("");
      setHoverElementId("");
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
      if (id === "All") {
        setMatchedMonths(data1);
        setXAxisItem({
          items: arrOfYears,
          current: "YEAR",
        });
        return;
      }
      setClickedMonth(id);
    },
    [arrOfYears, onDisplayMonth]
  );

  const onValueMenuItemClicked1 = (id: number) => {
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
    //setCurrency(res);
  };

  const testFunc = (selectedItem: any) => {
    console.log(selectedItem, "selectedItem");
    // console.log('selectedItem', selectedItem)
    let lowerRange = 0,
      higherRange = 0;
    const b = selectedItem.split(" ");

    // if (b[b.length - 1] === 'ETH') {
    lowerRange = Number(b[0]);
    higherRange = Number(b[2]);

    if (lowerRange > 0 && higherRange > 0) {
      console.log("Hello");
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
      arr3 = matchedMonths;
      console.log(
        arrIndexesOfClickedDays,
        arrIndexesOfClickedMonths,
        arrIndexesOfClickedYears
      );
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
          a * item.targetValue.toFixed(2) >= lowerRange &&
          a * item.targetValue.toFixed(2) <= higherRange
        );
      });
      // console.log('arr', arr)
      // let processedArrays: any[] = [];
      let processedArrays1: any[] = [];
      console.log(arr, "arr");
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
    data2 = arrIndexesOfClickedMonths;
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

  const onYAxisItemClicked = (
    id: number,
    lowerRange: number,
    higherRange: number
  ) => {
    setYAxisValue({ yAxisValueMin: lowerRange, yAxisValueMax: higherRange });
    let data2: any = [];
    let idd = Number(id);
    setYAxisItemClicked(idd);
    data2 = arrIndexesOfClickedMonths;
    const arr = data2?.filter((item: HorizontalSelectionProps) => {
      console.log(item);
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
    setHoverElementId("");
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
      onValueMenuItemClicked(year);
    },
    [onValueMenuItemClicked]
  );

  const onMonthButtonClicked = useCallback(() => {
    setShowDays(true);
    setfurtherPropagation(false);
  }, []);

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
            onSearchTxn={(searchText: string) => {
              setWalletAddress(searchText);
              searchTxnAddress(searchText);
            }}
          />
        </Box>

        <TwitterConnectAlert isShow={isTwitterConnectedAlert} />

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
            handleName={data?.dotEarthHandle || walletAddress}
            data={data}
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
              onHomeHandle={() => {
                if (isConnected) {
                  setWalletAddress(address);
                }
              }}
            />
          </Box>

          <Box
            sx={{
              width: "100%",
            }}
          >
            <Xaxis
              currentFrame={xAxisItem.current}
              whichDuration={xAxisItem.items}
              monthInLetters={monthInLetters}
              onCaptureDayWhenDayClickedEnabled={
                onCaptureDayWhenDayClickedEnabled
              }
              setXAxisItem={setXAxisItem}
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
      <CustomizedDialogs
        open={helpIconClicked}
        onClose={onHelpSectionClose}
        componentLoaded={<HelpPage />}
        maxWidth="lg"
        borderRadius="30px"
        position="absolute"
        right="160px"
        bottom="100px"
      />
      <CustomizedDialogs
        fullScreen={true}
        open={eachGlyphClicked}
        onClose={onEachGlyphClickedClose}
        componentLoaded={
          <GlyphDetailPage isMapScreen={true} altTxnHash={eachTxnHash} />
        }
        backgroundColor="rgba(28, 34, 61, 0.8)"
        eachGlyphClicked={eachGlyphClicked}
        onEachGlyphClickedClose={onEachGlyphClickedClose}
      />

      <BackdropDuringApiLoading show={apiLoading} />
    </>
  );
};

export default UserHomepage;
