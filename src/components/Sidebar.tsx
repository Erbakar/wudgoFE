// Sidebar.tsx code:
import * as React from 'react';
import { Link, type LinkProps } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useNavigationContext } from '../contexts/NavigationContext';
import routes from '../routes';

export default function () {
  const { isSidebarOpen, closeSidebar } = useNavigationContext();

  const SidebarLink = (props: LinkProps) => {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      closeSidebar();
      props.onClick && props.onClick(event);
    };

    return <Link
      {...props}
      onClick={handleClick}
    />
  };

  const { user, signOut } = useAuth();


  return (
    <>
      {/* < !--MOBILE MENU-- > */}
      <div className={`mobile-menu ${isSidebarOpen ? `open` : ``}`}>
        <div className="mobile-menu-inner">
          <div className="top ">
            <div className="close-button-ctr">
              <button className="close-button" onClick={() => closeSidebar()}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22.1673 7.47801L20.5223 5.83301L14.0007 12.3547L7.47898 5.83301L5.83398 7.47801L12.3557 13.9997L5.83398 20.5213L7.47898 22.1663L14.0007 15.6447L20.5223 22.1663L22.1673 20.5213L15.6457 13.9997L22.1673 7.47801Z"
                    fill="black" fillOpacity="0.7" />
                </svg>
              </button>
            </div>

            {/* <!-- Authenticated account header (hidden by default) --> */}
            {!!user?.token && (
              <ul className="mobile-menu-items">
                <li className="list-item">
                  <div className='info-section'>
                    <span>
                      <strong>Welcome, {user?.firstName.toString() + ' ' + user?.lastName.toString()}</strong>
                    </span>

                    <span>
                      {user?.email.toString()}
                    </span>
                  </div>
                </li>
              </ul>
            )}

            {/* <!-- Guest account header (visible by default) --> */}
            {!user?.token && (
              <ul className="mobile-menu-items">
                <li className="list-item">
                  <SidebarLink to={routes.signIn.route()}>
                    <span>
                      Sign In
                    </span>
                  </SidebarLink>
                </li>

                <li className="list-item">
                  <SidebarLink to={routes.signUp.route()}>
                    <span>
                      Create Account
                    </span>
                  </SidebarLink>
                </li>
              </ul>
            )}

            <ul className="mobile-menu-items">
              <li className="list-item">
                <SidebarLink to={routes.home.route()}>
                  <span>
                    Home
                  </span>
                </SidebarLink>
              </li>

              {!!user?.token && (
                <>
                  <li className="list-item logged-in">
                    <SidebarLink to={'#'}>
                      <span>
                        My Profile
                      </span>
                    </SidebarLink>
                  </li>
                  <li className="list-item logged-in">
                    <a href="#">
                      <span>
                        Bookings
                      </span>
                    </a>
                  </li>
                  <li className="list-item logged-in">
                    <a href="#">
                      <span>
                        Saved Places
                      </span>
                    </a>
                  </li>

                </>
              )}


              <li className="list-item logged-in">
                <a href="#">
                  <span>
                    Help Center
                  </span>
                </a>
              </li>
              <li className="list-item logged-in">
                <SidebarLink to={routes.faq.route()}>
                  <span>
                    FAQ
                  </span>
                </SidebarLink>
              </li>
              <li className="list-item logged-in">
                <SidebarLink to={routes.termsOfUse.route()}>
                  <span>
                    Terms of Use
                  </span>
                </SidebarLink>
              </li>
              <li className="list-item logged-in">
                <SidebarLink to={routes.privacyPolicy.route()}>
                  <span>
                    Privacy Policy
                  </span>
                </SidebarLink>
              </li>


              {!!user?.token && (
                <li className="list-item">
                  <a href='#' onClick={() => signOut()} >
                    <span>
                      Sign Out
                    </span>
                  </a>
                </li>
              )}

              <hr />

              <li className="list-item">
                <SidebarLink to={routes.emailConfirmation.route()}>
                  <span>
                    E-mail Confirmation
                  </span>
                </SidebarLink>
              </li>
              <li className="list-item ">
                <a href={routes.forgotPassword.route()}>
                  <span>
                    Forgot Password
                  </span>
                </a>
              </li>
              <li className="list-item ">
                <a href="./go-payment-signed.html">
                  <span>
                    Go Payment Signedin
                  </span>
                </a>
              </li>
              <li className="list-item">
                <a href="./go-payment.html">
                  <span>
                    Go Payment
                  </span>
                </a>
              </li>
              <li className="list-item">
                <a href="./room-teaser.html">
                  <span>
                    Room Teaser
                  </span>
                </a>
              </li>
              <li className="list-item">
                <a href="./search-results.html">
                  <span>
                    Search Results
                  </span>
                </a>
              </li>
              <li className="list-item">
                <a href="./search-results-map-view.html">
                  <span>
                    Search Results Map View
                  </span>
                </a>
              </li>

              <li className="list-item">
                <a href="./signup-variation-2.html">
                  <span>
                    Signup Variation 2
                  </span>
                </a>
              </li>

            </ul>
          </div>
        </div>
      </div >
      <div
        className={`page-backdrop ${isSidebarOpen ? `open` : ``}`}
        onClick={() => closeSidebar()}
      ></div>
      {/* <!--MOBILE MENU-- > */}
    </>
  );
}