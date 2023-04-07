import { Box } from "@mui/material"
import { Container } from "components/shared/Container"
import { Typography } from "components/shared/Typography"
import styles from './styles.module.css';


export interface HelpPageProps {

}

export const HelpPage = ({

}: HelpPageProps) => {
    return (
        <Container
            width="90vw"
            height="84.5vh"
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            margin="1.5rem 0 0 2.5rem"
        >
            <Box
                className={styles.container}
            >
                <Box className={styles.subContainer1}>
                    <img
                        src='/assets/images/txnGlyph.svg'
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
                                fontSize='18px'
                                lineHeight='21px'
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
                                fontSize='18px'
                                lineHeight='21px'
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
                                fontSize='18px'
                                lineHeight='21px'
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
                                fontSize='18px'
                                lineHeight='21px'
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
                                fontSize='18px'
                                lineHeight='21px'
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
                                fontSize='18px'
                                lineHeight='21px'
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
                                fontSize='18px'
                                lineHeight='21px'
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
                                fontSize='18px'
                                lineHeight='21px'
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
                                fontSize='18px'
                                lineHeight='21px'
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
                                fontSize='18px'
                                lineHeight='21px'
                            />
                        </Box>
                    </Box>
                    <Box className={styles.iconCollection3}>
                        <Box className={styles.eachIcon}>
                            <img
                                src='/assets/images/list.svg'
                                alt=""
                                className={styles.icons}
                            />
                            <Typography
                                text='List'
                                fontSize='18px'
                                lineHeight='21px'
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
                                fontSize='18px'
                                lineHeight='21px'
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
                                fontSize='18px'
                                lineHeight='21px'
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