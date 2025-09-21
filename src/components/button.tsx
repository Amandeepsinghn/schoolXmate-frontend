import { Link } from "react-router-dom";

interface button {
  label: string;
  color: string;
}

export function Button({ label, color }: button) {
  const bgColor =
    color === "green"
      ? "bg-[#65E32F]"
      : color === "gray"
      ? "bg-gray-200"
      : "bg-white";

  const hoverColor =
    color === "green"
      ? "hover:bg-[#80EE5A]"
      : color === "gray"
      ? "hover:bg-gray-100"
      : "";

  const linkTo =
    label === "Sign Up" ? "/signup" : label === "Log In" ? "/login" : "";

  return (
    <Link
      type="button"
      className={` text-black ${bgColor} p-3 rounded-lg font-bold px-9 cursor-pointer ${hoverColor}`}
      to={linkTo}
    >
      {label}
    </Link>
  );
}
