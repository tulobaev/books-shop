import { FC, useState } from "react";
import scss from "./Header.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { links } from "../../../constants/Link";

const Header: FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={scss.header}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.logo} onClick={() => navigate("/")}>
            <img
              src="https://not-lain-background-removal.hf.space/file=/tmp/gradio/cc24c9e8397ed070ae266ce1a6353c7060481e74f5c466df14d0bba90f79b1df/image.webp"
              alt="Logo"
            />
          </div>

          <nav className={`${scss.nav} ${isMenuOpen ? scss.open : ""}`}>
            <div className={scss.navHeader}>
              <div className={scss.logoMobile} onClick={() => navigate("/")}>
                <img
                  src="https://not-lain-background-removal.hf.space/file=/tmp/gradio/cc24c9e8397ed070ae266ce1a6353c7060481e74f5c466df14d0bba90f79b1df/image.webp"
                  alt="Logo"
                />
              </div>
              <button
                className={scss.closeButton}
                onClick={toggleMenu}
                aria-label="Close menu"
              >
                <IoMdClose />
              </button>
            </div>
            {links.map((item, index) => (
              <NavLink
                key={index}
                to={item.link}
                className={({ isActive }) =>
                  isActive ? `${scss.nav_link} ${scss.active}` : scss.nav_link
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </NavLink>
            ))}
          </nav>

          <div className={scss.menu}>
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
                placeholder="Издөө..."
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

            <button
              className={scss.burgerMenu}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <IoMdClose /> : <RxHamburgerMenu />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
