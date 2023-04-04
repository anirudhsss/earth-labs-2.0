
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

export interface WalletProps {
    openWalletModal?: any;
    onWalletBtnClickClose?: any;
    monthOrYear?: any;
    coordinates?: any;
    yAxisValue?: any;
    xAxisValue?: any;
}

export const Wallet = ({
    openWalletModal,
    onWalletBtnClickClose,
    monthOrYear,
    coordinates,
    yAxisValue,
    xAxisValue,
}: WalletProps) => {
    const location = useLocation();
    const homeLocation = location?.state?.icon === 'home';
    const walletLocation = location?.state?.icon === 'wallet';
    const mapsLocation = location?.state?.icon === 'maps';
    const discoveryLocation = location?.state?.icon === 'discovery';

    const [matchedMonths, setMatchedMonths] = useState<any>([]);

    const { data, data1, apiLoading, apiError } = AxiosFetch();
    // const [data1, setData1] = useState<any>([]);

    useEffect(() => {
        if (monthOrYear === '') {
            onDisplayAllTimeTxnInDescOrder();
        }
    }, [data1, matchedMonths]);

    // useEffect(() => {
    //     setData1(data[0]?.hexes);
    // }, [data]);

    const onDisplayAllTimeTxnInDescOrder = () => {
        const sortedTxnInDescOrder = (data1 || [])?.sort((a: any, b: any) => {
            return +new Date(b.timestamp) - +new Date(a.timestamp);
        });
        setMatchedMonths(sortedTxnInDescOrder);
    }

    useEffect(() => {
        matchedMonths?.map((item: any, index: any) => {
            let pattern = document.getElementById(`PAT-${index}`);
            if (pattern) {
                pattern.setAttribute("width", "100%");
                pattern.setAttribute("height", "100%");
            }
        });
    }, [matchedMonths]);

    // useEffect(() => {
    //     const svg = document.querySelector("svg.grid");
    //     // console.log('svg.children', svg.children)
    //     const { xMin, xMax, yMin, yMax } = [...svg.children].reduce((acc, el) => {
    //         const { x, y, width, height } = el.getBBox();
    //         if (!acc.xMin || x < acc.xMin) acc.xMin = x;
    //         if (!acc.xMax || x + width > acc.xMax) acc.xMax = x + width;
    //         if (!acc.yMin || y < acc.yMin) acc.yMin = y;
    //         if (!acc.yMax || y + height > acc.yMax) acc.yMax = y + height;
    //         return acc;
    //     }, {});
    //     const viewbox = `${xMin} ${yMin} ${xMax - xMin} ${yMax - yMin}`;
    //     svg.setAttribute("viewBox", viewbox);
    // }, [matchedMonths]);

    return (
        <Box sx={{
            backgroundColor: '#1C223D',
            width: '100%',
            height: '100vh',
            // opacity: '0.1'
        }}
        // className={styles.transformWrapper}
        >
            <Header
                homeLocation={homeLocation}
                walletLocation={walletLocation}
                mapsLocation={mapsLocation}
                discoveryLocation={discoveryLocation}
                openWalletModal={openWalletModal}
                onWalletBtnClickClose={onWalletBtnClickClose}
            />

            <Container
                padding="0 2rem"
                width="100%"
                height="92%"
                display='flex'
                justifyContent='center'
                alignItems='center'
            >
                <Allgrid
                    coordinates={coordinates}
                    xAxisValue={xAxisValue}
                    yAxisValue={yAxisValue}
                    monthOrYear={monthOrYear}
                />

                <RhsNav
                    openWalletModal={openWalletModal}
                    onWalletBtnClickClose={onWalletBtnClickClose}
                />
            </Container>

            <BackdropDuringApiLoading show={apiLoading} />
        </Box>

    )
}