import { Box } from "@mui/material";
import { Container } from "components/shared/Container";
import GlyphDetail from "components/shared/GlyphDetail";
import OnboardingHeader from "components/shared/OnboardingHeader/onboarding-header";
import RenderIf from "components/shared/RenderIf";
import { Icons } from "constant";
import useGetGlyphDetails, { IHexesDetail } from "hooks/useGetGlyphTxn";
import { useEffect, useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { useAccount } from "wagmi";

export interface GlyphDetailPageProps {
  altTxnHash?: string;
  isMapScreen: boolean;
}

const GlyphDetailPage = ({
  altTxnHash,
  isMapScreen = false,
}: GlyphDetailPageProps) => {
  const url = window.location.pathname;
  const [txnHash, setTxnHash] = useState(
    altTxnHash ? altTxnHash : url.split("/txn/")[1]
  );
  const { glphyDetails, isLoader } = useGetGlyphDetails(txnHash);
  const navigate = useNavigate();
  const { isConnected, address } = useAccount();

  useEffect(() => {
    if (isConnected && !altTxnHash) {
      navigate(`/maps/${address}`);
    }
  }, [isConnected]);

  return (
    <Container
      // backgroundColor="#1C223D"
      backgroundColor={`${altTxnHash ? "" : "#1C223D"}`}
      // opacity={`${altTxnHash ? '0.1' : '1'}`}
    >
      {altTxnHash ? (
        <Box sx={{ height: "3rem" }}></Box>
      ) : (
        <OnboardingHeader
          isSearch={true}
          isAtlasLogo={true}
          altTxnHash={altTxnHash}
          onSearchHandle={(search: string) => {
            console.log(search, "search");
            if (search.length > 0) {
              setTxnHash(search);
            }
          }}
        />
      )}

      <RenderIf isTrue={!isLoader}>
        <GlyphDetail
          {...(glphyDetails as IHexesDetail)}
          isMapScreen={isMapScreen}
          altTxnHash={altTxnHash}
        />
      </RenderIf>
      <RenderIf isTrue={isLoader}>
        <div
          style={{
            padding: "5rem 15rem",
            paddingTop: "0",
            height: "calc(100vh - 68px)",
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
          className="animate-pulse"
        >
          <img
            src={Icons.glyphDetailLoader}
            alt=""
            width={"100%"}
            height={"100%"}
          />
        </div>
      </RenderIf>
    </Container>
  );
};

export default GlyphDetailPage;
