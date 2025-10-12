import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import SettingScreen from "./SettingScreen";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";

// Change "SingelChat" to "SingleChat"




const Stack = createNativeStackNavigator();

export default function ChatScreen() {



  return (
    <Stack.Navigator >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
    {/* <Stack.Screen name="NewChatScreen" component={NewChatScreen}/> */}
  
    </Stack.Navigator>
  );
}
