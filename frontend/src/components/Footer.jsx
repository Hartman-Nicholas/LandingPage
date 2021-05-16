import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer class="footer">
      <div class="grid-container-column">
        <div class="col-1-of-2">
          <div class="footer__navigation">
            <ul class="footer__list">
              <li class="footer__item">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="mailto:support@landingpage.co.se"
                  class="footer__link"
                >
                  Contact Us
                </a>
              </li>
              <li class="footer__item">
                <Link to="/guidelines" class="footer__link">
                  Guidelines
                </Link>
              </li>
              <li class="footer__item">
                <Link to="/privacy" class="footer__link">
                  Privacy policy
                </Link>
              </li>
              <li class="footer__item">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/Hartman-Nicholas/LandingPage"
                  class="footer__link"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-1-of-2">
          <p class="footer__copyright">
            Community project built during{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://novare.se/potential/software-development-academy/"
              class="footer__link"
            >
              Novares Software developement Acadamey 9.
            </a>{" "}
            In conjunction with{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.kth.se/en/itm/sda/software-development-academy-1.841849"
              class="footer__link"
            >
              KTH Royal Institute of Technology
            </a>
            . Copyright &copy; by legalAliens. This is an open source project so
            please feel free to join the community on GitHub and contribute to
            the future of a welcoming and inclusive society.
          </p>
        </div>
      </div>
    </footer>
  );
}
