import { useState, useCallback, useEffect } from "react";

let logoutTimer;

const useAuth = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(null);
  const [tokenExp, setTokenExp] = useState();

  const login = useCallback((uid, token, expTime) => {
    
    setToken(token);
    setUserId(uid);

    const tokenExpTime =
      expTime || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExp(tokenExpTime);
    
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpTime.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExp(null);
    localStorage.removeItem("userData");
  }, []);

  // Keep the users signed in when reload the page
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  //Auto logout after the expire time finish
  useEffect(() => {
    if (token && tokenExp) {
      const remainingTime = tokenExp.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExp]);

  return { token, login, logout, userId };
};

export default useAuth;
