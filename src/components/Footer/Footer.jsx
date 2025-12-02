import GithubIcon from "../../icons/GithubIcon";
import "./footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>{year} Gokhan Sihli</p>
      <a
        href={"https://github.com/gokhansihli"}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub Profile"
      >
        <GithubIcon />
      </a>
      <br />
      <a
        href="https://airbnc-b0sn.onrender.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        To see backend API, click here
      </a>
    </footer>
  );
}
