import React, { useState, useEffect } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";

// --- Mock Data and Types (to make the component self-contained for display) ---
// In your actual app, you would import AppColors from '../../theme/colors'
const AppColors = {
  background: {
    gradient1: "#f0f9ff",
    gradient2: "#e0f2fe",
    gradient3: "#bae6fd",
  },
  text: { primary: "#334155", secondary: "#64748b" },
  input: {
    background: "#ffffff",
    border: "#e2e8f0",
    placeholder: "#94a3b8",
    text: "#334155",
  },
  button: {
    primaryBg: "#3b82f6",
    primaryText: "#ffffff",
    primaryHover: "#2563eb",
  },
  shadow: { light: "rgba(0, 0, 0, 0.05)", colored: "rgba(59, 130, 246, 0.3)" },
};

// Define a placeholder RootStackParamList for navigation types
type RootStack = {
  SignInScreen: undefined;
  SingUpScreen: undefined;
  HomeScreen: undefined;
};
// --- End of assumed imports and types ---

type SignInProps = NativeStackNavigationProp<RootStack, "SignInScreen">;

interface ExtendedCountry extends Country {
  flag?: string;
  name?: string;
}

export default function SignInScreen() {
  const navigation = useNavigation<SignInProps>();

  // State for form inputs
  const [country, setCountry] = useState<ExtendedCountry | null>(null);
  const [callingCode, setCallingCode] = useState("+94");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Set default country on component mount
  useEffect(() => {
    const defaultCountry: ExtendedCountry = {
      cca2: "LK",
      name: "Sri Lanka",
      flag: "🇱🇰",
      callingCode: ["94"],
    } as ExtendedCountry;
    if (!country) setCountry(defaultCountry);
  }, []);

  const handleSignIn = () => {
    // --- Placeholder for Sign In Logic ---
    console.log("Signing in with:", { callingCode, phoneNo, password });
    navigation.replace("HomeScreen");
  };

  return (
    <View style={styles.flexOne}>
      <StatusBar hidden={true} />

      <LinearGradient
        colors={[
          AppColors.background.gradient1,
          AppColors.background.gradient2,
          AppColors.background.gradient3,
        ]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flexOne}
      >
        <SafeAreaView style={styles.flexOne}>
          {/* Use ScrollView to handle content that might overflow and for keyboard issues */}
          <ScrollView
            style={styles.flexOne}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Wrapper for top and middle content */}
            <View>
              {/* Logo */}
              <View style={styles.logoContainer}>
                <Image
                  source={{
                    uri: "https://placehold.co/128x112/bae6fd/334155?text=Logo&font=sans",
                  }}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>

              {/* Header Text */}
              <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Welcome Back!</Text>
                <Text style={styles.headerSubtitle}>
                  Sign in to your account
                </Text>
              </View>

              {/* Input Fields */}
              <View>
                <Pressable
                  onPress={() => setShowPicker(true)}
                  style={[styles.inputContainer, styles.countryPickerButton]}
                >
                  <Text style={styles.countryText}>
                    {country?.flag ? String(country.flag) : "🇱🇰"}{" "}
                    {country?.name ? String(country.name) : "Sri Lanka"}
                  </Text>
                  <Ionicons
                    name="caret-down"
                    size={16}
                    color={AppColors.text.primary}
                  />
                </Pressable>

                <CountryPicker
                  countryCode={(country?.cca2 as CountryCode) || "LK"}
                  withFilter
                  withFlag
                  withCallingCode
                  visible={showPicker}
                  onClose={() => setShowPicker(false)}
                  onSelect={(c) => {
                    const selectedCallingCode = Array.isArray(c.callingCode)
                      ? c.callingCode[0]
                      : c.callingCode;
                    setCountry(c);
                    setCallingCode(`+${selectedCallingCode}`);
                    setShowPicker(false);
                  }}
                />

                <View style={styles.phoneRow}>
                  <TextInput
                    style={[styles.inputContainer, styles.callingCodeInput]}
                    value={callingCode}
                    editable={false}
                  />
                  <TextInput
                    style={[styles.inputContainer, styles.phoneInput]}
                    placeholder="77 123 4567"
                    placeholderTextColor={AppColors.input.placeholder}
                    keyboardType="phone-pad"
                    value={phoneNo}
                    onChangeText={setPhoneNo}
                  />
                </View>

                <View style={[styles.inputContainer, styles.passwordContainer]}>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={AppColors.input.placeholder}
                    secureTextEntry={!isPasswordVisible}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    <Ionicons
                      name={isPasswordVisible ? "eye-off" : "eye"}
                      size={24}
                      color={AppColors.text.secondary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Wrapper for bottom content (button and footer) */}
            <View style={styles.buttonWrapper}>
              <Pressable
                style={styles.button}
                onPress={handleSignIn}
                android_ripple={{ color: AppColors.button.primaryHover }}
              >
                {/* Sign In -> පිවිසෙන්න */}
                <Text style={styles.buttonText}>පිවිසෙන්න</Text>
              </Pressable>

              <View style={styles.footer}>
                {/* Don't have an account? -> ගිණුමක් නැද්ද? */}
                <Text style={styles.footerText}>ගිණුමක් නැද්ද? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SingUpScreen")}
                >
                  {/* Sign Up -> ලියාපදිංචි වන්න */}
                  <Text style={styles.footerLink}>ලියාපදිංචි වන්න</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  flexOne: { flex: 1 },
  gradient: { position: "absolute", width: "100%", height: "100%" },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between", // Pushes content and button apart
    paddingHorizontal: 20,
  },
  logoContainer: { alignItems: "center", paddingTop: 20, marginBottom: 24 },
  logo: { width: 128, height: 112 },
  headerContainer: { marginBottom: 32 },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: AppColors.text.primary,
  },
  headerSubtitle: {
    fontSize: 16,
    color: AppColors.text.secondary,
    marginTop: 8,
  },
  inputContainer: {
    backgroundColor: AppColors.input.background,
    borderWidth: 2,
    borderColor: AppColors.input.border,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: AppColors.shadow.light,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  countryPickerButton: { justifyContent: "space-between", marginBottom: 16 },
  countryText: {
    color: AppColors.text.primary,
    fontSize: 16,
    fontWeight: "500",
  },
  phoneRow: { flexDirection: "row", width: "100%", marginBottom: 16 },
  callingCodeInput: {
    width: "30%",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    justifyContent: "center",
  },
  phoneInput: {
    width: "70%",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0,
  },
  passwordContainer: { justifyContent: "space-between" },
  input: {
    flex: 1,
    color: AppColors.input.text,
    fontSize: 16,
    fontWeight: "500",
  },
  buttonWrapper: { paddingTop: 24, paddingBottom: 20 },
  button: {
    backgroundColor: AppColors.button.primaryBg,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: AppColors.shadow.colored,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  buttonText: {
    color: AppColors.button.primaryText,
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 24 },
  footerText: { fontSize: 14, color: AppColors.text.secondary },
  footerLink: {
    fontSize: 14,
    color: AppColors.button.primaryBg,
    fontWeight: "bold",
  },
});