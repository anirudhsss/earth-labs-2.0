import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { ApiUrl } from "../../constant";

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
      frontChars = Math.ceil(charsToShow / 2),
      backChars = Math.floor(charsToShow / 2);

    return (
      fullStr.substr(0, frontChars) +
      separator +
      fullStr.substr(fullStr.length - backChars)
    );
  }
};

export const ApiRequest = async () => {
  try {
    const response = await axios.get(
      "https://api.earth.domains/earthapi/dotEarth/GenerateMap?address=0x1E815a8188F1b84564577C1c998f7E6B4706B752"
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const AxiosFetch = () => {
  const [apiData, setApiData] = useState<any>([]);
  const [data, setData] = useState<any>();
  const [apiLoading, setApiLoading] = useState<any>(true);
  const [apiError, setApiError] = useState<any>("");

  useEffect(() => {
    const url =
      "https://api.earth.domains/earthapi/dotEarth/GenerateMap?address=0x1E815a8188F1b84564577C1c998f7E6B4706B752";

    fetch(url)
      .then((res) => res.json())
      .then((apiData) => {
        setApiError(apiData.apiError);
        const a = apiData[0].hexes?.map((item: any) => ({ ...item, targetValue1: Math.random() }));
        setApiData(a);
        setApiLoading(false);
        setData(apiData[0]);
      })
      .catch(() => setApiLoading(false));
  }, []);

  return { data, data1: apiData, apiLoading, apiError };
};

export interface BackdropDuringApiLoadingProps {
  show?: Boolean;
}

export const BackdropDuringApiLoading = ({ show }: BackdropDuringApiLoadingProps) => {
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
