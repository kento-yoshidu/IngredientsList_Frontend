import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../styles/footer.module.css"

const Footer = () => (
  <footer className={styles.footer}>
    <a
      href="https://github.com/kento-yoshidu/IngredientsList_Frontend"
      target="_blank"
      rel="noreferrer"
    >
      <FontAwesomeIcon
        icon={faGithub}
        aria-label="GitHubリポジトリへのリンク"
      />
    </a>
  </footer>
)

export default Footer
