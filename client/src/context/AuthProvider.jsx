import { useCallback, useEffect, useMemo, useState } from "react";
import * as authApi from "../api/auth.js";
import { AuthContext } from "./auth-context.js";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  const refreshUser = useCallback(async () => {
    try {
      const data = await authApi.fetchCurrentUser();
      setUser(data.user ?? null);
      setStatus("ready");
    } catch {
      setUser(null);
      setStatus("ready");
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await authApi.fetchCurrentUser();
        if (cancelled) return;
        setUser(data.user ?? null);
        setStatus("ready");
      } catch {
        if (cancelled) return;
        setUser(null);
        setStatus("ready");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const signup = useCallback(async (email, password) => {
    const data = await authApi.signup(email, password);
    setUser(data.user);
    return data.user;
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await authApi.login(email, password);
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      status,
      isAuthenticated: Boolean(user),
      signup,
      login,
      logout,
      refreshUser,
    }),
    [user, status, signup, login, logout, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
