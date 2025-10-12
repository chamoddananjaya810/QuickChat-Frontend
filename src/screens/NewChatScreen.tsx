import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatScreen from "./ChatsScreen";
import StatusScreen from "./StatusScreen";
import CallsScreen from "./CallsScreen";
import { Text, View } from "react-native";


export default function NewChatScreen(){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Status Screen</Text>
    </View>
  );

}