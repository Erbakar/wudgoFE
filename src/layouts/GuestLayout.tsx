// GuestLayout.tsx code:
import { Outlet } from 'react-router';
import Sidebar from '../components/Sidebar';
import usePageStartScroll from '../hooks/usePageStartScroll';

export default function GuestLayout() {
  usePageStartScroll();

  return (
    <>
      <Outlet />

      <Sidebar />
    </>
  );
}