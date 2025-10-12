import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useUserRegistaion } from "../components/UserContext";
import { validateCountryCode, validatePhoneNo } from "../util/Validation";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { LinearGradient } from 'expo-linear-gradient';
import { AppColors } from '../../theme/colors';

type ContactProps = NativeStackNavigationProp<RootStack, "ContactScreen">;

// Country type එක extend කරන්න
interface ExtendedCountry extends Country {
  flag?: string;
  name?: string;
}

export default function ContactScreen() {
  const navigation = useNavigation<ContactProps>();

  const [countryCode, setCountryCode] = useState<CountryCode>("LK");
  const [country, setCountry] = useState<ExtendedCountry | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const { userData, setUserData } = useUserRegistaion();

  const [callingCode, setCallingCode] = useState("+94");
  const [phoneNo, setPhoneNo] = useState("");

  // Default country set කරන්න
  useEffect(() => {
    const defaultCountry: ExtendedCountry = {
      cca2: 'LK',
      name: 'Sri Lanka',
      flag: '🇱🇰',
      callingCode: ['+94'],
    } as ExtendedCountry;
    
    if (!country) {
      setCountry(defaultCountry);
    }
  }, []);

  return (
    <View className="flex-1">
      <StatusBar hidden={true} />
      
      {/* Gradient Background */}
      <LinearGradient
        colors={[
          AppColors.background.gradient1,
          AppColors.background.gradient2,
          AppColors.background.gradient3,
        ]}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "android" ? 100 : 100}
        className="flex-1"
      >
        <SafeAreaView className="items-center flex-1">
          <View className="items-center p-5">
            {/* Logo & Description */}
            <View className="mb-8">
              <Image
                source={require("../../assets/quick.png")}
                className="h-40 mb-4 w-36"
              />
              <Text 
                className="font-bold text-center"
                style={{ color: AppColors.text.secondary }}
              >
                We use your contacts to help you find friends who are already on
                the app. Your contacts stay private.
              </Text>
            </View>

            {/* Country Picker */}
            <View className="w-full">
              <Pressable 
                onPress={() => setShow(true)}
                style={{
                  backgroundColor: AppColors.input.background,
                  borderWidth: 2,
                  borderColor: AppColors.input.border,
                  borderRadius: 16,
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  shadowColor: AppColors.shadow.light,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 1,
                  shadowRadius: 8,
                  elevation: 2,
                  marginBottom: 16,
                }}
                className="flex-row items-center justify-center"
              >
                <Text 
                  className="mr-2 text-lg font-bold"
                  style={{ color: AppColors.text.primary }}
                >
                  {country?.flag ? String(country.flag) : '🇱🇰'} {country?.name ? String(country.name) : 'Sri Lanka'}
                </Text>
                <AntDesign 
                  name="caret-down" 
                  size={16} 
                  color={AppColors.text.primary} 
                />
              </Pressable>
              
              <CountryPicker
                countryCode={countryCode}
                withFilter
                withFlag
                withCallingCode
                withCallingCodeButton={false}
                visible={show}
                onClose={() => {
                  setShow(false);
                }}
                onSelect={(c) => {
                  setCountryCode(c.cca2);
                  setCountry(c);
                  setShow(false);
                  
                  const selectedCallingCode = Array.isArray(c.callingCode) 
                    ? c.callingCode[0] 
                    : c.callingCode;
                  
                  setCallingCode(`+${selectedCallingCode}`);
                  setUserData((previous) => ({
                    ...previous,
                    countryCode: `+${selectedCallingCode}`,
                  }));
                }}
              />
            </View>

            {/* Phone Number Inputs */}
            <View className="flex flex-row justify-center w-full mt-2">
              {/* Country Code Input */}
              <TextInput
                inputMode="tel"
                style={{
                  backgroundColor: AppColors.input.background,
                  borderWidth: 2,
                  borderColor: AppColors.input.border,
                  borderTopLeftRadius: 16,
                  borderBottomLeftRadius: 16,
                  paddingHorizontal: 12,
                  color: AppColors.input.text,
                  fontSize: 16,
                  fontWeight: '500',
                  shadowColor: AppColors.shadow.light,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 1,
                  shadowRadius: 8,
                  elevation: 2,
                }}
                className="w-1/4 h-16"
                placeholder="+94"
                placeholderTextColor={AppColors.input.placeholder}
                value={callingCode}
                onChangeText={(text) => {
                  setCallingCode(text);
                }}
              />

              {/* Phone Number Input */}
              <TextInput
                inputMode="tel"
                style={{
                  backgroundColor: AppColors.input.background,
                  borderWidth: 2,
                  borderColor: AppColors.input.border,
                  borderTopRightRadius: 16,
                  borderBottomRightRadius: 16,
                  paddingHorizontal: 12,
                  color: AppColors.input.text,
                  fontSize: 16,
                  fontWeight: '500',
                  shadowColor: AppColors.shadow.light,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 1,
                  shadowRadius: 8,
                  elevation: 2,
                  marginLeft: 8,
                }}
                className="w-3/4 h-16"
                placeholder="77 #### ###"
                placeholderTextColor={AppColors.input.placeholder}
                value={phoneNo}
                onChangeText={(text) => {
                  setPhoneNo(text);
                }}
              />
            </View>

            {/* Next Button */}
            <View className="w-full mt-6">
              <Pressable
                className="items-center justify-center"
                style={{
                  backgroundColor: AppColors.button.primaryBg,
                  borderRadius: 16,
                  paddingVertical: 14,
                  paddingHorizontal: 20,
                  shadowColor: AppColors.shadow.colored,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 1,
                  shadowRadius: 12,
                  elevation: 5,
                }}
                onPress={() => {
                  const validateCountry = validateCountryCode(callingCode);
                  const validPhoneNo = validatePhoneNo(phoneNo);
                  
                  if (validateCountry) {
                    Toast.show({
                      type: ALERT_TYPE.INFO,
                      title: "Warning",
                      textBody: validateCountry,
                    });
                  } else if (validPhoneNo) {
                    Toast.show({
                      type: ALERT_TYPE.INFO,
                      title: "Warning",
                      textBody: validPhoneNo,
                    });
                  } else {
                    setUserData((previous) => ({
                      ...previous,
                      countryCode: callingCode,
                      contactNo: phoneNo,
                    }));

                    navigation.replace("AvatarScreen");
                  }
                }}
                android_ripple={{ color: AppColors.button.primaryHover }}
              >
                <Text 
                  style={{ 
                    color: AppColors.button.primaryText,
                    fontSize: 18,
                    fontWeight: 'bold',
                    lineHeight: 24,
                  }}
                >
                  Next
                </Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}