import { Box } from '@mui/material';
import { HexGrid, Layout, Hexagon, Text, Pattern, Path, Hex } from 'react-hexgrid';
import { ApiRequest } from 'components/utils';
import { Fragment, useEffect, useState } from 'react';
import moment from 'moment'
import sample from '../../../sample.json'
import styles from './styles.module.css';

// export interface HexgridProps {
//     matchedMonths?: any;
// }

export const Hexgrid = ({
    matchedMonths,
    arrOfMonths,
    arrOfYears,
    monthOrYear,
    onDisplayYear,
    setArrOfYears,
    coordinates,
}) => {
    const [data, setData] = useState();
    const [data1, setData1] = useState();
    const [sortedData, setSortedData] = useState();
    //const whichDuration = monthOrYear === 'year' ? arrOfYears : monthOrYear === 'month' ? arrOfMonths : [];

    useEffect(() => {
        setArrOfYears(onDisplayYear);
    }, [data1])

    useEffect(() => {
        const info = async () => {
            const res = await ApiRequest();
            setData(res?.data[0]);
            setData1(res?.data[0].hexes);
            // setData(sample[0]);
            // setData1(sample[0].hexes);
        }
        info();
    }, [])

    useEffect(() => {
        matchedMonths?.map((item, index) => {
            let pattern = document.getElementById(`PAT-${index}`);
            if (pattern) {
                pattern.setAttribute("width", "100%");
                pattern.setAttribute("height", "100%");
            };
        })
    }, [matchedMonths]);

    
    return (
        <Box sx={{ width: '1440px', height: '86vh',
            //  position: 'absolute', 
        zIndex: 100, }}>
            <Box sx={{
                position: 'absolute',
                marginRight: '184px',
                top: 3,
                bottom: 55,
                left: 1400,
                right: 0,
                background: 'linear-gradient(90deg, rgba(255, 253, 251, 0) 0%, rgba(255, 253, 251, 0.743281) 28.13%, rgba(255, 253, 251, 0.9) 51.56%, #FFFDFB 100%)',
                zIndex: 98,
            }}></Box>
            <Box sx={{
                position: 'absolute',
                marginBottom: '650px',
                top: 0,
                bottom: 55,
                left: 57,
                right: 183,
                background: 'linear-gradient(0deg, rgba(255, 253, 251, 0) 0%, rgba(255, 253, 251, 0.743281) 28.13%, rgba(255, 253, 251, 0.9) 51.56%, #FFFDFB 100%)',
                zIndex: 98,
            }}></Box>
            <HexGrid width={'100%'} height={'100%'} viewBox={`${data?.viewboxMinX} ${data?.viewboxMinY} ${data?.viewboxWidth} ${data?.viewboxHeight}`}>
                <Layout size={{ x: 13, y: 13 }} flat={false} spacing={1.1} origin={coordinates}>
                    {matchedMonths?.map((item, index) => {
                        return (
                            <>
                            <Fragment>
                                <Hexagon 
                                    q={item.q} 
                                    r={item.r} 
                                    s={item.s} 
                                    fill={`PAT-${index}`}
                                    id={`grid-identifier-${index}`}
                                />
                                <Pattern 
                                    id={`PAT-${index}`}
                                    link={item.fillURL} 
                                    size={{ x: 13, y: 13 }} 
                                />
                            </Fragment>
                            </>
                        )
                    })}
                </Layout>
            </HexGrid>
            <Box sx={{
                position: 'absolute',
                marginTop: '650px',
                top: 0,
                bottom: 55,
                left: 57,
                right: 183,
                background: 'linear-gradient(180deg, rgba(255, 253, 251, 0) 0%, rgba(255, 253, 251, 0.743281) 28.13%, rgba(255, 253, 251, 0.9) 51.56%, #FFFDFB 100%)',
                zIndex: 98,
            }}></Box>
            <Box sx={{
                position: 'absolute',
                marginLeft: '56px',
                top: 3,
                bottom: 55,
                left: 0,
                right: 1540,
                background: 'linear-gradient(270deg, rgba(255, 253, 251, 0) 0%, rgba(255, 253, 251, 0.743281) 28.13%, rgba(255, 253, 251, 0.9) 51.56%, #FFFDFB 100%)',
                zIndex: 98,
            }}></Box>
        </Box>
    )
}