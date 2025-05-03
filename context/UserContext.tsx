import { getCurrentUser } from "@/services/AuthServices.ts";
import { TLoggedInUser } from "@/types/user.types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

// User Provider Types
type TUserProvider = {
  user: TLoggedInUser | null;
  isLoading: boolean;
  setUser: (user: TLoggedInUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  contextLogout: () => void;
};

// Create Context
const UserContext = createContext<TUserProvider | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TLoggedInUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get Current User and Set
  const handleUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
    setIsLoading(false);
  };
  useEffect(() => {
    handleUser();
  }, [isLoading]);

  const contextLogout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoading, setIsLoading, contextLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Create Hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser Must be used within the UserProvider Context");
  }

  return context;
};

export default UserProvider;
