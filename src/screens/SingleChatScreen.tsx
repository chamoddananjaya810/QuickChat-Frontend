import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Image, KeyboardAvoidingView, Platform, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type Message = {
  id: number;
  text: string;
  sender: "me" | "friend";
  time: string;
  date: string;
  status?: "sent" | "delivered" | "read";
};

type SingelChatScreenProps = NativeStackScreenProps<
  RootStack,
  "SingelChatScreen"
>;


 export default function SingelChatScreen({route,navigation}:SingelChatScreenProps) {
  const {chatId,friendName,lastSeenTime,profileImage}=route.params;
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Hi", 
      sender: "friend", 
      time: "10:56 AM",
      date: "2024-03-15",
      status: "read" 
    },
    { 
      id: 2, 
      text: "Hi, Hello", 
      sender: "friend", 
      time: "10:57 AM",
      date: "2024-03-15",
      status: "read"
    },
    { 
      id: 3, 
      text: "Hello, Kohomada", 
      sender: "me", 
      time: "10:58 AM",
      date: "2024-03-15",
      status: "read" 
    },
  ]);
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerLeft: () => (
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Image
            source={require("../../assets/avatar/avatar_2.png")}
            className="w-10 h-10 ml-2 rounded-full"
          />
        </View>
      ),
      headerRight: () => (
        <View className="mr-4">
          <Text className="text-lg font-bold">{friendName}</Text>
          <Text className="text-xs italic text-green-500">
            Last seen today at {lastSeenTime}
          </Text>
        </View>
      ),
    });
  }, [navigation]);

  const formatDate = (dateString: string) => {
    const messageDate = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Reset time for comparison
    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);
    messageDate.setHours(0, 0, 0, 0);

    if (messageDate.getTime() === today.getTime()) {
      return "Today";
    } else if (messageDate.getTime() === yesterday.getTime()) {
      return "Yesterday";
    } else {
      return new Date(dateString).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    }
  };

  const sendMessage = () => {
    if (input.trim() === "") return;

    const now = new Date();
    const newMessage: Message = {
      id: messages.length + 1,
      text: input.trim(),
      sender: "me",
      time: now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      date: now.toISOString().split('T')[0],
      status: "sent"
    };

    setMessages([newMessage, ...messages]);
    setInput("");

    // Simulate message status changes
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, status: "delivered" as const } : msg
      ));
    }, 1000);

    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, status: "read" as const } : msg
      ));
    }, 3000);
  };

  const shouldShowDateSeparator = (currentItem: Message, index: number) => {
    if (index === messages.length - 1) return true;
    const nextItem = messages[index + 1];
    return currentItem.date !== nextItem.date;
  };

  const renderItem = ({ item, index }: { item: Message; index: number }) => {
    const isMe = item.sender === "me";
    const showDateSeparator = shouldShowDateSeparator(item, index);
   
    return (
      <>
        <View
          className={`my-1 px-4 py-2 max-w-[75%] ${
            isMe
              ? 'rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl self-end bg-green-600'
              : 'rounded-tl-2xl rounded-tr-2xl rounded-br-2xl self-start bg-gray-700'
          }`}
        >
          <Text className="text-base text-white">{item.text}</Text>
          <View className="flex-row items-center justify-end gap-1 mt-1">
            <Text className="text-xs text-white opacity-70">{item.time}</Text>
            {isMe && (
              <Ionicons 
                name={
                  item.status === "read" 
                    ? "checkmark-done" 
                    : item.status === "delivered"
                    ? "checkmark-done"
                    : "checkmark"
                }
                size={14}
                color={item.status === "read" ? "#3b82f6" : "#fff"}
              />
            )}
          </View>
        </View>
        
        {showDateSeparator && (
          <View className="items-center my-3">
            <View className="px-3 py-1 bg-gray-200 rounded-full">
              <Text className="text-xs text-gray-600">{formatDate(item.date)}</Text>
            </View>
          </View>
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar hidden={false} barStyle="dark-content" />
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList 
          data={messages} 
          renderItem={renderItem} 
          keyExtractor={(item) => item.id.toString()}
          className="px-3"
          contentContainerStyle={{ paddingVertical: 10 }}
          inverted={true}
          keyboardShouldPersistTaps="handled"
        />
        
        <View className="flex-row items-end gap-2 p-3 bg-white border-t border-gray-200">
          <TextInput 
            value={input} 
            onChangeText={setInput} 
            multiline  
            placeholder="Type a message" 
            className="flex-1 px-4 py-3 text-base bg-gray-100 min-h-[50px] max-h-24 rounded-3xl"
            style={{ textAlignVertical: 'center' }}
          />
          <TouchableOpacity 
            onPress={sendMessage}
            className="items-center justify-center w-12 h-12 bg-green-600 rounded-full"
            activeOpacity={0.7}
          >
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}