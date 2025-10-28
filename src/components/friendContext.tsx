import { createContext, ReactNode, useContext, useState } from "react";

export interface FriendRegistationData {
  nickName: string;
  contactNo: string;
  countryCode: string;
}

interface FriendRegistationContextType {
  friendData: FriendRegistationData;
  setFriendData: React.Dispatch<React.SetStateAction<FriendRegistationData>>;
}

const FriendRegistationContext = createContext<
  FriendRegistationContextType | undefined
>(undefined);

export const FriendRegistationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [friendData, setFriendData] = useState<FriendRegistationData>({
    nickName: "",
    contactNo: "",
    countryCode: "",
  });

  return (
    <FriendRegistationContext.Provider value={{ friendData, setFriendData }}>
      {children}
    </FriendRegistationContext.Provider>
  );
};

export const useFriendRegistaion = (): FriendRegistationContextType => {
  const ctx1 = useContext(FriendRegistationContext);
  if (!ctx1) {
    throw new Error(
      "useFriendRegistation must be use within a FriendRegistationProvider"
    );
  }
  return ctx1;
};
