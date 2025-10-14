import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { useTheme } from "../../theme/ThemeProvider";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStack } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUserRegistaion } from "../components/UserContext";
import { validateFirstName, validateLastName } from "../util/Validation";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

type SignUpProps = NativeStackNavigationProp<RootStack, "SingUpScreen">;

export default function SingUpScreen() {
  const navigation = useNavigation<SignUpProps>();
  const { applied } = useTheme();
  const logo =
    applied === "dark"
      ? require("../../assets/quick.png")
      : require("../../assets/quick.png");
  const { userData, setUserData } = useUserRegistaion();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View className="flex-1">
      <StatusBar hidden={true} />
      <LinearGradient
        colors={["#f0f9ff", "#e0f2fe", "#bae6fd"]}
        style={{ position: "absolute", width: "100%", height: "100%" }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <SafeAreaView className="flex-1 p-5">
          {/* Logo */}
          <View className="items-center mb-6">
            <Image source={logo} className="w-32 h-28" resizeMode="contain" />
          </View>

          {/* Header Text */}
          <View className="mb-8">
            <Text
              className="text-3xl font-extrabold"
              style={{ color: "#334155" }}
            >
              Create New Account
            </Text>
            <Text className="mt-2 text-base" style={{ color: "#64748b" }}>
              Start your conversation today
            </Text>
          </View>

          {/* ScrollView for Input Fields */}
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {/* First Name Input */}
            <View className="mb-4">
              <FloatingLabelInput
                label="First Name"
                value={userData.firstName}
                onChangeText={(text) => {
                  setUserData((previous) => ({
                    ...previous,
                    firstName: text,
                  }));
                }}
                maxLength={200}
                containerStyles={{
                  backgroundColor: "#ffffff",
                  borderWidth: 2,
                  borderColor: "#e2e8f0",
                  borderRadius: 16,
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  width: "100%",
                  shadowColor: "rgba(0, 0, 0, 0.05)",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 1,
                  shadowRadius: 8,
                  elevation: 2,
                }}
                inputStyles={{
                  color: "#334155",
                  fontSize: 16,
                  fontWeight: "500",
                }}
                labelStyles={{
                  color: "#94a3b8",
                  fontSize: 14,
                }}
                customLabelStyles={{
                  colorFocused: "#3b82f6",
                  fontSizeFocused: 12,
                }}
              />
            </View>

            {/* Last Name Input */}
            <View className="mb-4">
              <FloatingLabelInput
                label="Last Name"
                maxLength={200}
                value={userData.lastName}
                onChangeText={(text) => {
                  setUserData((previous) => ({
                    ...previous,
                    lastName: text,
                  }));
                }}
                containerStyles={{
                  backgroundColor: "#ffffff",
                  borderWidth: 2,
                  borderColor: "#e2e8f0",
                  borderRadius: 16,
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  width: "100%",
                  shadowColor: "rgba(0, 0, 0, 0.05)",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 1,
                  shadowRadius: 8,
                  elevation: 2,
                }}
                inputStyles={{
                  color: "#334155",
                  fontSize: 16,
                  fontWeight: "500",
                }}
                labelStyles={{
                  color: "#94a3b8",
                  fontSize: 14,
                }}
                customLabelStyles={{
                  colorFocused: "#3b82f6",
                  fontSizeFocused: 12,
                }}
              />
            </View>

            {/* Password Input Field */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#ffffff",
                borderWidth: 2,
                borderColor: "#e2e8f0",
                borderRadius: 16,
                paddingHorizontal: 16,
                shadowColor: "rgba(0, 0, 0, 0.05)",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 1,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <FloatingLabelInput
                label="Password"
                value={userData.password}
                secureTextEntry={!isPasswordVisible}
                onChangeText={(text) => {
                  setUserData((previous) => ({
                    ...previous,
                    password: text,
                  }));
                }}
                containerStyles={{
                  flex: 1,
                  backgroundColor: "transparent",
                  paddingVertical: 16,
                  borderWidth: 0,
                }}
                inputStyles={{
                  color: "#334155",
                  fontSize: 16,
                  fontWeight: "500",
                }}
                labelStyles={{ color: "#94a3b8", fontSize: 14 }}
                customLabelStyles={{
                  colorFocused: "#3b82f6",
                  fontSizeFocused: 12,
                }}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <Ionicons
                  name={isPasswordVisible ? "eye-off" : "eye"}
                  size={24}
                  color={"#64748b"}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Next Button */}
          <View className="pb-2 mt-6">
            <Pressable
              className="items-center justify-center"
              style={{
                backgroundColor: "#3b82f6",
                borderRadius: 16,
                paddingVertical: 14,
                shadowColor: "rgba(59, 130, 246, 0.3)",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 1,
                shadowRadius: 12,
                elevation: 5,
              }}
              onPress={() => {
                let validateFirst = validateFirstName(userData.firstName);
                let validateLast = validateLastName(userData.lastName);
                let password = validateLastName(userData.password);
                if (validateFirst) {
                  Toast.show({
                    type: ALERT_TYPE.INFO,
                    title: "Warning",
                    textBody: "Please enter a valid first name",
                  });
                } else if (validateLast) {
                  Toast.show({
                    type: ALERT_TYPE.INFO,
                    title: "Warning",
                    textBody: "Please enter a valid last name",
                  });
                } else if (password) {
                  Toast.show({
                    type: ALERT_TYPE.INFO,
                    title: "Warning",
                    textBody: "Please enter a valid password",
                  });
                } else {
                  navigation.navigate("ContactScreen");
                }
              }}
              android_ripple={{ color: "#2563eb" }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Nextt
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}
