import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import usePageStartScroll from '../hooks/usePageStartScroll';

export default function DefaultLayout() {
  usePageStartScroll();

  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />

      <Sidebar />
    </>
  );
}