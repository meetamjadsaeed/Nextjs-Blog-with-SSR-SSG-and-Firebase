// useSocket.js
import { useState, useEffect } from "react";
import socketManager from "../../services/realtime/socket.io";
import { useSelector } from "react-redux";

const useSocket = () => {
  const [socketInstance, setSocketInstance] = useState(null);

  const { authenticated, token, user } = useSelector(
    (state) => state.persistedReducer.auth
  );

  useEffect(() => {
    const socket = socketManager(token);
    setSocketInstance(socket);

    console.log(socket.socket, "Socket Instance");

    return () => {
      socket.socket.disconnect();
    };
  }, [token]);

  const emitEvent = (eventName, data) => {
    if (!socketInstance) {
      console.error("emitEvent, Socket connection is not established.");
      return;
    }

    socketInstance.emitEvent(eventName, data, (response) => {
      if (response.success) {
        console.log(`${eventName} triggered successfully`);
      } else {
        console.error(`${eventName} failed`);
      }
    });
  };

  const listenToEvent = (eventName, callback) => {
    if (!socketInstance) {
      console.error("listenToEvent, Socket connection is not established.");
      return;
    }

    console.log(socketInstance, "Socket Instance");

    socketInstance.listenToEvent(eventName, callback);
  };

  const removeEventListener = (eventName, callback) => {
    if (!socketInstance) {
      console.error(
        "removeEventListener, Socket connection is not established."
      );
      return;
    }

    console.log(socketInstance, "Socket Instance");

    socketInstance.removeEventListener(eventName, callback);
  };

  return { emitEvent, listenToEvent, removeEventListener };
};

export default useSocket;
