import { FC } from "react";

interface IAlert {
  color?: string;
  text: string;
  icon?: string;
  textColor?: string;
}

const Alert: FC<IAlert> = ({
  color = "#C1C9DB",
  text,
  icon,
  textColor = "#163A70",
}) => {
  return (
    <div
      style={{
        borderRadius: "10px",
        backgroundColor: color,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        padding: '0.7rem 8rem',
        marginTop : '3rem',
        gap : '2rem'
      }}
      className="flex flex-row"
    >
      <span
        style={{
          color: textColor,
          fontSize : '1.6rem'
        }}
      >
        {text}
      </span>
      {icon ? <img src={icon as string} alt={"icon"} /> : null}
    </div>
  );
};

export default Alert;
