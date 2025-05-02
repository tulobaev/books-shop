import { FC, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { DebounceInput } from "react-debounce-input";
import { links } from "../../../constants/Link";
import logo from "../../../assets/logo.png";
import anniversary from "../../../assets/image.webp";
import scss from "./Header.module.scss";
import { useSearchBooks } from "../../../features/header/UseSearchBooks";

const Header: FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { query, setQuery, filteredResults, clear } = useSearchBooks();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/search/${encodeURIComponent(trimmed)}`);
      clear();
    }
  };

  const handleSelect = (id: number) => {
    navigate(`/details/${id}`);
    clear();
  };

  return (
    <header className={scss.header}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.logo} onClick={() => navigate("/")}>
            <img src={logo} alt="Башкы логотип" />
          </div>

          <nav className={`${scss.nav} ${isMenuOpen ? scss.open : ""}`}>
            <div className={scss.navHeader}>
              <div className={scss.logoMobile} onClick={() => navigate("/")}>
                <img src={anniversary} alt="Моб. логотип" />
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className={scss.closeButton}
              >
                <IoMdClose />
              </button>
            </div>

            {links.map(({ link, title }, idx) => (
              <NavLink
                key={idx}
                to={link}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? `${scss.nav_link} ${scss.active}` : scss.nav_link
                }
              >
                {title}
              </NavLink>
            ))}
          </nav>

          <div className={scss.menu}>
            <form className={scss.search_form} onSubmit={handleSubmit}>
              <button type="submit" className={scss.search_button}>
                <CiSearch className={scss.svg} />
              </button>

              <div className={scss.searchWrapper}>
                <DebounceInput
                  className={scss.search_input}
                  type="text"
                  placeholder="Издөө..."
                  minLength={2}
                  debounceTimeout={400}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />

                {query && filteredResults.length > 0 && (
                  <ul className={scss.searchDropdown}>
                    {filteredResults.map((book) => (
                      <li key={book.id} onClick={() => handleSelect(book.id)}>
                        {book.book_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {query && (
                <button
                  type="button"
                  className={scss.reset_button}
                  onClick={clear}
                >
                  <IoMdClose className={scss.svg} />
                </button>
              )}
            </form>

            <div className={scss.logo}>
              <img src={anniversary} alt="Маараке логотип" />
            </div>

            <button
              onClick={() => setIsMenuOpen((p) => !p)}
              className={scss.burgerMenu}
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
