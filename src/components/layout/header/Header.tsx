import { FC, useState } from "react";
import scss from "./Header.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { links } from "../../../constants/Link";
import logo from "../../../assets/logo.png";
import anniversary from "../../../assets/image.webp";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../../features/search/SearchSlice";
import { RootState } from "../../../store/Store";

const Header: FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.search.query);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            <form
              className={scss.search_form}
              onSubmit={(e) => {
                e.preventDefault();
                navigate(`/search/`);
              }}
            >
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
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              />
              <button
                className={scss.reset_button}
                type="reset"
                aria-label="Clear"
                onClick={() => dispatch(setSearchQuery(""))}
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
