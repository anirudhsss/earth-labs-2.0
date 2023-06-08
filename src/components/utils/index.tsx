import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import sample from "../../sample.json";

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
  console.log(address, "address");
  let controller = new AbortController();
  let signal = controller.signal;
  const [apiData, setApiData] = useState<any>([]);
  const [data, setData] = useState<any>();
  const [apiLoading, setApiLoading] = useState<any>(true);
  const [apiError, setApiError] = useState<any>("");

  useEffect(() => {
    const url = `https://api.earth.domains/earthapi/dotEarth/GenerateGlyphs${
      address ? `?input=${address}` : ""
    }`;

    fetch(url, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((apiData) => {
        if (apiData.length === 0) {
          controller.abort();
          setApiError("");
          setApiData([]);
          setData({});
          setApiLoading(false);
          return;
        }
        setApiError(apiData.apiError);
        setApiData(apiData[0].hexes);
        setData(apiData[0]);
        setApiLoading(false);
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
};

export const OrangeHexagonIcon = (
  <span style={{ color: "#FE7D06", fontSize: "25px" }}>&#x2B22;</span>
);
