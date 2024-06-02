import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { authenticated, token, user } = useSelector(
    (state) => state.persistedReducer.auth
  );

  useEffect(() => {
    if (!authenticated && !token) {
      handleRedirectToLogin();
    }
  }, [authenticated, token, router]);

  function handleRedirectToLogin() {
    // handleShowToast();

    localStorage.clear();
    localStorage.setItem("redirectUrl", router.asPath);

    router.push("/");
  }

  if (!token) {
    router.push("/");
    return;
  }

  // Render children
  return children;
};

export default ProtectedRoute;
