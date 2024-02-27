import { createContext, useContext, useState } from "react";
import * as us from "../services/userService";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(us.getUser());

  const login = async (email, password) => {
    try {
      const user = await us.login(email, password);
      setUser(user);
      toast.success("Login successful");
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const logout = () => {
    us.logout();
    setUser(null);
    toast.success("Logout successful");
  };

  const register = async (data) => {
    try {
      const user = await us.register(data);
      setUser(user);
      toast.success("Register Successful");
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
