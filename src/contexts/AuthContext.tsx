import { createContext, useContext, useState, type PropsWithChildren } from 'react';

type AuthContext = {
  token: string | null;
  setToken: (value: string | null) => void;
};

const authContext = createContext<AuthContext>({
  token: null,
  setToken: () => {}
});



export function useAuthContext() {
  const aContext = useContext(authContext);

  const signIn = (token: string) => {
    aContext.setToken(token);
  };

  const signOut = () => {
    aContext.setToken(null);
  };

  return {
    token: aContext.token,
    signIn,
    signOut,
  };
}

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(null);

  const _AuthContextProvider = authContext.Provider;

  return (
    <>
      <_AuthContextProvider value={{
        token: token,
        setToken: setToken
      }}>
        {children}
      </_AuthContextProvider>
    </>
  )
}