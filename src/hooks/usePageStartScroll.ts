import { useEffect, type DependencyList } from 'react';
import { useLocation } from 'react-router';

export default function (deps?: DependencyList) {
  const lo = useLocation();
  useEffect(() => {
    // console.log('HELLO!');
    // document.body.scrollTo(0, 0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lo.pathname, ...(deps || [])]);
}