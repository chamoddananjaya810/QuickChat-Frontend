import { StatusBar } from "expo-status-bar";

import { Animated, StyleSheet, Text, View } from "react-native";
import { useEffect, useRef } from "react";
import "./global.css";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import SingUpScreen from "./src/screens/SingUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SettingScreen from "./src/screens/SettingScreen";
import SplashScreen from "./src/screens/SplashScreen";
import { ThemeProvider } from "./theme/ThemeProvider";
import ContactScreen from "./src/screens/ContactScreen";
import AvatarScreen from "./src/screens/AvatarScreen";
import { UserRegistationProvider } from "./src/components/UserContext";
import { AlertNotificationRoot } from "react-native-alert-notification";
import HomeTabs from "./src/screens/HomeTabs";

import { WebSocketProvider } from "./src/socket/WebSocketProvider";
import SingelChatScreen from "./src/screens/SingleChatScreen";
import NewChatScreen from "./src/screens/NewChatScreen";
import { FriendRegistationProvider } from "./src/components/friendContext";
// import ContactAccessScreen from "./src/screens/ContactAccessScreen";

export type RootStack = {
  SplashScreen: undefined;
  SingUpScreen: undefined;
  ContactAccessScreen: undefined;
  ContactScreen: undefined;
  AvatarScreen: undefined;
  SignInScreen: undefined;
  HomeScreen: undefined;
  SettingScreen: undefined;
  NewChatScreen: undefined;
  SingelChatScreen: {
    chatId: number;
    friendName: string;
    lastSeenTime: string;
    profileImage: any;
  };
};

const Stack = createNativeStackNavigator<RootStack>();

export default function App() {
  const USER_ID = 1;
  return (
    <AlertNotificationRoot>
      <WebSocketProvider userId={USER_ID}>
        <ThemeProvider>
          <UserRegistationProvider>
            <FriendRegistationProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen
                  name="SplashScreen"
                  component={SplashScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SignInScreen"
                  component={SignInScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SingUpScreen"
                  component={SingUpScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ContactScreen"
                  component={ContactScreen}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="AvatarScreen"
                  component={AvatarScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="HomeScreen"
                  component={HomeTabs}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="NewChatScreen"
                  component={NewChatScreen}
                  options={{ headerShown: false }}
                />
                {/* <Stack.Screen name="ProfileScreen" component={ProfileScreen} /> */}
                <Stack.Screen name="SettingScreen" component={SettingScreen} />
                <Stack.Screen
                  name="SingelChatScreen"
                  component={SingelChatScreen}
                />
              </Stack.Navigator>
            </NavigationContainer>
         </FriendRegistationProvider>
          </UserRegistationProvider>
        </ThemeProvider>
      </WebSocketProvider>
    </AlertNotificationRoot>
  );
}
