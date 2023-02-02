import { HexGrid, Layout, Hexagon, Text, Pattern, Path, Hex } from 'react-hexgrid';
import { ApiRequest } from 'components/utils';
import { Fragment, useEffect, useState } from 'react';
import moment from 'moment'

// export interface HexgridProps {
//     matchedMonths?: any;
// }

export const Hexgrid = ({
    matchedMonths,
}) => {
    const [data, setData] = useState();
    const [data1, setData1] = useState();
    const [sortedData, setSortedData] = useState();

    useEffect(() => {
        const info = async () => {
            const res = await ApiRequest();
            setData(res);
            setData1(res?.data[0].hexes);
        }
        info();
    }, [])

    useEffect(() => {

    }, [])
    console.log('matchedMonths', matchedMonths)
    return (
        <>
            <HexGrid width={1475} height={650} viewBox="-20 -20 100 100">
                <Layout size={{ x: 10, y: 10 }} flat={false} spacing={1.1} origin={{ x: 0, y: 0 }}>
                    {matchedMonths?.map((item) => {
                        // console.log(moment(item.timestamp).format("YYYY"), 'item.timestamp', moment(item.timestamp).format("MM"))
                        return (
                            <Fragment>
                                <Hexagon q={item.q} r={item.r} s={item.s} fill={item.guid} />
                                <Pattern id={item.guid} link={item.fillURL} />
                            </Fragment>
                        )
                    })}
                </Layout>
            </HexGrid>
        </>
    )
}