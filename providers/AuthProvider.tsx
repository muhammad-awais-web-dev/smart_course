"use client";
import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    provider: string;
  };
  setUser: Dispatch<any>;
  loading: boolean;
  error: string[];
  clearErrors: () => void;
  token?: string;
  clearToken: () => void;
  setToken: Dispatch<string | undefined>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<
    { name: string; email: string; avatar?: string, provider: string } | undefined
  >(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string[]>([]);

  const loadTokenFromStorage = () => {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      setToken(storedToken);
    }
  };

  const fetchUserData = async (authToken: string) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5328/api/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        // Token invalid or expired
        localStorage.removeItem("auth_token");
        setToken(undefined);
      }
    } catch (err) {
      setError((prev) => [...(prev || []), "Failed to fetch user data"]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearErrors = () => {
    setError([]);
  };

  const clearToken = () => {
    localStorage.removeItem("auth_token");
    setToken(undefined);
    setUser(undefined);
  };

  useEffect(() => {
    loadTokenFromStorage();
  }, []);

  useEffect(() => {
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        clearErrors,
        loading,
        error,
        token,
        clearToken,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
