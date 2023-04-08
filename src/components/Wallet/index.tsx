
import { Avatar, Box } from '@mui/material';
import { Button } from 'components/shared/Button';
import { Container } from 'components/shared/Container';
import { Header } from 'components/shared/Header';
import { ModalDialog } from 'components/shared/ModalDialog';
import { RhsNav } from 'components/shared/RhsNav';
import { NormalSearchField } from 'components/shared/TextField';
import { Typography } from 'components/shared/Typography';
import { AxiosFetch, BackdropDuringApiLoading } from 'components/utils';
import { Fragment, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './styles.module.css';
import {
    HEXAGON_WIDTH,
    HEXAGON_HEIGHT,
    HEXGRID_RENDER_TOTAL_WIDTH,
    HEXGRID_RENDER_TOTAL_HEIGHT,
} from "constant";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
    HexGrid,
    Layout,
    Hexagon,
    Text,
    Pattern,
    Path,
    Hex,
} from "react-hexgrid";
import { Allgrid } from 'components/shared/Allgrid';
import moment from 'moment';

export interface WalletProps {
    // openWalletModal?: any;
    // onWalletBtnClickClose?: any;
    // monthOrYear?: any;
    // coordinates?: any;
    // yAxisValue?: any;
    // xAxisValue?: any;
}

export const Wallet = ({
    // openWalletModal,
    // onWalletBtnClickClose,
    // monthOrYear,
    // coordinates,
    // yAxisValue,
    // xAxisValue,
}: WalletProps) => {
    const [yAxisValue, setYAxisValue] = useState({
        yAxisValueMin: 0, yAxisValueMax: 0,
    });
    const [xAxisValue, setXAxisValue] = useState({
        xAxisDateMin: 0, xAxisDateMax: 0,
    });
    const location = useLocation();
    const homeLocation = location?.state?.icon === 'home';
    const walletLocation = location?.state?.icon === 'wallet';
    const mapsLocation = location?.state?.icon === 'maps';
    const discoveryLocation = location?.state?.icon === 'discovery';

    // const yAxisValue = location?.state?.yAxisValue;
    // const xAxisValue = location?.state?.xAxisValue;

    const [matchedMonths, setMatchedMonths] = useState<any>([]);

    const { data, data2, apiLoading, apiError } = AxiosFetch();
    const [data1, setData1] = useState<any>([]);

    useEffect(() => {
        const a = data2?.filter((item: any) => item.isWallet === 1);
        setData1(a);
    }, [data2]);

    useEffect(() => {
        onFindingXAxisMinAndMax();
    }, [data1, matchedMonths]);

    useEffect(() => {
        // if (monthOrYear === '') {
        onDisplayAllTimeTxnInDescOrder();
        // }
    }, [data1, matchedMonths]);

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

    const onDisplayAllTimeTxnInDescOrder = () => {
        const sortedTxnInDescOrder = (data1 || [])?.sort((a: any, b: any) => {
            return +new Date(b.timestamp) - +new Date(a.timestamp);
        });
        setMatchedMonths(sortedTxnInDescOrder);
    }

    return (
        <Box sx={{
            backgroundColor: '#1C223D',
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
                homeLocation={homeLocation}
                walletLocation={walletLocation}
                mapsLocation={mapsLocation}
                discoveryLocation={discoveryLocation}
            // openWalletModal={openWalletModal}
            // onWalletBtnClickClose={onWalletBtnClickClose}
            />

            <Container
                padding="0 3rem 0 2rem"
                width="100%"
                height="92%"
                display='flex'
                justifyContent='center'
                alignItems='center'
            >
                <Allgrid
                    // coordinates={coordinates}
                    xAxisValue={xAxisValue}
                    yAxisValue={yAxisValue}
                    data1={data1}
                    data={data}
                // monthOrYear={monthOrYear}
                />

                <RhsNav
                // openWalletModal={openWalletModal}
                // onWalletBtnClickClose={onWalletBtnClickClose}
                />
            </Container>

            <BackdropDuringApiLoading show={apiLoading} />
        </Box>

    )
}