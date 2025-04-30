import { FC, useState } from "react";
import scss from "./Header.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { links } from "../../../constants/Link";
import logo from "../../../assets/logo.png";
import anniversary from "../../../assets/image.webp";

const Header: FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <header className={scss.header}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.logo} onClick={() => navigate("/")}>
            <img src={logo} alt="logo" />
          </div>

          <nav className={`${scss.nav} ${isMenuOpen ? scss.open : ""}`}>
            <div className={scss.navHeader}>
              <div className={scss.logoMobile} onClick={() => navigate("/")}>
                <img src={anniversary} alt="LogoRight" />
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
            <form className={scss.search_form} onSubmit={handleSearchSubmit}>
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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                className={scss.reset_button}
                type="button"
                aria-label="Clear"
                onClick={() => setQuery("")}
              >
                <IoMdClose className={scss.svg} />
              </button>
            </form>

            <div className={scss.logo}>
              <img src={anniversary} alt="logoLeft" />
            </div>

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
