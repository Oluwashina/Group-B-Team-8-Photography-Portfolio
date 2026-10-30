import { useCallback, useEffect, useMemo, useState } from "react";
import * as authApi from "../api/auth.js";
import AuthModal from "../components/AuthModal.jsx";
import { AuthContext } from "./auth-context.js";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authFormKey, setAuthFormKey] = useState(0);

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

  const openAuth = useCallback((mode = "login") => {
    setAuthMode(mode);
    setAuthFormKey((key) => key + 1);
    setAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setAuthOpen(false);
  }, []);

  const switchAuthMode = useCallback(() => {
    setAuthMode((mode) => (mode === "login" ? "signup" : "login"));
    setAuthFormKey((key) => key + 1);
  }, []);

  const signup = useCallback(async (name, email, password) => {
    const data = await authApi.signup(name, email, password);
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

  const handleAuthSubmit = useCallback(
    async ({ name, email, password, mode }) => {
      if (mode === "signup") {
        await signup(name, email, password);
      } else {
        await login(email, password);
      }
    },
    [signup, login],
  );

  const value = useMemo(
    () => ({
      user,
      status,
      isAuthenticated: Boolean(user),
      signup,
      login,
      logout,
      refreshUser,
      openAuth,
      closeAuth,
    }),
    [user, status, signup, login, logout, refreshUser, openAuth, closeAuth],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal
        key={authFormKey}
        isOpen={authOpen}
        mode={authMode}
        onClose={closeAuth}
        onSubmit={handleAuthSubmit}
        onSwitchMode={switchAuthMode}
      />
    </AuthContext.Provider>
  );
}
