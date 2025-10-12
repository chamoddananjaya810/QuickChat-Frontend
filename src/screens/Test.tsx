import { View } from "react-native";
// You are missing this import
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// You are also missing the import for RootStack, 
// which is typically defined in a separate file (e.g., App.tsx)

// Assuming RootStack is defined somewhere, let's add a placeholder for clarity:
// import { RootStack } from "./path/to/RootStack"; 
type RootStack = { Test: undefined; /* other screens */ }; // Placeholder

export default function Test(){
    return(
        <View>nddn</View>
    )
}
