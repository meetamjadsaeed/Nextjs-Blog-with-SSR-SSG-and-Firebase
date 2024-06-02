import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";

const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID;

const useWeb3Auth = () => {
  const [web3auth, setWeb3auth] = useState(null);
  const [FetchedUserData, setFetchedUserData] = useState(null);
  const [web3Provider, setWeb3Provider] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const rpcTarget = process.env.NEXT_PUBLIC_WEB3AUTH_RPC_TARGET;

    const initWeb3Auth = async () => {
      try {
        const web3AuthInstance = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13881",
            rpcTarget: rpcTarget,
          },
        });

        await web3AuthInstance.initModal();
        setWeb3auth(web3AuthInstance);
        if (web3AuthInstance.web3Provider)
          setWeb3Provider(web3AuthInstance.web3Provider);
      } catch (error) {
        console.error("Web3Auth initialization error:", error);
      }
    };

    initWeb3Auth();
  }, [clientId]);

  useEffect(() => {
    const check = async () => {
      if (!web3auth) return false;
      const isConnected = (await web3auth.status) === "connected";
      setIsConnected(isConnected);
    };
    check();
  }, [web3auth]);

  const handleSignUp = async () => {
    try {
      if (!web3auth) {
        console.error("Web3Auth not initialized yet");
        return;
      }
      const web3Provider = await web3auth.connect();
      setWeb3Provider(web3Provider);
      await getUserInfo();
      console.log("Login successful from Web3 OAuth");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const getUserInfo = async () => {
    try {
      if (!web3auth) {
        console.error("Web3Auth not initialized yet");
        return;
      }
      const userInfo = await web3auth.getUserInfo();
      setFetchedUserData(userInfo);
    } catch (error) {
      console.error("Error while fetching FetchedUserData info:", error);
    }
  };

  const handleLogout = async () => {
    try {
      if (!web3auth) {
        console.error("Web3Auth not initialized yet");
        return;
      }
      await web3auth.logout();
      setWeb3Provider(null);
      setFetchedUserData(null);
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  };

  return {
    handleSignUp,
    getUserInfo,
    handleLogout,
    FetchedUserData,
    web3Provider,
    isConnected,
  };
};

export default useWeb3Auth;
