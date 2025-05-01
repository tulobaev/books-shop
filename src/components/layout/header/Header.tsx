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

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/search/${encodeURIComponent(trimmed)}`);
      setQuery("");
    }
  };

  const clearQuery = () => setQuery("");

  return (
    <header className={scss.header}>
      <div className="container">
        <div className={scss.content}>
          {/* Логотип — desktop */}
          <div className={scss.logo} onClick={() => navigate("/")}>
            <img src={logo} alt="Башкы логотип" />
          </div>

          {/* Навигация — мобильное меню */}
          <nav className={`${scss.nav} ${isMenuOpen ? scss.open : ""}`}>
            <div className={scss.navHeader}>
              <div className={scss.logoMobile} onClick={() => navigate("/")}>
                <img src={anniversary} alt="Моб. логотип" />
              </div>
              <button
                className={scss.closeButton}
                onClick={toggleMenu}
                aria-label="Жабуу"
              >
                <IoMdClose />
              </button>
            </div>

            {links.map(({ link, title }, idx) => (
              <NavLink
                key={idx}
                to={link}
                className={({ isActive }) =>
                  isActive ? `${scss.nav_link} ${scss.active}` : scss.nav_link
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {title}
              </NavLink>
            ))}
          </nav>

          {/* Поиск + бургер меню */}
          <div className={scss.menu}>
            <form className={scss.search_form} onSubmit={handleSearchSubmit}>
              <button
                className={scss.search_button}
                type="submit"
                aria-label="Издөө"
              >
                <CiSearch className={scss.svg} />
              </button>

              <input
                className={scss.search_input}
                type="text"
                placeholder="Издөө..."
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              {query && (
                <button
                  className={scss.reset_button}
                  type="button"
                  aria-label="Тазалоо"
                  onClick={clearQuery}
                >
                  <IoMdClose className={scss.svg} />
                </button>
              )}
            </form>

            <div className={scss.logo}>
              <img src={anniversary} alt="Маараке логотип" />
            </div>

            <button
              className={scss.burgerMenu}
              onClick={toggleMenu}
              aria-label="Менюну ачуу"
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
