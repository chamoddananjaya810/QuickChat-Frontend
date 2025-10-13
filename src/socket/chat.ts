export  interface User{
    id:number;
    firstName:string;
    lastName:string;
    countryCode:string;
    contactNo:string;
    profileImage?:string;
}

export  interface  Friend{
    id:number;
    nickName:string;
    countryCode:string;
    contactNo:string;

}

export interface Chat{

    id:number;
    message:string;
    from:User;
    to:User;
    createAt:string;
    updatedAt:string;
    status:"SENT" | "DELIVERD"  | "READ";
}

export interface WSRequest{
    type:string;
    fromUserId:number;
    toUserId?:number;
    message?:string
}

export interface WSResponse{
    type:string;
    payload:any;
} 