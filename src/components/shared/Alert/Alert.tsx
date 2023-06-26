import { FC } from "react";

interface IAlert {
  color?: string;
  text: JSX.Element;
  icon?: string;
  textColor?: string;
  height?: string;
  padding?: string;
}

const Alert: FC<IAlert> = ({
  color = "#C1C9DB",
  text,
  icon,
  textColor = "#163A70",
  height,
  padding = "0.7rem 8rem",
}) => {
  return (
    <div
      style={{
        borderRadius: "10px",
        backgroundColor: color,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        padding,
        marginTop: "3rem",
        gap: "2rem",
        alignItems: "center",
        height,
        textAlign:'center'
      }}
      className="flex flex-row"
    >
      <span
        style={{
          color: textColor,
          width:'100%',
          fontSize: "1.6rem",
          textAlign : 'center'
        }}
      >
        {text}
      </span>
      {icon ? <img src={icon as string} alt={"icon"} /> : null}
    </div>
  );
};

export default Alert;
