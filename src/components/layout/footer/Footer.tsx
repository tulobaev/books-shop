import logo from "../../../assets/image.webp";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.logoSection}>
            <img src={logo} alt="Logo" className={styles.logo} />
          </div>

          <div className={styles.missionSection}>
            <p>
              Биз билимди жеткиликтүү кылуу менен, ар бир адамдын окуу, изилдөө
              жана өсүү укугун колдойбуз!
            </p>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>
            <a
              href="https://x.ai"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bottomLink}
            ></a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
