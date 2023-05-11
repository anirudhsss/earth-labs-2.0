import { Box } from "@mui/material"
import { Container } from "components/shared/Container"
import { Typography } from "components/shared/Typography"
import styles from './styles.module.css';

export const HelpPage = () => {
    return (
        <Container
            width="100%"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            margin="1.5rem 0 0 0"
        >
            <Box
                className={styles.container}
            >
                <Box className={styles.subContainer1}>
                    <img
                        src='/assets/images/txnGlyph1.svg'
                        alt=""
                        className={styles.txnGlyph}
                    />
                </Box>
                <Box className={styles.subContainer2}>
                    <Box className={styles.iconCollection1}>
                        <Box className={styles.eachIcon}>
                            <img
                                src='/assets/images/holding.svg'
                                alt=""
                                className={styles.icons}
                            />
                            <Typography
                                text='Holding'
                                fontSize='12px'
                            />
                        </Box>
                        <Box className={styles.eachIcon}>
                            <img
                                src='/assets/images/burn.svg'
                                alt=""
                                className={styles.icons}
                            />
                            <Typography
                                text='Burn'
                                fontSize='12px'
                            />
                        </Box>
                        <Box className={styles.eachIcon}>
                            <img
                                src='/assets/images/airdrop.svg'
                                alt=""
                                className={styles.icons}
                            />
                            <Typography
                                text='Airdrop'
                                fontSize='12px'
                            />
                        </Box>
                        <Box className={styles.eachIcon}>
                            <img
                                src='/assets/images/transfer.svg'
                                alt=""
                                className={styles.icons}
                            />
                            <Typography
                                text='Transfer'
                                fontSize='12px'
                            />
                        </Box>
                        <Box className={styles.eachIcon}>
                            <img
                                src='/assets/images/mint.svg'
                                alt=""
                                className={styles.icons}
                            />
                            <Typography
                                text='Mint'
                                fontSize='12px'
                            />
                        </Box>
                    </Box>
                    <Box className={styles.iconCollection2}>
                        <Box className={styles.eachIcon}>
                            <img
                                src='/assets/images/bridge.svg'
                                alt=""
                                className={styles.icons}
                            />
                            <Typography
                                text='Bridge'
                                fontSize='12px'
                            />
                        </Box>
                        <Box className={styles.eachIcon}>
                            <img
                                src='/assets/images/stake.svg'
                                alt=""
                                className={styles.icons}
                            />
                            <Typography
                                text='Stake'
                                fontSize='12px'
                            />
                        </Box>
                        <Box className={styles.eachIcon}>
                            <img
                                src='/assets/images/swap.svg'
                                alt=""
                                className={styles.icons}
                            />
                            <Typography
                                text='Swap'
                                fontSize='12px'
                            />
                        </Box>
                        <Box className={styles.eachIcon}>
                            <img
                                src='/assets/images/joinPool.svg'
                                alt=""
                                className={styles.icons}
                            />
                            <Typography
                                text='Join Pool'
                                fontSize='12px'
                            />
                        </Box>
                        <Box className={styles.eachIcon}>
                            <img
                                src='/assets/images/leavePool.svg'
                                alt=""
                                className={styles.icons}
                            />
                            <Typography
                                text='Leave Pool'
                                fontSize='12px'
                            />
                        </Box>
                    </Box>
                    <Box className={styles.iconCollection3}>
                        <Box className={styles.eachIcon}>
                            <img
                                src='/assets/images/list.svg'
                                alt=""
                                className={styles.icons1}
                            />
                            <Typography
                                text='List'
                                fontSize='12px'
                            />
                        </Box>
                        <Box className={styles.eachIcon}>
                            <img
                                src='/assets/images/bid.svg'
                                alt=""
                                className={styles.icons}
                            />
                            <Typography
                                text='Bid'
                                fontSize='12px'
                            />
                        </Box>
                        <Box className={styles.eachIcon}>
                            <img
                                src='/assets/images/sale.svg'
                                alt=""
                                className={styles.icons}
                            />
                            <Typography
                                text='Sale'
                                fontSize='12px'
                            />
                        </Box>
                        <Box className={styles.icons}></Box>
                        <Box className={styles.icons}></Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}