import { Box } from '@mui/material';
import { Typography } from '../Typography';
import { YaxisItems } from './YaxisItems';
import styles from './styles.module.css';

export interface YaxisProps {
    yAxisItems?: any;
    onYAxisItemClicked?: any;
    yAxisItemClicked?: any;
    onYAxisItemHoverOn?: any;
    onYAxisItemHoverOff?: any;
    yAxisItemHovered?: any;
}

export const Yaxis = ({
    yAxisItems,
    onYAxisItemClicked,
    yAxisItemClicked,
    onYAxisItemHoverOn,
    onYAxisItemHoverOff,
    yAxisItemHovered,
}: YaxisProps) => {

    return (
        <>
            <Box className={styles.container}>
                <Box className={styles.groupOfCircles}>
                    {yAxisItems?.map((item: any) => {
                        return (
                            <>
                                <Box
                                    key={item.id}
                                    className={styles.circle1}
                                    sx={{
                                        width: item.dimension,
                                        height: item.dimension,
                                        backgroundColor: (yAxisItemClicked === item.id || yAxisItemHovered === item.id) ? '#FE7D06' : '#FFF7EE',
                                    }}
                                    onClick={() => onYAxisItemClicked(item.id, item.range)}
                                    onMouseEnter={() => onYAxisItemHoverOn(item.id)}
                                    onMouseLeave={() => onYAxisItemHoverOff(item.id)}
                                >
                                    {(yAxisItemClicked === item.id || yAxisItemHovered === item.id) && <>
                                        <span style={{
                                            marginLeft: '10rem'
                                        }}>
                                            <Typography
                                                text={item.range}
                                                fontSize="10px"
                                            />
                                        </span>
                                        <span>
                                            <img src={'./assets/images/ethereum-logo.svg'} alt=""
                                            // style={{ position: 'absolute', width: '16px', }}
                                            />
                                        </span>
                                    </>}
                                </Box>
                                {/* {(yAxisItemClicked === item.id || yAxisItemHovered === item.id) && <> */}
                                {/* <span
                                    style={{
                                        position: 'absolute',
                                        left: '40px',
                                        top: '5px',
                                    }}
                                > */}
                                {/* <Typography
                                    text={item.range}
                                    fontSize="10px"
                                /> */}
                                {/* </span> */}
                                {/* <span style={{
                                    position: 'absolute',
                                    left: '60px',
                                    top: '5px',
                                }}>
                                    <img src={'./assets/images/ethereum-logo.svg'} alt=""
                                        style={{ position: 'absolute', width: '16px', }}
                                    />
                                </span> */}
                                {/* </>} */}
                            </>
                        )
                    })}
                </Box>
                <Box className={styles.line}></Box>
                {/* <Box className={styles.groupOfCircles}>
                    {yAxisItems?.map((item: any) => {
                        return (
                           
                                <Box>
                                    <Typography
                                        text={item.range}
                                        fontSize="10px"
                                    />
                                </Box>
                        )
                    })}
                </Box> */}
            </Box>
        </>
    )
}