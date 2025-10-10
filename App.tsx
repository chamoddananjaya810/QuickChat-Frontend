
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SplashScreen from "./src/screens/SplashScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./src/theme/ThemeContext";

export type RootStack = {
  SplashScreen: undefined;
  // SingUpScreen: undefined;
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
    <ThemeProvider>
          <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{ headerShown: false }}
              />
      </Stack.Navigator>


    </NavigationContainer>
    </ThemeProvider>

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
