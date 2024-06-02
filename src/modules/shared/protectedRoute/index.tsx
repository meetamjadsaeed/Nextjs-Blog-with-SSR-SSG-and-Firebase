import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const authenticated = false;
  const token = "";

  // need to use token and authenticated from redux store, above are just placeholders

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
