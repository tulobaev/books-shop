import { FC } from "react";
import scss from "./Header.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { links } from "../../../constants/Link";
import { IoMdClose } from "react-icons/io";

const Header: FC = () => {
  const navigate = useNavigate();
  return (
    <header className={scss.header}>
      <div className="container">
        <div className={scss.content}>
          <div onClick={() => navigate("/")} className={scss.logo}>
            <img
              src="https://img.pikbest.com/png-images/20241016/classic-book-logo-vector-illustration_10968775.png!w700wp"
              alt="Logo"
            />
          </div>

          <nav className={scss.nav}>
            {links.map((item, index) => (
              <NavLink
                key={index}
                to={item.link}
                className={({ isActive }) =>
                  isActive ? `${scss.nav_link} ${scss.active}` : scss.nav_link
                }
              >
                {item.title}
              </NavLink>
            ))}
          </nav>

          <form className={scss.search_form}>
            <button
              className={scss.search_button}
              type="submit"
              aria-label="Search"
            >
              <CiSearch className={scss.svg} />
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
              <IoMdClose className={scss.svg} />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
