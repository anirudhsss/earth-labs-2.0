import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import sample from '../../sample.json';

export const isEmpty = (str: string) => !str?.length;

export const truncate = (
  fullStr: string,
  strLen: number,
  separator: string | any[]
) => {
  if (fullStr) {
    if (fullStr.length <= strLen) return fullStr;

    separator = separator || "...";

    var sepLen = separator.length,
      charsToShow = strLen - sepLen,
      frontChars = Math.ceil(charsToShow / 2) + 2,
      backChars = Math.floor(charsToShow / 2);

    return (
      fullStr.substring(0, frontChars) +
      separator +
      fullStr.substring(fullStr.length - backChars)
    );
  }
};

export const getRandomIntInclusive = (min: number, max: number) => {
  min = Math.floor(min);
  max = Math.ceil(max);
  const num = Math.random() * (max - min + 1) + min;
  return num;
};

export const AxiosFetch = (address?: string) => {
  const [apiData, setApiData] = useState<any>([]);
  const [data, setData] = useState<any>();
  const [apiLoading, setApiLoading] = useState<any>(true);
  const [apiError, setApiError] = useState<any>("");

  useEffect(() => {
    const url = `https://api.earth.domains/earthapi/dotEarth/${address ? address : "GenerateGlyphs"}`;

    fetch(url)
      .then((res) => res.json())
      .then((apiData) => {
        setApiError(apiData.apiError);
        const a = apiData[0].hexes?.map((item: any) => {
          // const a = sample[0].hexes?.map((item: any) => {
          return {
            ...item,
            targetValue1: getRandomIntInclusive(0.001, 10),
          };
        });
        setApiData(a);
        setApiLoading(false);
        setData(apiData[0]);
        // setData(sample[0]);
      })
      .catch(() => setApiLoading(false));
  }, [address]);

  return { data, data2: apiData, apiLoading, apiError };
};

export interface BackdropDuringApiLoadingProps {
  show?: Boolean;
}

export const BackdropDuringApiLoading = ({
  show,
}: BackdropDuringApiLoadingProps) => {
  const backdrop = (
    <Backdrop
      sx={{
        color: "#fff",
        // zIndex: (theme) => theme.zIndex.drawer + 1
      }}
      open
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );

  return <>{show && backdrop} </>;
};

export const CalcRange = (arr: any[]) => {
  // console.log('arr', arr);
  const parts = 4;
  const len = Math.ceil(arr.length / parts);
  // console.log('len', len);
  let arr1: any[] = [];
  let arr2: any[] = [];
  let start = 0,
    howMany = 0;

  for (let i = 0; i < parts; i++) {
    start = 0;
    howMany = len;
    arr1 = arr.splice(start, howMany);
    if (arr1?.length > 0) {
      arr2.push(arr1);
    }
    // console.log('arr2', arr2);
  }
  // console.log('arr1', arr1);
  return arr2;
}

export const OrangeHexagonIcon = <span style={{ color: '#FE7D06', fontSize: '25px', }}>&#x2B22;</span>
