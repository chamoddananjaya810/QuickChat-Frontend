import { createContext, ReactNode, useContext, useState } from "react";

export interface UserRegistationData{
    firstName:string;
    lastName:string;
    password:string;
    contactNo:string;
    countryCode:string;
    profileImage:string|null;
}


interface UserRegistationContextType{
    userData:UserRegistationData,
    setUserData:React.Dispatch<React.SetStateAction<UserRegistationData>>;
}

const UserRegistationContext=createContext<
UserRegistationContextType|undefined
>(undefined);


export const UserRegistationProvider:React.FC<{children:ReactNode}>=({
    children,
})=>{
const [userData,setUserData]=useState<UserRegistationData>({
firstName:"",
lastName:"",
password:"",
contactNo:"",
countryCode:"",
profileImage:null,
});

return(
    <UserRegistationContext.Provider value={{userData,setUserData}}>
        {children}
    </UserRegistationContext.Provider>
);
};


export const useUserRegistaion=():UserRegistationContextType=>{

    const ctx=useContext(UserRegistationContext);
    if (!ctx) {
        throw new Error(
"userUserRegistation must be use within a userRegistationProvider"
        );
    }
    return ctx;
}