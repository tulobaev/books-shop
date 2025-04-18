import { FC } from "react";
import scss from "./Header.module.scss";
import { Link } from "react-router-dom";
import { links } from "../../../constants/Link";

const Header: FC = () => {
  return (
    <header className={scss.header}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.logo}>
            <img
              src="https://img.pikbest.com/png-images/20241016/classic-book-logo-vector-illustration_10968775.png!w700wp"
              alt="Logo"
            />
          </div>

          <nav className={scss.nav}>
            {links.map((item, index) => (
              <Link className={scss.nav_link} key={index} to={item.link}>
                {item.title}
              </Link>
            ))}
          </nav>

          <form className={scss.search_form}>
            <button
              className={scss.search_button}
              type="submit"
              aria-label="Search"
            >
              <svg
                width="18"
                height="18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 14a6 6 0 100-12 6 6 0 000 12zm4.586-2.586l2.5 2.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <input
              className={scss.search_input}
              placeholder="Издоо..."
              type="text"
              required
            />
            <button
              className={scss.reset_button}
              type="reset"
              aria-label="Clear"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
