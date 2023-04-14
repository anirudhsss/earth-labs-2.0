import { Box, Menu, MenuItem } from "@mui/material"
import data1 from 'test.json';
import { XaxisItems } from "./XaxisItems";
import { useState, useEffect, useCallback } from "react";
import { ApiRequest } from "components/utils";
import moment from "moment";
import styles from './styles.module.css';
import { useLocation } from "react-router-dom";
import { Button } from "../Button";
import { Typography } from "../Typography";

export interface XaxisProps {
    onCircleClicked: (month: any) => void;
    onDisplayMonth: (year: any) => void;
    clickedElement?: any,
    // monthOrYear?: any;
    data1?: any;
    arrOfMonths?: any;
    arrOfYears?: any;
    setArrOfYears?: any;
    matchedMonths?: any;
    setMatchedMonths?: any;
    yearViewEnabled?: any;
    setYearViewEnabled?: any;
    backgroundColor?: string;
    loading1?: any;
    hoverElementId?: number | null;
    onCircleHoverStarts: (elementId: any) => void;
    onCircleHoverEnds: (elementId: any) => void;
    range?: any;
    setChosenData?: any;
    chosenData?: any;
    openMenu?: any;
    onOpenYearMenu?: any;
    years?: any;
    anchorEl?: any;
    onCloseYearMenu?: any;
    onValueMenuItemClicked?: any;
}

export const Xaxis = ({
    onCircleClicked,
    clickedElement,
    // monthOrYear,
    onDisplayMonth,
    data1,
    arrOfMonths,
    arrOfYears,
    setArrOfYears,
    matchedMonths,
    setMatchedMonths,
    yearViewEnabled,
    setYearViewEnabled,
    backgroundColor,
    hoverElementId,
    onCircleHoverStarts,
    onCircleHoverEnds,
    range,
    setChosenData,
    chosenData,
    openMenu,
    onOpenYearMenu,
    years,
    anchorEl,
    onCloseYearMenu,
    onValueMenuItemClicked,
}: XaxisProps) => {

    // const whichDuration = monthOrYear === '' ? arrOfYears : (monthOrYear === 'year' || monthOrYear === 'month') ? arrOfMonths : [];
    const whichDuration = arrOfMonths;
    const [glyphWithMaxDimension, setGlyphWithMaxDimension] = useState<number>(0);
    const location = useLocation();
    const homeLocation = location?.state?.icon === 'home';
    const walletLocation = location?.state?.icon === 'wallet';
    const mapsLocation = location?.state?.icon === 'maps';
    const discoveryLocation = location?.state?.icon === 'discovery';
    // useEffect(() => {
    //     let nodes = document.querySelectorAll('.line');
    //     console.log('nodes', nodes);
    // }, []);

    const findMax = useCallback(() => {
        whichDuration?.map((item: any) => {
            let max = 0;
            if (Number(item.dimension) > max) {
                max = Number(item.dimension);
            }
            setGlyphWithMaxDimension(max);
        })
    }, [whichDuration]);

    useEffect(() => {
        findMax();
    }, [findMax]);

    return (
        <Box sx={{
            width: '99%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
        }}>
            <Box sx={{
                width: '90%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                marginLeft: '4vw',
            }}>
                <Box sx={{
                    borderBottom: '1px solid black',
                    width: '100%',
                    position: 'relative',
                }}
                    className="line"
                >
                    {/* <span
                        style={{
                            position: 'absolute',
                            fontSize: '1.5rem',
                            right: '-3px',
                            top: '-5px',
                        }}
                    >&#x2C3;</span> */}
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: whichDuration?.length === 1 ? 'center' : 'space-between',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 101,
                    bottom: '17.5px',
                    width: '100%',
                }}>
                    {whichDuration?.map((item: any) => {

                        return (
                            <XaxisItems
                                dimension={item.dimension}
                                month={item.month}
                                backgroundColor={backgroundColor}
                                hoverElementId={hoverElementId}
                                onCircleHoverStarts={onCircleHoverStarts}
                                onCircleHoverEnds={onCircleHoverEnds}
                                noOfGlyphs={item.noOfGlyphs}
                                onCircleClicked={onCircleClicked}
                                clickedElement={clickedElement}
                                // monthOrYear={monthOrYear}
                                onDisplayMonth={onDisplayMonth}
                                data1={data1}
                                matchedMonths={matchedMonths}
                                setMatchedMonths={setMatchedMonths}
                                yearViewEnabled={yearViewEnabled}
                                setYearViewEnabled={setYearViewEnabled}
                                range={range}
                                setChosenData={setChosenData}
                                chosenData={chosenData}
                                glyphWithMaxDimension={glyphWithMaxDimension}
                            />
                        )
                    })}
                </Box>
            </Box>
            <Box
                sx={{
                    width: '9%',
                    // position: 'absolute',
                    // right: '0',
                    // bottom: '20px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '-2vw',
                }}
            //  className={styles.timeMenuBtn}
            >
                {(mapsLocation || homeLocation) &&
                    <Box>
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
                        // disabled={monthOrYear === ''}
                        >
                            {years?.length > 0 ?
                                <Typography
                                    text={`${years[0].month}`}
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
                                style={{
                                    transform: openMenu ? '' : 'rotate(180deg)',
                                }}
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
                                // console.log('item', item.month)
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
                    </Box>
                }
            </Box>
        </Box>
    )
}
