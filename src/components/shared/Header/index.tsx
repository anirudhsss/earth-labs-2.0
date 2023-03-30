import { Avatar, Box } from "@mui/material"
import { Link } from "react-router-dom"
import { Button } from "../Button"
import { Container } from "../Container"
import { NormalSearchField } from "../TextField"
import { Typography } from "../Typography"
import styles from './styles.module.css'

export interface HeaderProps {
    homeLocation?: any;
    walletLocation?: any;
    mapsLocation?: any;
    discoveryLocation?: any;
    openWalletModal?: any;
    onWalletBtnClickOpen?: any;
    onWalletBtnClickClose?: any;
}

export const Header = ({
    homeLocation,
    walletLocation,
    mapsLocation,
    discoveryLocation,
    openWalletModal,
    onWalletBtnClickOpen,
    onWalletBtnClickClose,
}: HeaderProps) => {


    return (
        <Container
            padding="0.5rem 2rem 0.5rem 0"
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            width='100%'
            borderBottom='0.5px solid #000000'
            height='7.6vh'
        >
            <Box
                className={styles.lhsHeader}
                sx={{
                    padding: openWalletModal && '5px 0'
                }}
            >
                {(mapsLocation || homeLocation || discoveryLocation) && !openWalletModal &&
                    <span style={{ margin: '0 15px' }}>
                        <img
                            src='./assets/images/light_atlas.svg'
                            alt=""
                            width="75"
                            height="32"
                            style={{
                                backgroundColor: 'transparent'
                            }}
                        />
                    </span>
                }
                {openWalletModal &&
                    <span style={{ margin: '0 15px 0 8px' }}>
                        <img
                            src='./assets/images/dark_atlas.svg'
                            alt=""
                            width="95"
                            height="40"
                            style={{
                                backgroundColor: 'transparent'
                            }}
                        />
                    </span>
                }
                {(mapsLocation || homeLocation || discoveryLocation) && !openWalletModal && <NormalSearchField

                />}
                {(mapsLocation || homeLocation || discoveryLocation) && !openWalletModal && <Button
                    backgroundColor="#FE7D06"
                    color="white"
                    border="0.5px solid rgba(46, 52, 81, 0.58)"
                    hoverBackgroundColor="#FE7D06"
                    borderRadius="2rem"
                    padding="0.2rem 2.5rem"
                    margin="0 0 0 1rem"
                >
                    <Typography
                        //text={userWalletAddress === null ? 'Search' : 'Search'}
                        text="Search"
                        fontSize="1.4rem"
                    />
                </Button>}
            </Box>
            <Box>
                {/* {userWalletAddress === null ?
                    <Button
                        backgroundColor="transparent"
                        color="#000000"
                        border="0.5px solid rgba(46, 52, 81, 0.58)"
                        hoverBackgroundColor="transparent"
                        borderRadius="2rem"
                        padding="0.3rem 2.5rem"
                        //onClick={onOpenConnectWalletModal}
                    >
                        <Typography
                            text="Connect Wallet"
                            fontSize="1.3rem"
                        />
                    </Button>
                    : */}
                <div
                    // onClick={logoutWallet}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '32rem'
                    }}
                >

                    <Box className={styles.mapAndWalletBtn}>
                        {(mapsLocation || homeLocation || walletLocation) &&
                            <>
                                <Link
                                    to="/maps"
                                    state={{
                                        icon: 'maps',
                                    }}
                                    style={{ textDecoration: 'none', }}
                                >
                                    <Button
                                        backgroundColor={`${(openWalletModal) ? '#FFF7EE' : '#FE7D06'}`}
                                        color={`${(openWalletModal) ? '#000' : '#fff'}`}
                                        border="0.5px solid rgba(46, 52, 81, 0.58)"
                                        hoverBackgroundColor={`${(openWalletModal) ? '#FFF7EE' : '#FE7D06'}`}
                                        borderRadius="0.6rem"
                                        padding="0.4rem 0.2rem"
                                        width="75px"
                                        onClick={onWalletBtnClickClose}
                                    >
                                        <Typography
                                            text="Activities"
                                            fontSize="1.3rem"
                                        />
                                    </Button>
                                </Link>
                                <Button
                                    backgroundColor={`${(openWalletModal) ? '#FE7D06' : '#FFF7EE'}`}
                                    color={`${(openWalletModal) ? '#fff' : '#000'}`}
                                    border="0.5px solid rgba(46, 52, 81, 0.58)"
                                    hoverBackgroundColor={`${(openWalletModal) ? '#FE7D06' : '#FFF7EE'}`}
                                    borderRadius="0.6rem"
                                    padding="0.4rem 2rem"
                                    onClick={onWalletBtnClickOpen}
                                >
                                    <Typography
                                        text="Assets"
                                        fontSize="1.3rem"
                                    />
                                </Button>
                                {/* </Link> */}
                            </>
                        }
                    </Box>
                    {/* <Typography
                                text={truncate(userWalletAddress, 12)}
                            /> */}
                    {/* <span style={{ width: '35px' }}>
                                <img src="/assets/images/earth.svg" />
                            </span> */}
                    {/* <LogoutButton /> */}
                    <Typography
                        text="Allen.earth.eth"
                        fontSize="1.4rem"
                        color={openWalletModal ? '#fff' : '#000'}
                    />
                    <Avatar
                        alt=""
                        src="/assets/images/avatarTest.jpg"
                        sx={{
                            width: 30,
                            height: 30,
                            cursor: 'pointer',
                        }}
                    />
                </div>
                {/* } */}
            </Box>
        </Container>
    )
}