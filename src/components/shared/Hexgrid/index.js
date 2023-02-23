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
            // setData(res?.data[0]);
            // setData1(res?.data[0].hexes);
            setData(sample[0]);
            setData1(sample[0].hexes);
        }
        info();
    }, [sample])

    useEffect(() => {
        matchedMonths?.map((item, index) => {
            let pattern = document.getElementById(`PAT-${index}`);
            if (pattern) {
                pattern.setAttribute("width", "100%");
                pattern.setAttribute("height", "100%");
            };
        })
    }, [matchedMonths]);

    //console.log('matchedMonths', matchedMonths)
    return (
        <Box sx={{ width: '1474px', height: '84vh', position: 'static', zIndex: 100, }}>
            <HexGrid width={'100%'} height={'100%'} viewBox={`${data?.viewboxMinX} ${data?.viewboxMinY} ${data?.viewboxWidth} ${data?.viewboxHeight}`}>
                <Layout size={{ x: 13, y: 13 }} flat={false} spacing={1.1} origin={{ x: -53, y: -26 }}>
                    {matchedMonths?.map((item, index) => {
                        // let pattern = document.getElementById(`PAT-${index}`);
                        // if (pattern) {
                        //     pattern.setAttribute("width", "100%");
                        //     pattern.setAttribute("height", "100%");
                        // }
                        // console.log(moment(item.timestamp).format("YYYY"), 'item.timestamp', moment(item.timestamp).format("MM"))
                        console.log('item.fillURL', item.fillURL)
                        return (
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
                        )
                    })}
                </Layout>
            </HexGrid>
        </Box>
    )
}