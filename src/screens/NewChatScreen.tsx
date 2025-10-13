import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { LinearGradient } from "expo-linear-gradient";

// --- Assuming these are your actual imports from your project structure ---
import { AppColors } from "../../theme/colors"; // Real import
import { RootStack } from "../../App"; // Real import

// --- End of assumed imports ---

// Props for navigation
type NewChatScreenProps = NativeStackNavigationProp<RootStack, "NewChatScreen">;

// Interface for the friend data object
export interface Friend {
  id?: number;
  nickName: string;
  countryCode: string;
  contactNo: string;
}

// Extend Country type from the picker library for better state management
interface ExtendedCountry extends Country {
  flag?: string;
  name?: string;
}

export default function NewChatScreen() {
  const navigation = useNavigation<NewChatScreenProps>();

  // State for form inputs
  const [nickName, setNickName] = useState("");
  const [country, setCountry] = useState<ExtendedCountry | null>(null);
  const [callingCode, setCallingCode] = useState("+94");
  const [phoneNo, setPhoneNo] = useState("");
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  // Set default country to Sri Lanka on component mount
  useEffect(() => {
    const defaultCountry: ExtendedCountry = {
      cca2: "LK",
      name: "Sri Lanka",
      flag: "🇱🇰",
      callingCode: ["94"],
    } as ExtendedCountry;
    if (!country) setCountry(defaultCountry);
  }, []);

  // Function to handle saving the new contact
  const handleSaveContact = async () => {
    // --- Input Validation ---
    if (!nickName.trim()) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Nickname Required",
        textBody: "Please enter a name for your contact.",
      });
      return;
    }
    if (!phoneNo.trim() || !callingCode.trim()) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Phone Number Required",
        textBody: "Please enter a valid phone number.",
      });
      return;
    }

    const newFriend: Friend = {
      nickName: nickName,
      countryCode: callingCode,
      contactNo: phoneNo,
    };

    try {
      setLoading(true);
      // Call the service to add the friend
      const response = await addNewFriend(newFriend);

      if (response.status) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Contact Saved!",
          textBody: `${nickName} has been added successfully.`,
        });
        navigation.goBack(); // Go back to the previous screen on success
      } else {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: "Save Failed",
          textBody: response.message || "Could not save the contact.",
        });
      }
    } catch (error) {
      console.error("Handle save contact error:", error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
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
            <ScrollView
                style={styles.flexOne}
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Wrapper for top and middle content */}
                <View>
                    <Text style={styles.title}> Add New Contact </Text>
                    {/* Nickname Input */}
                    <View style={[styles.inputContainer, { marginBottom: 16 }]}>
                        <Ionicons
                        name="person-outline"
                        size={24}
                        color={AppColors.text.secondary}
                        style={styles.icon}
                        />
                        <TextInput
                        style={styles.input}
                        placeholder="Enter Nickname"
                        placeholderTextColor={AppColors.input.placeholder}
                        value={nickName}
                        onChangeText={setNickName}
                        />
                    </View>

                    {/* Country Picker Button */}
                    <Pressable
                        onPress={() => setShowPicker(true)}
                        style={[styles.inputContainer, styles.countryPickerButton, { marginBottom: 16 }]}
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

                    {/* Phone Number Inputs */}
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
                </View>

                {/* Save Button Container */}
                <View style={styles.buttonContainer}>
                    <Pressable
                        disabled={loading}
                        style={[styles.saveButton, { opacity: loading ? 0.7 : 1 }]}
                        onPress={handleSaveContact}
                        android_ripple={{ color: AppColors.button.primaryHover }}
                    >
                        {loading ? (
                        <ActivityIndicator
                            size="small"
                            color={AppColors.button.primaryText}
                        />
                        ) : (
                        <Text style={styles.saveButtonText}>Save Contact</Text>
                        )}
                    </Pressable>
                </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

// Using StyleSheet for better performance and organization
const styles = StyleSheet.create({
  flexOne: { flex: 1 },
  gradient: { position: "absolute", width: "100%", height: "100%" },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: AppColors.text.primary,
    marginVertical: 20,
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: AppColors.input.background,
    borderWidth: 2,
    borderColor: AppColors.input.border,
    borderRadius: 16,
    paddingHorizontal: 16,
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: AppColors.shadow.light,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, color: AppColors.input.text, fontSize: 16, fontWeight: '500' },
  countryPickerButton: { justifyContent: "space-between" },
  countryText: {
    color: AppColors.text.primary,
    fontSize: 16,
    fontWeight: "500",
  },
  phoneRow: { flexDirection: "row", width: "100%" },
  callingCodeInput: {
    width: "30%",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    justifyContent: 'center',
    textAlign: 'center',
  },
  phoneInput: {
    width: "70%",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0,
  },
  buttonContainer: { width: "100%", paddingTop: 24, paddingBottom: 20 },
  saveButton: {
    backgroundColor: AppColors.button.primaryBg,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    shadowColor: AppColors.shadow.colored,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  saveButtonText: {
    color: AppColors.button.primaryText,
    fontSize: 18,
    fontWeight: "bold",
  },
});

