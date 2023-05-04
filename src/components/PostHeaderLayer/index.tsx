import { Box, Menu, MenuItem } from '@mui/material';
import { Button } from 'components/shared/Button';
import { Typography } from 'components/shared/Typography';
import { AxiosFetch, truncate, isEmpty } from 'components/utils';
import useEthToUsdcConversion from 'hooks/useEthToUsdcConversion';
import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './styles.module.css';

export interface PostHeaderLayerProps {
    openMenu1?: any;
    currency?: any;
    onOpenYearMenu1?: any;
    anchorEl1?: any;
    onCloseYearMenu1?: any;
    chosenCurrency?: any;
    onValueMenuItemClicked1?: any;
    onChosingCurrency?: any;
    currName?: any;
    apiLoading?: any;
    // data?: any;
}

const PostHeaderLayer = ({
    openMenu1,
    currency,
    onOpenYearMenu1,
    anchorEl1,
    onCloseYearMenu1,
    chosenCurrency,
    onValueMenuItemClicked1,
    onChosingCurrency,
    currName,
    apiLoading,
    // data,
}: PostHeaderLayerProps) => {
    const location = useLocation();
    const homeLocation = location?.state?.icon === 'home';
    const walletLocation = location?.state?.icon === 'wallet';
    const mapsLocation = location?.state?.icon === 'maps';
    const discoveryLocation = location?.state?.icon === 'discovery';
    const { ethToUsdc, ethToUsdcYvsTPercent, difference } = useEthToUsdcConversion();
    const { data } = AxiosFetch();
    const [condition, setCondition] = useState<boolean>(false);

    const onChangeText = useCallback(() => {
        if (!isEmpty(data?.dotEarthHandle) || data?.dotEarthHandle === ('' || null)) {
            setCondition(true);
        } else {
            setCondition(false);
        }
    }, [data?.dotEarthHandle]);

    useEffect(() => {
        onChangeText();
    }, [onChangeText]);

    return (
        <>
            <Box className={styles.postHeader} sx={{ height: discoveryLocation ? '45px' : '8%' }}>
                <Box
                    className={styles.group1}
                // sx={{ justifyContent: (homeLocation || mapsLocation) ? 'flex-start' : 'flex-end', }}
                >
                    {<Box className={styles.timeMenuBtn1}
                        sx={{ width: (homeLocation || mapsLocation) ? 'auto' : '8.3rem', }}
                    >
                        {(homeLocation || mapsLocation) && <>
                            <Button
                                backgroundColor="#FFF7EE"
                                hoverBackgroundColor="#FFF7EE"
                                color="black"
                                boxShadow="none"
                                hoverBoxShadow="none"
                                borderRadius={`${openMenu1 ? '2rem 2rem 0 0' : '2rem'}`}
                                padding="5px"
                                width={`${(currency?.length > 0 || openMenu1) ? '17rem' : '8.3rem'}`}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                border="1px solid #000"
                                borderBottom={`${openMenu1 ? '0' : '1px solid #000'}`}
                                onClick={onOpenYearMenu1}
                                height="2.9rem"
                            >
                                {currency?.length > 0 ?
                                    <Typography
                                        text={`${currency}`}
                                        fontSize="13px"
                                        margin="0 5px 0 0"
                                    />
                                    : <Typography
                                        text="value"
                                        fontSize="13px"
                                        color={`${openMenu1 ? '#FE7D06' : '#000'}`}
                                        margin="0 5px 0 0"
                                    />}
                                <img
                                    src={`${openMenu1 ? '/assets/images/orangeTriangle.svg' : '/assets/images/blackTriangle.svg'}`}
                                    alt=""
                                    className={styles.blackTriangle}
                                    style={{
                                        marginTop: '2px',
                                        transform: openMenu1 ? 'rotate(180deg)' : '',
                                    }}
                                />
                            </Button>
                            <Menu
                                anchorEl={anchorEl1}
                                open={openMenu1}
                                onClose={onCloseYearMenu1}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                PaperProps={{
                                    elevation: 0,
                                    style: {
                                        width: '17rem',
                                        borderRadius: '0 0 20px 20px',
                                        backgroundColor: '#FFF7EE',
                                        border: '1px solid #000',
                                    },

                                }}
                            >
                                {/* {chosenCurrency?.map((item: any) => {
                                    return (
                                        <>
                                            <MenuItem
                                                key={item.id}
                                                onClick={() => onValueMenuItemClicked1(item.id)}
                                                sx={{
                                                    fontSize: '13px',
                                                    borderBottom: '1px solid black',
                                                    '&:last-child': {
                                                        borderBottom: '0px',
                                                    },
                                                }}
                                            >{item.value}</MenuItem>
                                        </>
                                    )
                                })} */}
                                {chosenCurrency?.map((item: any, index: number) => {
                                    return (
                                        <MenuItem
                                            key={index}
                                            onClick={() => onValueMenuItemClicked1(index)}
                                            sx={{
                                                fontSize: '13px',
                                                borderBottom: '1px solid black',
                                                '&:last-child': {
                                                    borderBottom: '0px',
                                                },
                                            }}
                                        >
                                            {`${item[0]?.toFixed(2)} - ${item[item?.length - 1]?.toFixed(2)} ${currName}`}
                                        </MenuItem>
                                    )
                                })}
                            </Menu>
                        </>}
                    </Box>}

                    {(homeLocation || mapsLocation) && <Box sx={{
                        position: 'absolute',
                        top: '55px',
                        left: '60px',
                    }}>
                        {currency?.length > 0 &&
                            <Typography
                                text={`Currently Viewing: ${currency[0].value}`}
                                fontSize="1.2rem"
                            />
                        }
                    </Box>}

                    {<Box style={{
                        width: '7rem',
                        // marginLeft: (currency?.length > 0 || openMenu1) ? '19rem' : '10rem',
                        marginLeft: '2rem',
                        display: 'flex',
                        // justifyContent: (homeLocation || mapsLocation) ? 'space-evenly' : 'flex-end',
                        justifyContent: 'space-evenly',
                    }}>
                        {(homeLocation || mapsLocation) && <>
                            <span
                                style={{ cursor: 'pointer', }}
                                onClick={() => onChosingCurrency('ETH')}
                            >
                                <Typography
                                    text="ETH"
                                    fontSize="13px"
                                    color={`${currName === 'ETH' ? '#FE7D06' : walletLocation ? '#fffdfb' : '#000'}`}
                                />
                            </span>
                            <Typography
                                text=" |"
                                fontSize="13px"
                                margin="0 5px"
                                color={`${walletLocation && '#fffdfb'}`}
                            />
                            <span
                                style={{ cursor: 'pointer', }}
                                onClick={() => onChosingCurrency('USDC')}
                            >
                                <Typography
                                    text=" USDC"
                                    fontSize="13px"
                                    color={`${currName === 'USDC' ? '#FE7D06' : walletLocation ? '#fffdfb' : '#000'}`}
                                />
                            </span>
                        </>}
                    </Box>}

                    {(homeLocation || mapsLocation || walletLocation || discoveryLocation) && !apiLoading && ethToUsdc !== undefined && difference !== undefined &&
                        <Box sx={{
                            // marginLeft: (currency?.length > 0 || openMenu1) ? '11rem' : '2rem',
                            marginLeft: '3rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <span>
                                <img
                                    src={'./assets/images/ethereum_logo.svg'}
                                    alt=''
                                    style={{
                                        width: '18px',
                                        height: '16px',
                                    }}
                                />
                            </span>
                            <span style={{
                                fontSize: '12px',
                                fontWeight: 'bold',
                                color: walletLocation ? '#fffdfb' : '#000',
                            }}>=</span>
                            <span style={{
                                marginLeft: '2px',
                            }}>
                                <Typography
                                    text={'$' + ethToUsdc}
                                    fontSize='13px'
                                    fontWeight='bold'
                                    color={`${walletLocation && '#fffdfb'}`}
                                />
                            </span>
                            <span style={{
                            }}>
                                <img
                                    src={'./assets/images/redDownArrow.svg'}
                                    alt=''
                                    style={{
                                        width: '12px',
                                        height: '12px',
                                        transform: difference === 'increment' ? '' : 'rotate(180deg)',
                                    }}
                                />
                            </span>
                            <span style={{
                                marginTop: difference === 'increment' ? '0' : '5px',
                            }}>
                                <Typography
                                    text={ethToUsdcYvsTPercent + '%'}
                                    fontSize='9px'
                                    fontWeight='bold'
                                    color="#EA1313"
                                />
                            </span>
                        </Box>}
                </Box>
                <Box className={styles.group2}>
                    {(homeLocation || mapsLocation || walletLocation) && data?.dotEarthHandle && <Box className={styles.earthIdContainer}>
                        <Box className={styles.earthIdContainerChild}>
                            {condition && <img
                                src='/assets/images/favicon.svg'
                                alt=''
                                width='20'
                                height='20'
                            />}
                            {condition ? <Typography
                                text={`${data?.dotEarthHandle}`}
                                fontWeight='700'
                                fontSize='1.3rem'
                                color={`${(homeLocation || mapsLocation) ? '#163A70' : walletLocation ? '#fffdfb' : ''}`}
                            /> :
                                <span style={{
                                    fontWeight: '700',
                                    fontSize: '1.3rem',
                                    color: (homeLocation || mapsLocation) ? '#163A70' : walletLocation ? '#fffdfb' : ''

                                }}>{truncate(data?.targetAddress, 12, '....')}</span>}
                            <img
                                src='/assets/images/👀.svg'
                                alt=''
                            />
                        </Box>
                    </Box>}
                </Box>
                {!discoveryLocation && <Box
                    className={styles.group3}
                >
                    <Box sx={{
                        // height: '10vh',
                        width: '16.3rem',
                        // paddingTop: '2rem',
                    }}
                    >
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <Link
                                to="/maps"
                                state={{
                                    icon: 'maps',
                                }}
                                style={{ textDecoration: 'none', }}
                            >
                                <Button
                                    backgroundColor={`${(mapsLocation || homeLocation) ? '#FE7D06' : '#FFF7EE'}`}
                                    color={`${(mapsLocation || homeLocation) ? '#fff' : '#000'}`}
                                    border="0.5px solid rgba(46, 52, 81, 0.58)"
                                    hoverBackgroundColor={`${(mapsLocation || homeLocation) ? '#FE7D06' : '#FFF7EE'}`}
                                    borderRadius="0.5rem"
                                    padding="0.4rem 0.2rem"
                                    width="75px"
                                >
                                    <Typography
                                        text="Activities"
                                        fontSize="1.3rem"
                                    />
                                </Button>
                            </Link>
                            <Link
                                to="/wallet"
                                state={{
                                    icon: 'wallet'
                                }}
                                style={{ textDecoration: 'none', }}
                            >
                                <Button
                                    backgroundColor={`${(walletLocation) ? '#FE7D06' : '#FFF7EE'}`}
                                    color={`${(walletLocation) ? '#fff' : '#000'}`}
                                    border="0.5px solid rgba(46, 52, 81, 0.58)"
                                    hoverBackgroundColor={`${(walletLocation) ? '#FE7D06' : '#FFF7EE'}`}
                                    borderRadius="0.5rem"
                                    padding="0.4rem 1.8rem"
                                    margin="0 0 0 10px"
                                >
                                    <Typography
                                        text="Assets"
                                        fontSize="1.3rem"
                                    />
                                </Button>
                            </Link>
                        </Box>
                        {/* } */}
                    </Box>
                </Box>}
            </Box>
        </>
    )
}

export default PostHeaderLayer;
