import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Image, KeyboardAvoidingView, Platform, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { AppColors } from '../../theme/colors';

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
      headerStyle: {
        backgroundColor: AppColors.background.gradient1,
      },
      headerLeft: () => (
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={AppColors.text.primary} />
          </TouchableOpacity>
          <Image
            source={require("../../assets/avatar/avatar_2.png")}
            style={{
              width: 40,
              height: 40,
              marginLeft: 8,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: AppColors.input.border,
            }}
          />
        </View>
      ),
      headerRight: () => (
        <View className="mr-4">
          <Text 
            className="text-lg font-bold"
            style={{ color: AppColors.text.primary }}
          >
            {friendName}
          </Text>
          <Text 
            className="text-xs italic"
            style={{ color: AppColors.button.primaryBg }}
          >
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
          style={{
            marginVertical: 4,
            paddingHorizontal: 16,
            paddingVertical: 10,
            maxWidth: '75%',
            alignSelf: isMe ? 'flex-end' : 'flex-start',
            backgroundColor: isMe ? AppColors.button.primaryBg : AppColors.input.background,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            borderBottomLeftRadius: isMe ? 16 : 4,
            borderBottomRightRadius: isMe ? 4 : 16,
            shadowColor: AppColors.shadow.light,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 2,
            borderWidth: isMe ? 0 : 2,
            borderColor: isMe ? 'transparent' : AppColors.input.border,
          }}
        >
          <Text 
            className="text-base"
            style={{ color: isMe ? AppColors.button.primaryText : AppColors.text.primary }}
          >
            {item.text}
          </Text>
          <View className="flex-row items-center justify-end gap-1 mt-1">
            <Text 
              className="text-xs"
              style={{ 
                color: isMe ? AppColors.button.primaryText : AppColors.text.secondary,
                opacity: 0.7 
              }}
            >
              {item.time}
            </Text>
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
                color={item.status === "read" ? "#3b82f6" : AppColors.button.primaryText}
              />
            )}
          </View>
        </View>
        
        {showDateSeparator && (
          <View className="items-center my-3">
            <View 
              style={{
                paddingHorizontal: 12,
                paddingVertical: 4,
                backgroundColor: AppColors.input.background,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: AppColors.input.border,
              }}
            >
              <Text 
                className="text-xs"
                style={{ color: AppColors.text.secondary }}
              >
                {formatDate(item.date)}
              </Text>
            </View>
          </View>
        )}
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={false} barStyle="dark-content" />
      
      {/* Gradient Background */}
      <LinearGradient
        colors={[
          AppColors.background.gradient1,
          AppColors.background.gradient2,
          AppColors.background.gradient3,
        ]}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <SafeAreaView style={{ flex: 1 }}>
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
          
          <View 
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              gap: 8,
              padding: 12,
              backgroundColor: AppColors.input.background,
              borderTopWidth: 2,
              borderTopColor: AppColors.input.border,
            }}
          >
            <TextInput 
              value={input} 
              onChangeText={setInput} 
              multiline  
              placeholder="Type a message" 
              placeholderTextColor={AppColors.input.placeholder}
              style={{
                flex: 1,
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontSize: 16,
                backgroundColor: 'white',
                minHeight: 50,
                maxHeight: 96,
                borderRadius: 25,
                textAlignVertical: 'center',
                color: AppColors.input.text,
                borderWidth: 2,
                borderColor: AppColors.input.border,
              }}
            />
            <TouchableOpacity 
              onPress={sendMessage}
              style={{
                width: 48,
                height: 48,
                backgroundColor: AppColors.button.primaryBg,
                borderRadius: 24,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: AppColors.shadow.colored,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
                elevation: 4,
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="send" size={20} color={AppColors.button.primaryText} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}