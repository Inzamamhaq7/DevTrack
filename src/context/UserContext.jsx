import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const defaultUser = {
  name: "Inzamam",
  role: "Developer",
};

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useLocalStorage(
    "user",
    defaultUser,
  );

  return (
    <UserContext.Provider
      value={{ user, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };