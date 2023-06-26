import { useEffect, useState } from "react";

export interface IGlyphRequest {
  hexes: IHexes[];
  hexGridPageSize: number;
  dotEarthLegend: string;
  dotEarthHandle: string;
}

export interface IHexes {
  detail: IHexesDetail;
  altText: string;
  blockNumber: number;
  fillURL: string;
  guid: string;
}

export interface IHexesDetail {
  altText: string;
  blockNumber: string;
  cValue: number;
  dappName: string;
  gasPaidGwei: number;
  gasPaidUSD: number;
  glyphId: string;
  glyphLayoutId: number;
  glyphURL: string;
  refContractAddress: string;
  sAddress: string;
  sAddressAtlas: string;
  tAddress: string;
  tAddressAtlas: string;
  timeStamp: string;
  tokenCurrentSupply: number;
  tokenMaxSupply: number;
  txnHash: string;
  altTxnHash?: string;
  isMapScreen: boolean;
}

const useGetGlyphDetails = (txnId: string) => {
  const baseURL =
    "https://api.earth.domains/earthapi/dotEarth/GenerateGlyphs?input=";
  const [glphyDetails, setGlyphDetails] = useState<IHexesDetail>();
  const [isLoader, setLoader] = useState(false);

  useEffect(() => {
    if (txnId.length > 60) {
      getTxnDetails(txnId);
    }
  }, [txnId]);

  const getTxnDetails = async (txnId: string): Promise<void> => {
    setLoader(true);
    const response = await fetch(`${baseURL}${txnId}`);
    setLoader(false);
    const result: IGlyphRequest[] = await response.json();
    setGlyphDetails(result[0].hexes[0].detail);
  };

  return {
    glphyDetails,
    isLoader,
  };
};

export default useGetGlyphDetails;
