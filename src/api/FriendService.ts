// Adjust the path if necessary

import { FriendRegistationData } from "../components/friendContext";


const API = process.env.EXPO_PUBLIC_APP_URL + "/QuickChat-Backend";

/**
 * Sends new friend data to the backend controller using FormData.
 * @param friendData The friend object containing nickname, country code, and contact number.
 * @returns A promise that resolves to the server's JSON response.
 */
export const addNewFriend = async (friendData: FriendRegistationData) => {
  try {
    // ✅ Create a new FormData object
    const formData = new FormData();

    // ✅ Append the friend data to the FormData
    formData.append("nickName", friendData.nickName);
    formData.append("countryCode", friendData.countryCode);
    formData.append("contactNo", friendData.contactNo);

    // ✅ Send the request with FormData
    const response = await fetch(`${API}/FriendController`, {
      method: "POST",
      body: formData,
      headers: {
        // When sending FormData, the 'Content-Type' header is set automatically
        // with the correct boundary, so we don't set it manually.
        Accept: "application/json",
      },
    });

    const json = await response.json();

    if (response.ok) {
      return {
        status: false,
        message:
          json.message || "Oops! Could not add friend due to a server error.",
      };
    }

    return json; // { status: boolean, message: string }
  } catch (error) {
    console.error("Add new friend service error:", error);
    return {
      status: false,
      message:
        "An unexpected network error occurred. Please check your connection.",
    };
  }
};