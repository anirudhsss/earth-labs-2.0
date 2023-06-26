import { FC } from "react";
import Alert from "./Alert/Alert";
import RenderIf from "./RenderIf";

interface ITwitterConnectAlert {
  isShow: boolean;
}

const TwitterConnectAlert: FC<ITwitterConnectAlert> = ({ isShow }) => {
  return (
    <RenderIf isTrue={isShow}>
      <div
        style={{ width: "100%" }}
        className="flex justify-content-center align-items-center "
      >
        <Alert text={<span>You have successfully connected to Twitter</span>} />
      </div>
    </RenderIf>
  );
};

export default TwitterConnectAlert;
