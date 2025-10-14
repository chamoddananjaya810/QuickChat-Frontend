import { UserRegistationData } from "../components/UserContext";

const API = process.env.EXPO_PUBLIC_APP_URL + "/QuickChat-Backend";

export const createNewAccount = async (userData: UserRegistationData) => {
  try {
    const formData = new FormData();

    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    formData.append("countryCode", userData.countryCode); // ✅ fixed typo ("contryCode")
    formData.append("contactNo", userData.contactNo);
    formData.append("password", userData.password);

    // ✅ Ensure image is properly formatted for React Native
    if (userData.profileImage) {
      formData.append("profileImage", {
        uri: userData.profileImage,
        name: "profile.png",
        type: "image/png",
      } as any);
    }

    const response = await fetch(`${API}/UserController`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response.ok) {
      return "Oops! Account creation failed (Network error)";
    }

    const json = await response.json();

    if (json.status) {
      return json; // ✅ success response
    } else {
      return json.message || "Account creation failed.";
    }
  } catch (error) {
    console.error("Account creation error:", error);
    return " An unexpected error occurred.";
  }
};
