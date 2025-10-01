import { Link } from 'react-router';
import routes from '../routes';

export default function () {
  return (
    <>
      {/* < !--FOOTER START-- > */}
      <div className="page-container footer">
        <div className="page-container--inner">
          <div className="footer-links-item">
            <h5>
              Explore Wudgo
            </h5>

            <ul>
              <li>
                <a href="#">
                  Wudgo account
                </a>
              </li>
              <li>
                <a href="#">
                  My Places
                </a>
              </li>
              <li>
                <a href="#">
                  Populer Destinations
                </a>
              </li>
              <li>
                <a href="#">
                  Best places to eat?
                </a>
              </li>
              <li>
                <a href="#">
                  Looking for fun?
                </a>
              </li>
              <li>
                <a href="#">
                  Let’s socialize
                </a>
              </li>
              <li>
                <a href="#">
                  First Wudgo experience
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-links-item">
            <h5>
              About Wudgo
            </h5>

            <ul>
              <li>
                <a href="#">
                  Experience for students
                </a>
              </li>
              <li>
                <a href="#">
                  Partners information
                </a>
              </li>
              <li>
                <Link to={routes.faq.route()}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-links-item">
            <h5>
              Transperancy
            </h5>
            <ul>
              <li>
                <a href={routes.termsOfUse.route()}>
                  Terms of use
                </a>
              </li>
              <li>
                <a href={routes.privacyPolicy.route()}>
                  Privacy policy
                </a>
              </li>
              <li>
                <a href={routes.siteMap.route()}>
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-links-item">
            <h5>
              Contact
            </h5>
            <ul>
              <li>
                <a href="#">
                  info@wudgo.com
                </a>
              </li>
            </ul>
            <h5>
              Address
            </h5>
            <ul>
              <li>
                <a href="#">
                  592, 1007 N Orange St. 4th Floor , Wilmington, DE, New Castle, US, 19801
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <!--FOOTER END-- > */}
    </>
  );
}