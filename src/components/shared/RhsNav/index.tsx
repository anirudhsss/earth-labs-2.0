import { Box, Menu, MenuItem } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../Button';
import { Typography } from '../Typography';
import styles from './styles.module.css';

export interface RhsNavProps {
    openMenu?: any;
    onOpenYearMenu?: any;
    years?: any;
    anchorEl?: any;
    onCloseYearMenu?: any;
    arrOfYears?: any;
    onValueMenuItemClicked?: any;
    onWalletBtnClickOpen?: any;
    onWalletBtnClickClose?: any;
    openWalletModal?: any;
    onMoveHexes?: any;
    coordinates?: any;
    loading1?: any;
    monthOrYear?: any;
}

export const RhsNav = ({
    openMenu,
    onOpenYearMenu,
    years,
    anchorEl,
    onCloseYearMenu,
    arrOfYears,
    onValueMenuItemClicked,
    onWalletBtnClickOpen,
    onWalletBtnClickClose,
    openWalletModal,
    onMoveHexes,
    coordinates,
    loading1,
    monthOrYear,
}: RhsNavProps) => {
    const location = useLocation();
    const homeLocation = location?.state?.icon === 'home';
    const walletLocation = location?.state?.icon === 'wallet';
    const mapsLocation = location?.state?.icon === 'maps';
    const discoveryLocation = location?.state?.icon === 'discovery';

    return (
        <Box className={styles.rhsBody}>
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
                                    text="My Atlas"
                                    fontSize="1.3rem"
                                />
                            </Button>
                        </Link>
                        {/* <Link
                            to="/wallet"
                            state={{
                                icon: 'wallet',
                            }}
                            style={{ textDecoration: 'none', }}
                        > */}
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
                                text="Wallet"
                                fontSize="1.3rem"
                            />
                        </Button>
                        {/* </Link> */}
                    </>
                }
            </Box>
            <Box className={styles.allIcons}>
                {(mapsLocation || homeLocation) && !openWalletModal && <Box className={styles.arrowsToNavigate}>
                    <div style={{
                        cursor: 'pointer', fontSize: '30px', position: 'absolute', top: '16px', left: '9px'
                    }}

                    >
                        <div onClick={() => onMoveHexes('left')}>&#8592;</div>
                    </div>
                    <div style={{
                        cursor: 'pointer', fontSize: '30px', position: 'absolute', left: '30px',
                    }}

                    >
                        <div onClick={() => onMoveHexes('up')}>&#8593;</div>
                    </div>
                    <div style={{
                        cursor: 'pointer', fontSize: '30px', position: 'absolute', top: '30px', left: '30px',
                    }}

                    >
                        <div onClick={() => onMoveHexes('down')}>&#8595;</div>
                    </div>
                    <div style={{
                        cursor: 'pointer', fontSize: '30px', position: 'absolute', top: '16px', left: '39px',
                    }}

                    >
                        <div onClick={() => onMoveHexes('right')}>&#8594;</div>
                    </div>
                </Box>}
                <Box className={styles.upperIcons}>
                    <Link
                        to="/maps"
                        state={{
                            icon: 'home',
                        }}
                    >
                        <span
                            className={styles.iconOuter}
                            style={{ backgroundColor: (homeLocation || mapsLocation || walletLocation) ? '#FE7D06' : '#FFF7EE' }}

                        >
                            <img
                                src='/assets/images/home.svg'
                                alt=""
                                className={styles.imageAsIcon}
                            />
                        </span>
                    </Link>
                    <Link
                        to="/discovery"
                        state={{
                            icon: 'discovery',
                        }}
                    >
                        <span
                            className={styles.iconOuter}
                            style={{ backgroundColor: discoveryLocation ? '#FE7D06' : '#FFF7EE' }}
                        >
                            <img
                                src='/assets/images/discovery.svg'
                                alt=""
                                className={styles.imageAsIcon}
                            />
                        </span>
                    </Link>
                </Box>
                <Box className={styles.lowerIcons}>
                    <a className={styles.iconOuter} style={{ backgroundColor: '#fff' }}>
                        <img src='/assets/images/help.svg' alt="" className={styles.imageAsIcon} />
                    </a>
                    <a href="https://twitter.com/dotearth_" target="_blank" className={styles.iconOuter} style={{ backgroundColor: '#fff' }}>
                        <img src='/assets/images/twitter.svg' alt="" className={styles.imageAsIcon} />
                    </a>
                    <a href="https://discord.com/invite/dotearth" target="_blank" className={styles.iconOuter} style={{ backgroundColor: '#fff' }}>
                        <img src='/assets/images/discord.svg' alt="" className={styles.imageAsIcon} />
                    </a>
                </Box>
                <Box className={styles.timeMenuBtn}>
                    {(mapsLocation || homeLocation) && !openWalletModal &&
                        <>
                            <Button
                                backgroundColor="#FFF7EE"
                                hoverBackgroundColor="#FFF7EE"
                                color="black"
                                boxShadow="none"
                                hoverBoxShadow="none"
                                borderRadius={`${openMenu ? '0 0 2rem 2rem' : '2rem'}`}
                                padding="5px 22px"
                                width="85px"
                                display="flex"
                                justifyContent="space-around"
                                alignItems="center"
                                border="1px solid #000"
                                borderTop={`${openMenu ? '0' : '1px solid #000'}`}
                                paddingTop={`${openMenu && '0px'}`}
                                onClick={onOpenYearMenu}
                                disabled={monthOrYear === ''}
                            >
                                {years?.length > 0 ?
                                    <Typography
                                        text={`${years[0].value}`}
                                        fontSize="13px"
                                        color={`${openMenu ? '#FE7D06' : '#000'}`}
                                    />
                                    : <Typography
                                        text="time"
                                        fontSize="13px"
                                        color={`${openMenu ? '#FE7D06' : '#000'}`}
                                    />}
                                <img
                                    src={`${openMenu ? '/assets/images/orangeTriangle.svg' : '/assets/images/blackTriangle.svg'}`}
                                    alt=""
                                    className={styles.blackTriangle}
                                />
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={openMenu}
                                onClose={onCloseYearMenu}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                PaperProps={{
                                    elevation: 0,
                                    style: {
                                        width: '85px',
                                        borderRadius: '20px 20px 0 0',
                                        backgroundColor: '#FFF7EE',
                                        border: '1px solid #000',
                                    },

                                }}
                            >
                                {arrOfYears?.map((item: any) => {
                                    return (
                                        <MenuItem
                                            key={item.month}
                                            onClick={() => onValueMenuItemClicked(item.month)}
                                            sx={{
                                                fontSize: '13px',
                                                borderBottom: '1px solid black',
                                                '&:last-child': {
                                                    borderBottom: '0px',
                                                },
                                            }}
                                        >{item.month}</MenuItem>
                                    )
                                })}
                            </Menu>
                        </>
                    }
                </Box>
            </Box>
        </Box>
    )
}