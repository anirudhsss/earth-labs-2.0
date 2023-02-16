import { HexGrid, Layout, Hexagon, Text, Pattern, Path, Hex } from 'react-hexgrid';
import { ApiRequest } from 'components/utils';
import { Fragment, useEffect, useState } from 'react';
import moment from 'moment'
import sample from '../../../sample.json'

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
    const whichDuration = monthOrYear === 'year' ? arrOfYears : monthOrYear === 'month' ? arrOfMonths : [];

    useEffect(() => {
        setArrOfYears(onDisplayYear);
    }, [data1, sample])

    useEffect(() => {
        const info = async () => {
            const res = await ApiRequest();
            // setData(res?.data[0]);
            // setData1(res?.data[0].hexes);
            setData(sample[0]);
            setData1(sample[0].hexes);
        }
        info();
    }, [])
    
    return (
        <>
            <HexGrid width={1600} height={650} viewBox={`${data?.viewboxMinX} ${data?.viewboxMinY} ${data?.viewboxWidth} ${data?.viewboxHeight}`}>
                <Layout size={{ x: 15, y: 15 }} flat={false} spacing={1.1} origin={{ x: -70, y: -35 }}>
                    {matchedMonths?.map((item) => {
                        // console.log(moment(item.timestamp).format("YYYY"), 'item.timestamp', moment(item.timestamp).format("MM"))
                        return (
                            <Fragment>
                                <Hexagon q={item.q} r={item.r} s={item.s} fill={item.guid} />
                                <Pattern id={item.guid} link={item.fillURL} size={{ x: 15, y: 15 }} />
                            </Fragment>
                        )
                    })}
                </Layout>
            </HexGrid>
        </>
    )
}