import { Box } from '@mui/material';
import { VerticalSelectionProps } from 'interface/UserHomepage';
import { Typography } from '../Typography';
import styles from './styles.module.css';

export interface YaxisProps {
    yAxisItems: VerticalSelectionProps[] | undefined;
    onYAxisItemClicked?: (id: number, lowerRange: number, higherRange: number) => void;
    yAxisItemClicked?: any;
    onYAxisItemHoverOn?: any;
    onYAxisItemHoverOff?: any;
    yAxisItemHovered?: any;
    currName?: any;
}

export const Yaxis = ({
    yAxisItems,
    onYAxisItemClicked,
    yAxisItemClicked,
    onYAxisItemHoverOn,
    onYAxisItemHoverOff,
    yAxisItemHovered,
    currName,
}: YaxisProps) => {
    return (
        <Box sx={{ height: '78vh', }}>
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
                        }}>
                            {/* <Typography
                                text={(yAxisItems || [])[0]?.lowerRange.toString()}
                                fontSize="12px"
                                fontWeight='bold'
                            /> */}
                        </span>
                    </Box>
                    {/* {yAxisItems?.map((item: any) => {
                        const range = item.range.split(' ');
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
                                    onClick={() => onYAxisItemClicked(item.id, range[0], range[2])}
                                    onMouseEnter={() => onYAxisItemHoverOn(item.id)}
                                    onMouseLeave={() => onYAxisItemHoverOff(item.id)}
                                >
                                    {(yAxisItemClicked === item.id || yAxisItemHovered === item.id) &&
                                        <>
                                            <span style={{
                                                marginLeft: '10rem'
                                            }}>
                                                <Typography
                                                    text={range[2] + ' ' + currName}
                                                    fontSize="12px"
                                                    fontWeight='bold'
                                                />
                                            </span>
                                        </>
                                    }
                                </Box>

                            </>
                        )
                    })} */}
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
                            {/* <Typography
                                text={(yAxisItems || [])[0]?.higherRange.toString()}
                                fontSize="12px"
                                fontWeight='bold'
                            /> */}
                        </span>
                    </Box>
                </Box>
                <Box className={styles.line}>
                </Box>
            </Box>
        </Box>
    )
}