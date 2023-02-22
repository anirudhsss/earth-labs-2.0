import { Avatar, Box } from "@mui/material"
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
}

export const Header = ({
    homeLocation,
    walletLocation,
    mapsLocation,
    discoveryLocation,
    openWalletModal,
}: HeaderProps) => {


    return (
        <Container
            padding="0.5rem 2rem 0.5rem 0"
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            width='100%'
            borderBottom='0.5px solid #000000'
        >
            <Box
                className={styles.lhsHeader}
                sx={{
                    padding: walletLocation && '5px 0'
                }}
            >
                <span style={{ margin: '0 15px' }}>
                    {(mapsLocation || homeLocation || discoveryLocation) && !openWalletModal && <img
                        src='./assets/images/light_atlas.svg'
                        alt=""
                        width="75"
                        height="32"
                        style={{
                            backgroundColor: 'transparent'
                        }}
                    />}
                    {openWalletModal && <img
                        src='./assets/images/dark_atlas.svg'
                        alt=""
                        width="100"
                        height="40"
                        style={{
                            backgroundColor: 'transparent'
                        }}
                    />}
                </span>
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
                        width: '14rem'
                    }}
                >
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