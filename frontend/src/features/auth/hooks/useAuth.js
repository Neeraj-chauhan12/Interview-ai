import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import {
  
  getme,
  login,
  logout,
  register,
} from "../services/AuthApi";
import { useEffect } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data?.user);
      console.log(data?.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      setUser(data?.user);
      console.log(data?.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
    const initUser = async () => {
      try {
        const data = await getme();
        setUser(data?.user);
      } catch (error) {
        // console.error("Failed to init user:", error);
        // setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initUser();
  }, []);

  return {
    user,
    loading,
    handleLogin,
    handleLogout,
    handleRegister,

  };
};
