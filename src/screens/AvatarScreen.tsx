import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from 'expo-linear-gradient';
import { AppColors } from '../../theme/colors';

import { useState } from "react";
import { useUserRegistaion } from "../components/UserContext";
import { validateProfileImage } from "../util/Validation";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { createNewAccount } from "../api/UseService";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";

type AvataScreenProps = NativeStackNavigationProp<RootStack, "AvatarScreen">;

export default function AvatarScreen() {
  const navigation = useNavigation<AvataScreenProps>();
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState<string | null>(null);
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState<number | null>(null);

  const pickerImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setSelectedAvatarIndex(null);
      setUserData((prevoius) => ({
        ...prevoius,
        profileImage: result.assets[0].uri,
      }));
    }
  };

  const avatars = [
    require("../../assets/avatar/avatar_2.png"),
    require("../../assets/avatar/avatar_3.png"),
    require("../../assets/avatar/avatar_4.png"),
    require("../../assets/avatar/avatar_5.png"),
    require("../../assets/avatar/avatar_6.png"),
  ];

  const { userData, setUserData } = useUserRegistaion();

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

      <SafeAreaView className="items-center justify-between flex-1">
        <View className="items-center justify-center flex-1 px-5 pt-5">
          {/* Logo */}
          <View className="mb-6">
            <Image
              source={require("../../assets/quick.png")}
              className="w-24 h-28"
            />
          </View>

          {/* Title */}
          <Text 
            className="px-4 mb-6 text-base font-semibold text-center"
            style={{ color: AppColors.text.secondary }}
          >
            Choose a profile image or an avatar
          </Text>

          {/* Profile Image Picker */}
          <View className="items-center mb-6">
            <Pressable
              style={{
                height: 160,
                width: 160,
                borderRadius: 80,
                backgroundColor: AppColors.input.background,
                borderWidth: 3,
                borderColor: AppColors.input.border,
                borderStyle: image ? 'solid' : 'dashed',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: AppColors.shadow.light,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 8,
              }}
              onPress={pickerImage}
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{
                    height: 154,
                    width: 154,
                    borderRadius: 77,
                  }}
                />
              ) : (
                <View className="items-center">
                  <Text 
                    className="text-4xl font-bold"
                    style={{ color: AppColors.text.primary }}
                  >
                    +
                  </Text>
                  <Text 
                    className="mt-1 text-sm font-semibold"
                    style={{ color: AppColors.text.primary }}
                  >
                    Add Photo
                  </Text>
                </View>
              )}
            </Pressable>
          </View>

          {/* Avatar Selection */}
          <View className="items-center w-full">
            <Text 
              className="mb-4 text-sm font-semibold"
              style={{ color: AppColors.text.secondary }}
            >
              Or select an avatar
            </Text>
            
            <View style={{ height: 110 }}>
              <FlatList
                data={avatars}
                horizontal
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      const imageUri = Image.resolveAssetSource(item).uri;
                      setImage(imageUri);
                      setSelectedAvatarIndex(index);
                      setUserData((previous) => ({
                        ...previous,
                        profileImage: imageUri,
                      }));
                    }}
                    style={{
                      marginHorizontal: 6,
                      borderRadius: 45,
                      backgroundColor: AppColors.input.background,
                      borderWidth: selectedAvatarIndex === index ? 3 : 2,
                      borderColor: selectedAvatarIndex === index 
                        ? AppColors.button.primaryBg 
                        : AppColors.input.border,
                      padding: 6,
                      shadowColor: AppColors.shadow.light,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.3,
                      shadowRadius: 6,
                      elevation: 3,
                    }}
                  >
                    <Image
                      source={item}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                      }}
                    />
                  </TouchableOpacity>
                )}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        </View>

        {/* Create Account Button - Fixed at Bottom */}
        <View className="w-full px-6 pb-6">
          <Pressable
            disabled={loading}
            className="items-center justify-center"
            style={{
              backgroundColor: AppColors.button.primaryBg,
              borderRadius: 25,
              height: 50,
              shadowColor: AppColors.shadow.colored,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 12,
              elevation: 5,
              opacity: loading ? 0.7 : 1,
            }}
            onPress={async () => {
              const validateProfile = validateProfileImage(
                userData.profileImage
                  ? { uri: userData.profileImage, type: "", fileSize: 0 }
                  : null
              );
              if (validateProfile) {
                Toast.show({
                  type: ALERT_TYPE.WARNING,
                  title: "Warning",
                  textBody: "Select a profile image or an avatar",
                });
              } else {
                try {
                  setLoading(true);
                  const response = await createNewAccount(userData);
                  console.log(response);
                  if (response.status) {
                    navigation.replace("HomeScreen");
                  } else {
                    Toast.show({
                      type: ALERT_TYPE.INFO,
                      title: "Warning!",
                      textBody: response.message,
                    });
                  }
                } catch (error) {
                  console.log(error);
                } finally {
                  setLoading(false);
                }
              }
            }}
            android_ripple={{ color: AppColors.button.primaryHover }}
          >
            {loading ? (
              <ActivityIndicator size="large" color={AppColors.button.primaryText} />
            ) : (
              <Text 
                style={{ 
                  color: AppColors.button.primaryText,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
                Create Account
              </Text>
            )}
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}