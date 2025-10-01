// AuthContext.tsx code:
import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import type { UserDto } from '../contracts/UserDto';
import { getAuthUser, removeAuthUser, setAuthUser } from '../utils/authStorage';

type AuthContextType = {
  user: UserDto | null;
  signIn: (user: UserDto) => void;
  signOut: () => void;
};

const authContext = createContext<AuthContextType | undefined>(undefined);


export function useAuth() {
  const context = useContext(authContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
}

export function AuthContextProvider({ children }: PropsWithChildren) {
  // const [token, setToken] = useState<string | null>(getAuthToken());
  const [user, setUser] = useState<UserDto | null>(getAuthUser());

  useEffect(() => {
    if (user) {
      setAuthUser(user); // Calls the function to save token and user data
    } else {
      removeAuthUser(); // Calls the function to clear both
    }
  }, [user]);

  const signIn = (newUser: UserDto) => {
    setUser(newUser);
  };

  const signOut = () => {
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    signIn,
    signOut,
  }), [user]);

  return (
    <authContext.Provider value={value}>
      {children}
    </authContext.Provider>
  );
}