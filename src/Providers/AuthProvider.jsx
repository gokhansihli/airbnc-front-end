import { AuthContext } from "../contexts/AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { jwtDecode } from "jwt-decode";

export default function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage(null);
  const decodedUser = user?.token
    ? { token: user.token, ...jwtDecode(user.token) }
    : null;
  console.log("auth user ", decodedUser);
  return (
    <AuthContext value={{ user: decodedUser, setUser }}>{children}</AuthContext>
  );
}
