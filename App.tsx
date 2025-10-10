import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SplashScreen from "./src/screens/SplashScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import { ThemeContext } from "./src/theme/ThemeContext";
import SingUpScreen from "./src/screens/SingUpScreen";

export type RootStack = {
  SplashScreen: undefined;
  SingUpScreen: undefined;
  // ContactScreen: undefined;
  // AvatarScreen: undefined;
  // SignInScreen: undefined;
  // HomeScreen: undefined;
  // SettingScreen: undefined;
  // SingelChatScreen: {
  //   chatId: number;
  //   friendName: string;
  //   lastSeenTime: string;
  //   profileImage: any;
  // };
};

const Stack = createNativeStackNavigator<RootStack>();

export default function App() {
  return (
    <ThemeContext>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SingUpScreen"
            component={SingUpScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
