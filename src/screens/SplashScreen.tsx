import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SplashScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Text>SplachScreen</Text>
    </SafeAreaView>
  );
}
