import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const useEthToUsdcConversion = () => {
  const [ethToUsdc, setEthToUsdc] = useState<any>();
  const [ethToUsdcYvsTPercent, setEthToUsdcYvsTPercent] = useState<any>();
  const [difference, setDifference] = useState<string>("");

  useEffect(() => {
    onEthToUsdcConversion();
  }, [difference]);

  const onEthToUsdcConversion = async () => {
    const yesterday = moment().subtract(1, "days").format("DD-MM-YYYY");
    const response1 = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false&precision=0"
    );
    const response2 = await axios.get(
      "https://api.coingecko.com/api/v3/coins/ethereum/history?date=" +
        yesterday +
        "&localization=false"
    );
    if (response1 !== undefined && response2 !== undefined) {
      let ethToUsdcToday;
      // if (response1?.data?.ethereum?.usd !== undefined) {
      ethToUsdcToday = response1?.data?.ethereum?.usd;
      // }
      setEthToUsdc(ethToUsdcToday);
      let ethToUsdcYesterday;
      // if (response2?.data?.market_data?.current_price?.usd) {
      ethToUsdcYesterday = response2?.data?.market_data?.current_price?.usd;
      // }
      const difference1 = ethToUsdcToday - ethToUsdcYesterday;
      if (difference1 <= 0) {
        setDifference("increment");
      } else {
        setDifference("decrement");
      }
      const difference2 = Math.abs(difference1);
      const percent = Math.round((difference2 / ethToUsdcToday) * 100);
      setEthToUsdcYvsTPercent(percent);
    }
  };

  return { ethToUsdc, ethToUsdcYvsTPercent, difference };
};

export default useEthToUsdcConversion;
