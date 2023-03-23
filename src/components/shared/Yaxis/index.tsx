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
                                            />
                                        </span>
                                    </>}
                                </Box>
                            </>
                        )
                    })}
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