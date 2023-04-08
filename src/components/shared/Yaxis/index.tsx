import { Box } from '@mui/material';
import { Typography } from '../Typography';
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
                    <Box sx={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: 'black',
                    }}>
                        <span style={{
                            marginLeft: '10rem',
                            // width: '10px',
                            // height: '10px',
                        }}>
                            <Typography
                                text={yAxisItems?.lowerRange}
                                fontSize="12px"
                                fontWeight='bold'
                            // width='10px'
                            // height='10px'
                            />
                        </span>
                    </Box>
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
                                    {(yAxisItemClicked === item.id || yAxisItemHovered === item.id) &&
                                        <>
                                            <span style={{
                                                marginLeft: '10rem'
                                            }}>
                                                <Typography
                                                    text={item.range}
                                                    fontSize="12px"
                                                    fontWeight='bold'
                                                />
                                            </span>
                                            {/* <span>
                                            <img src={'./assets/images/ethereum-logo.svg'} alt=""
                                            />
                                        </span> */}
                                        </>
                                    }
                                </Box>

                            </>
                        )
                    })}
                    <Box sx={{ position: 'relative', }}>
                        <Box sx={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: 'black',
                        }}>
                        </Box>
                        <span style={{
                            position: 'absolute',
                            left: '10rem'
                        }}>
                            <Typography
                                text={yAxisItems?.higherRange}
                                fontSize="12px"
                                fontWeight='bold'
                            />
                        </span>
                    </Box>
                </Box>
                <Box className={styles.line}>
                    {/* <span
                        style={{
                            position: 'absolute',
                            fontSize: '1.5rem',
                            right: '-5.5px',
                            top: '-5.5px',
                        }}
                    >&#8963;</span> */}
                </Box>
            </Box>
        </>
    )
}