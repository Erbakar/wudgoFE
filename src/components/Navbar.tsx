import { Link } from 'react-router';
import { useNavigationContext } from '../contexts/NavigationContext';

export default function () {
  const { openSidebar } = useNavigationContext();

  return (
    <div className="page-container navbar">
      <div className="page-container--inner">
        <div className="content">
          <div className="logo">
            <Link to={"/"}>
              <img src="./images/header-logo.png" alt="" />
            </Link>
          </div>
          <button
            className="hamburger-btn"
            onClick={() => openSidebar()}
          >
            <img src="./images/hamburger-icon.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}