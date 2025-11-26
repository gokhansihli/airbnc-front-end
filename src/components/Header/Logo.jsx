import { Link } from "react-router";
import "./Header.css";
import LogoIcon from "../../icons/LogoIcon";

export default function Logo() {
  return (
    <div>
      <Link to="/">
        <LogoIcon />
      </Link>
    </div>
  );
}
