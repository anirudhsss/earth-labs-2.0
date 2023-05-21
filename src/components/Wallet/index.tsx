
import { Box } from '@mui/material';
import { Container } from 'components/shared/Container';
import { Header } from 'components/shared/Header';
// import { ModalDialog } from 'components/shared/ModalDialog';
import { HelpPage } from 'components/HelpPage';
import PostHeaderLayer from 'components/PostHeaderLayer';
import { Allgrid } from 'components/shared/Allgrid';
import { CustomizedDialogs } from 'components/shared/ModalDialog';
import { RhsNav } from 'components/shared/RhsNav';
import { AxiosFetch, BackdropDuringApiLoading } from 'components/utils';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';

export interface WalletProps {
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

export const Wallet = ({
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
}: WalletProps) => {
    const [yAxisValue] = useState({
        yAxisValueMin: 0, yAxisValueMax: 0,
    });
    const [xAxisValue, setXAxisValue] = useState({
        xAxisDateMin: 0, xAxisDateMax: 0,
    });

    // const yAxisValue = location?.state?.yAxisValue;
    // const xAxisValue = location?.state?.xAxisValue;

    const [matchedMonths, setMatchedMonths] = useState<any>([]);
    const [helpIconClicked, setHelpIconClicked] = useState<Boolean>(false);

    const { data, data2, apiLoading } = AxiosFetch();
    const [data1, setData1] = useState<any>([]);

    useEffect(() => {
        const a = data2?.filter((item: any) => item.isWallet === 1);
        setData1(a);
    }, [data2]);

    const onFindingXAxisMinAndMax = useCallback(() => {
        let arr: number[] = [];
        matchedMonths?.map((item: any) => {
            arr.push(Number(moment(item.timestamp).format("DD")));
            return Number(moment(item.timestamp).format("DD"));
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
    }, [matchedMonths]);

    useEffect(() => {
        onFindingXAxisMinAndMax();
    }, [onFindingXAxisMinAndMax]);

    const onHelpSectionClose = () => {
        setHelpIconClicked(false);
    }

    const onDisplayAllTimeTxnInDescOrder = useCallback(() => {
        const sortedTxnInDescOrder = (data1 || [])?.sort((a: any, b: any) => {
            return +new Date(b.timestamp) - +new Date(a.timestamp);
        });
        setMatchedMonths(sortedTxnInDescOrder);
    }, [data1]);

    useEffect(() => {
        // if (monthOrYear === '') {
        onDisplayAllTimeTxnInDescOrder();
        // }
    }, [onDisplayAllTimeTxnInDescOrder]);

    const onHelpIconClicked = () => {
        setHelpIconClicked(!helpIconClicked);
    }

    return (
        <Box sx={{
            backgroundColor: '#1C223D',
            // backgroundColor: '#f5f5f5',
            width: '100%',
            height: '100vh',
            // opacity: '0.1'
        }}
        // className={styles.transformWrapper}
        >
            {/* <Box sx={{
                border: '2px solid white',
                position: 'relative',
                top: '50rem',
                width: '20rem'
            }}></Box> */}
            <Header
            />

            <Container
                padding="0 3rem 0 2rem"
                width="100%"
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
                />

                <Box sx={{
                    width: "100%",
                    height: "82%",
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    {/* {helpIconClicked ?
                        <HelpPage />
                        :  */}
                    <Allgrid
                        xAxisValue={xAxisValue}
                        yAxisValue={yAxisValue}
                        data1={data1}
                        data={data}
                    />
                    {/* } */}

                    <RhsNav
                        helpIconClicked={helpIconClicked}
                        onHelpIconClicked={onHelpIconClicked}
                    />
                </Box>

            </Container>

            <CustomizedDialogs
                open={helpIconClicked}
                onClose={onHelpSectionClose}
                componentLoaded={<HelpPage />}
                borderRadius='30px'
            />

            <BackdropDuringApiLoading show={apiLoading} />
        </Box>

    )
}