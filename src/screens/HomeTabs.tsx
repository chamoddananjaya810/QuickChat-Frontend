import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatScreen from "./ChatsScreen";
import StatusScreen from "./StatusScreen";
import CallsScreen from "./CallsScreen";
import { Ionicons } from "@expo/vector-icons";



const Tabs= createBottomTabNavigator();
export default function HomeTabs(){
  return ( 
  <Tabs.Navigator
      // Define the options for the navigator
      screenOptions={({ route }) => ({
        // The function that renders the icon for each tab
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "chatbubble-ellipses";

          // 1. Logic to determine the icon based on the route name
          if (route.name === "Chat") { 
            // Use filled icon when focused, outline when not (standard UX)
            iconName = focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline";
          } else if (route.name === "Status") {
            // "time" is often used in Ionicons for status/story views
            iconName = focused ? "time" : "time-outline"; 
          } else if (route.name === "Calls") {
            iconName = focused ? "call" : "call-outline";
          }

          // 2. Return the icon component, fixing the TypeScript error
          // The 'as any' assertion bypasses the generic string type error
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
       
        // Optional: Style the tab bar colors
       
       tabBarLabelStyle:{fontSize:16},
        tabBarActiveTintColor: '#075E54', // A common "active" color
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: true, // Show the screen name below the icon
      tabBarStyle:{
        height:80,
        backgroundColor:"#fff",
        paddingTop:0,
      }
      
      })}
    >
      <Tabs.Screen name="Chat" component={ChatScreen}  options={{ headerShown: false }}/>
      <Tabs.Screen name="Status" component={StatusScreen} />
      <Tabs.Screen name="Calls" component={CallsScreen} />
    </Tabs.Navigator>
  );

}