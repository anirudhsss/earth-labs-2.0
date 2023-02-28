import { Box } from '@mui/material';
import { Typography } from '../Typography';
import { YaxisItems } from './YaxisItems';
import styles from './styles.module.css';

export interface YaxisProps {

}

export const Yaxis = ({

}: YaxisProps) => {


    return (
        <Box className={styles.container}>
            <Box className={styles.groupOfCircles}>
                <Box
                    className={styles.circle1}
                    sx={{
                        '&::after': {
                            content: '"0.5"',
                            margin: '8px 0 0 40px',
                            fontSize: '15px',
                            display: 'inline-block',
                            color: '#FE7D06',
                        }
                    }}
                >
                    <img src={'./assets/images/ethereum-logo.svg'} alt=""
                        style={{ position: 'absolute', left: '60px', width: '16px', top: '9px' }}
                    />
                </Box>
                {/* <Box className={styles.circle2}></Box> */}
            </Box>
            <Box className={styles.line}></Box>
        </Box>
    )
}