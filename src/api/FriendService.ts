import { Friend } from "../screens/NewChatScreen"; // Adjust the path if necessary

const API = process.env.EXPO_PUBLIC_APP_URL + "/QuickChat-Backend";

/**
 * Sends new friend data to the backend controller.
 * @param friendData The friend object containing nickname, country code, and contact number.
 * @returns A promise that resolves to the server's JSON response.
 */
export const addNewFriend = async (friendData: Friend) => {
  try {
    // Since we are not sending a file, we send data as JSON.
    const response = await fetch(`${API}/FriendController`, { // Assuming the endpoint is FriendController
      method: "POST",
      body: JSON.stringify(friendData),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      // If the server responds with an error status (4xx, 5xx)
      return { 
        status: false, 
        message: json.message || "Oops! Could not add friend due to a server error." 
      };
    }

    // Return the JSON response from the server { status: boolean, message: string }
    return json; 

  } catch (error) {
    console.error("Add new friend service error:", error);
    return { 
      status: false, 
      message: "An unexpected network error occurred. Please check your connection." 
    };
  }
};

