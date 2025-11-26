import { AuthContext } from "../contexts/AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";

export default function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage(null);
  console.log("auth user ", user);
  return <AuthContext value={{ user, setUser }}>{children}</AuthContext>;
}
