import { HexGrid, Layout, Hexagon, Text, Pattern, Path, Hex } from 'react-hexgrid';
import { ApiRequest } from 'components/utils';
import { Fragment, useEffect, useState } from 'react';
import moment from 'moment'

export const Hexgrid = () => {
    const [data, setData] = useState();
    
    useEffect(() => {
        const info = async () => {
            const res = await ApiRequest();
            setData(res);
        }
        info();
    }, [])
    // console.log(data?.data[0])
    return (
        <>
            <HexGrid width={1475} height={650} viewBox="-20 -20 100 100">
                <Layout size={{ x: 10, y: 10 }} flat={false} spacing={1.1} origin={{ x: 0, y: 0 }}>
                    {data?.data[0].hexes.map((item) => {
                        console.log('item.timestamp', moment(item.timestamp).format("YYYY"), moment(item.timestamp).format("MM"))
                        // console.log('item.targetValue', item.targetValue)
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