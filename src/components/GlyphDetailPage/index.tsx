import { Box } from "@mui/material";
import { Container } from "components/shared/Container";
import GlyphDetail from "components/shared/GlyphDetail";
import OnboardingHeader from "components/shared/OnboardingHeader/onboarding-header";
import RenderIf from "components/shared/RenderIf";
import Spinner from "components/shared/Spinner/Spinner";
import TwitterConnectAlert from "components/shared/TwitterConnectAlert";
import { Icons } from "constant";
import SnackbarContext from "context/snackbar.context";
import TwitterContext from "context/twitter.context";
import useGetGlyphDetails, { IHexesDetail } from "hooks/useGetGlyphTxn";
import useTwitterFlow from "hooks/useTwitterFlow";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import { useAccount } from "wagmi";
import ReactGA from 'react-ga';
export interface GlyphDetailPageProps {
  altTxnHash?: string;
  isMapScreen: boolean;
}

const GlyphDetailPage = ({
  altTxnHash,
  isMapScreen = false,
}: GlyphDetailPageProps) => {

  useEffect(() => {
    // Track page view for the home page
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const url = window.location.pathname;
  const [txnHash, setTxnHash] = useLocalStorageState("txnHash", {
    defaultValue: altTxnHash ? altTxnHash : url.split("/txn/")[1],
  });
  const { glphyDetails, isLoader } = useGetGlyphDetails(txnHash as string);

  const navigate = useNavigate();
  const { isConnected, address } = useAccount();
  const location = useLocation();
  const { isTwitterConnectedFlagFromLandingPage, removeTwitterConnectFlag } =
    useTwitterFlow();
  const { openSnackBar } = useContext(SnackbarContext);
  const { twitterUser } = useContext(TwitterContext);
  useEffect(() => {
    if (isConnected && !altTxnHash) {
      navigate(`/maps/${address}`);
    }
  }, [isConnected]);

  useEffect(() => {
    if (isTwitterConnectedFlagFromLandingPage() && twitterUser) {
      if (openSnackBar)
        openSnackBar("Twitter is successfuly connected !", 5000);
      setTimeout(() => {
        removeTwitterConnectFlag();
      }, 5000);
    }
  }, [twitterUser]);

  // Getting the txn hash from the url and setting the state
  useEffect(() => {
    const pathName = location.pathname;
    if (pathName.includes("/txn")) {
      const pathArr = pathName.split("/txn/");
      const txnHash = pathArr[1];
      if (txnHash && txnHash.length > 0) {
        setTxnHash(txnHash);
      }
    }
  }, []);

  return (
    <Container backgroundColor={`${altTxnHash ? "" : "#1C223D"}`}>
      {altTxnHash ? (
        <Box sx={{ height: "3rem" }}></Box>
      ) : (
        <OnboardingHeader
          isSearch={true}
          isAtlasLogo={true}
          altTxnHash={altTxnHash}
          onSearchHandle={(search: string) => {
            if (search.length > 0) {
              setTxnHash(search);
            }
          }}
        />
      )}
      <RenderIf isTrue={!isLoader}>
        <>
          <GlyphDetail
            {...(glphyDetails as IHexesDetail)}
            isMapScreen={isMapScreen}
            altTxnHash={altTxnHash}
          />
        </>
      </RenderIf>
      <RenderIf isTrue={isLoader}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 75px)",
          }}
        >
          <Spinner isLoading={isLoader} />
        </div>
      </RenderIf>
    </Container>
  );
};

export default GlyphDetailPage;
