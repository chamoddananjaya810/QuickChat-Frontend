import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface WebSocketContextValue {
  socket: WebSocket | null;
  isConnected: boolean;
  userId: number;
  sendMessage: (date: any) => void;
}

const WebSocketContext = createContext<WebSocketContextValue | null>(null);

export const WebSocketProvider: React.FC<{
  children: React.ReactNode;
  userId: number;
}> = ({ children, userId }) => {
  const [isConnected, setConnected] = useState(false); // Also fixed the typo 'isConnceted'
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
if (socketRef.current && socketRef.current.readyState !== WebSocket.OPEN) {
  return
}



    const socket = new WebSocket(
      `wss://${process.env.EXPO_PUBLIC_WS_URL}/ChatApp/chat?userId=${userId}`
    );
    socketRef.current = socket;
    socket.onopen = () => {
      console.log("WebSocket conncted...");
      setConnected(true);
    };

    socket.onclose = () => {
      console.log("WebSocket disconncted...");
      setConnected(false);
    };
    socket.onerror = (error) => {
      console.log("WebSocket error:", error);
      setConnected(false);
    };
    return () => {
      socket.CLOSED;
    };
  }, [userId]);
  const sendMessage = (data: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
    }
    socketRef.current?.send(JSON.stringify({ ...data, userId }));
  };
  return (
    <WebSocketContext.Provider
      value={{ socket: socketRef.current, isConnected, userId, sendMessage }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
export const useWebSocket=()=>{
const ctx=useContext(WebSocketContext);
if (!ctx) {
  throw new Error("useWebScoket must be used inside WebSocketProvider");
}
return ctx;
}