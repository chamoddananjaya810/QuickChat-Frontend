import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useChatList } from "../socket/UseChat";

const chats = [
  {
    id: 1,
    name: "Sahan Perera",
    LastMessage: "hello,Sahan",
    time: "9:46",
    unread: 2,
    profile: require("../../assets/avatar/avatar_2.png"),
  },
  {
    id: 2,
    name: "amal Perera",
    message: "hello,amal ",
    time: "yesterday",
    unread: 2,
    profile: require("../../assets/avatar/avatar_4.png"),
  },
  {
    id: 3,
    name: "rashni Perera",
    lastmessage: "hello,rashni",
    time: "9:46",
    unread: 2,
    profile: require("../../assets/avatar/avatar_3.png"),
  },
  {
    id: 4,
    name: "asanki Perera",
    lastmessage: "hello,asanki",
    time: "2025/02/22 pm",
    unread: 0,
    profile: require("../../assets/avatar/avatar_5.png"),
  },
];






type HomeScreenProps = NativeStackNavigationProp<RootStack, "HomeScreen">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenProps>();


  
  const [search, setSearch] = useState("");

const chatlist=useChatList();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "ChatApp",
      headerTitleStyle: { fontWeight: "bold" },
      headerRight: () => (
        <View className="flex-row items-center py-2 my-1 space-x-4 bg-gray-100">
          <TouchableOpacity className="me-5">
            <Ionicons name="camera" size={26} color="black" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const filterdChats = chats.filter((chat) => {
    return (
      chat.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      chat.lastmessage?.toLocaleLowerCase().includes(search.toLowerCase())
    );
  });

  const renderItem = ({ item }: any) => (
    <TouchableOpacity className="flex-row items-center border-gray-400 bg-green-50 "
    onPress={()=>{

      navigation.navigate("SingelChatScreen",{
        chatId:1,
        friendName:"Anjaa",
        lastSeenTime:"8:PM",
        profileImage:require("../../assets/avatar/avatar_2.png"),
      });
    }}
    >
      <Image source={item.profile} className="w-20 h-20 rounded-full" />
     <View className="flex-1">
         <View className="flex-row justify-between">
        <Text className="text-xl font-bold text-gray-600">{item.name}</Text>
        <Text className="text-xl font-bold text-gray-600">{item.time}</Text>
      </View>
       {/* 👇 **MAIN UPDATE:** Correctly styled Unread Badge 👇 */}
          {item.unread > 0 && (
            <View className="items-center justify-center w-5 h-5 bg-green-500 rounded-full">
              <Text className="text-xs font-bold text-white">
                {item.unread}
              </Text>
            </View>
          )}
          <Text>{item.lastmessage}</Text>
          {/* 👆 **MAIN UPDATE:** Correctly styled Unread Badge 👆 */}
     </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1  mt-[-17] bg-red-50 p-0">
      {/* <StatusBar hidden={false}/> */}
      <View className=" mt-[-5] flex-row items-center mx-2 bg-300 rounded-full px-3 h-14">
        <Ionicons name="search" size={32} color="black" />
        <TextInput
          className="flex-1 text-base"
          placeholder="Search"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <View className="mt-1">
        <FlatList data={filterdChats} renderItem={renderItem} 
        contentContainerStyle={{paddingBottom:80}}
        />
      </View>
      <View className="absolute w-20 h-20 bg-green-500 bottom-18 right-12 rounded-3xl">
        <TouchableOpacity className="items-center justify-center w-20 h-20 rounded-3xl">
          <Ionicons name="chatbox-ellipses" size={26} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
