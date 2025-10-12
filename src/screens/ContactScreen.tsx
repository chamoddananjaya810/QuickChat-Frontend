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
import { useState } from "react";
// Import your CountryPicker component
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal"; // or wherever your CountryPicker comes from
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useUserRegistaion } from "../components/UserContext";
import { validateCountryCode, validatePhoneNo } from "../util/Validation";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

type ContactProps = NativeStackNavigationProp<RootStack, "ContactScreen">;
// Define the CountryItem interface
interface CountryItem {
  name: string;
  code: string;
  flag: string;
  // Add other properties as needed
}

export default function ContactScreen() {
  const navigation = useNavigation<ContactProps>();

  // const [show, setShow] = useState(false);
  // const [countryCode, setCountryCode] = useState<CountryItem | null>(null);
  const [countryCode, setCountryCode] = useState<CountryCode>("LK");
  const [country, setCountry] = useState<Country | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const { userData, setUserData } = useUserRegistaion();

  const [callingCode, setCallingCode] = useState("+94");
  const [phoneNo, setPhoneNo] = useState("");
  return (
    <SafeAreaView className="flex-1 bg-red-100 items-center">
      <StatusBar hidden={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "android" ? 100 : 100}
        className="flex-1"
      >
        <View className="p-5 items-center">
          <View className="mb-8">
            <Image
              source={require("../../assets/logo.png")}
              className="h-40 w-36 mb-4"
            />
            <Text className="text-slate-600 font-bold text-center">
              We use your contacts to help you find friends who are already on
              the app. Your contacts stay private.
            </Text>
          </View>

          <View className="w-full">
            <View className="border-b-2 border-b-green-600 justify-center items-center flex-row h-14 mb-3">
              {" "}
              <CountryPicker
                countryCode={countryCode}
                withFilter
                withFlag
                withCountryNameButton
                withCallingCode
                visible={show}
                onClose={() => {
                  setShow(false);
                }}
                onSelect={(c) => {
                  setCountryCode(c.cca2);
                  setCountry(c);
                  setShow(false);
                  setUserData((previous) => ({
                    ...previous,
                    countryCode: "+" + String(c.callingCode),
                  }));
                }}
              />
              <AntDesign name="caret-down" size={16} color="black" />
            </View>
          </View>

          <View className="mt-2 bg-red-100 flex flex-row justify-center ">
            <TextInput
              inputMode="tel"
              className="h-16  font-bold text-lg border-y-4 border-y-green-600 w-1/6 me-1"
              placeholder="+94"
              value={country ? `${country.callingCode}` : callingCode}
              onChangeText={(text) => {
                setCallingCode(text);
              }}
            />

            <TextInput
              inputMode="tel"
              className="h-16  font-bold text-lg border-y-4 border-y-green-600  w-5/6 ps-1"
              placeholder="77 #### ###"
              onChangeText={(text) => {
                setPhoneNo(text);
              }}
            />
          </View>
          <View className="mt-3">
            <Pressable
              className="justify-center items-center border-y-green-600 w-full h-14 rounded-full"
              onPress={() => {
                const validateCountry = validateCountryCode(callingCode);
                const validPhoneNo = validatePhoneNo(phoneNo);
                if (validateCountry) {
                  Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: "Warning",
                    textBody: validateCountry,
                  });
                } else if (validPhoneNo) {
                  Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: "Warning",
                    textBody: validPhoneNo,
                  });
                } else {
                  setUserData((previous) => ({
                    ...previous,
                    countryCode: country
                      ? `+${country.callingCode}`
                      : callingCode,
                    contactNo: phoneNo,
                  }));

                  navigation.replace("AvatarScreen");
                }
              }}
            >
              <Text className="text-2xl font-bold border-y-green-600">
                Next
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
