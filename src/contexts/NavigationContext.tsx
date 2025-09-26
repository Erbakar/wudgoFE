import { createContext, useContext, useState, type PropsWithChildren } from 'react';

type NavigationContext = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
};

const navigationContext = createContext<NavigationContext>({
  isSidebarOpen: false,
  setIsSidebarOpen: () => { }
});



export function useNavigationContext() {
  const navContext = useContext(navigationContext);

  const openSidebar = () => {
    navContext.setIsSidebarOpen(true);
  };
  
  const closeSidebar = () => {
    navContext.setIsSidebarOpen(false);
  };

  return {
    isSidebarOpen: navContext.isSidebarOpen,
    openSidebar,
    closeSidebar,
  };
}

export function NavigationContextProvider({ children }: PropsWithChildren) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const _NavigationContextProvider = navigationContext.Provider;

  return (
    <>
      <_NavigationContextProvider value={{
        isSidebarOpen: isSidebarOpen,
        setIsSidebarOpen: setIsSidebarOpen
      }}>
        {children}
      </_NavigationContextProvider>
    </>
  )
}