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
import { LinearGradient } from 'expo-linear-gradient';
import { AppColors } from '../../theme/colors';

const chats = [
  {
    id: 1,
    name: "Sahan Perera",
    lastMessage: "hello,Sahan",
    time: "9:46",
    unread: 2,
    profile: require("../../assets/avatar/avatar_2.png"),
  },
  {
    id: 2,
    name: "amal Perera",
    lastMessage: "hello,amal ",
    time: "yesterday",
    unread: 2,
    profile: require("../../assets/avatar/avatar_4.png"),
  },
  {
    id: 3,
    name: "rashni Perera",
    lastMessage: "hello,rashni",
    time: "9:46",
    unread: 2,
    profile: require("../../assets/avatar/avatar_3.png"),
  },
  {
    id: 4,
    name: "asanki Perera",
    lastMessage: "hello,asanki",
    time: "2025/02/22 pm",
    unread: 0,
    profile: require("../../assets/avatar/avatar_5.png"),
  },
];

type HomeScreenProps = NativeStackNavigationProp<RootStack, "HomeScreen">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenProps>();
  const [search, setSearch] = useState("");
  const chatlist = useChatList();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "quick-chat",
      headerTitleStyle: { 
        fontWeight: "bold",
        color: AppColors.text.primary,
      },
      headerStyle: {
        backgroundColor: AppColors.background.gradient1,
      },
      headerRight: () => (
        <View className="flex-row items-center space-x-4">
          <TouchableOpacity className="mr-2">
            <Ionicons name="camera" size={26} color={AppColors.text.primary} />
          </TouchableOpacity>

          <TouchableOpacity className="mr-4">
            <Ionicons name="ellipsis-vertical" size={24} color={AppColors.text.primary} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const filterdChats = chats.filter((chat) => {
    return (
      chat.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      chat.lastMessage?.toLocaleLowerCase().includes(search.toLowerCase())
    );
  });

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={{
        backgroundColor: AppColors.input.background,
        borderRadius: 20,
        marginHorizontal: 16,
        marginVertical: 6,
        padding: 12,
        shadowColor: AppColors.shadow.light,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
      }}
      onPress={() => {
        navigation.navigate("SingelChatScreen", {
          chatId: 1,
          friendName: "Anjaa",
          lastSeenTime: "8:PM",
          profileImage: require("../../assets/avatar/avatar_2.png"),
        });
      }}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center">
        <Image 
          source={item.profile} 
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            borderWidth: 2,
            borderColor: AppColors.input.border,
          }}
        />
        <View className="flex-1 ml-3">
          <View className="flex-row items-center justify-between mb-1">
            <Text 
              className="text-lg font-bold"
              style={{ color: AppColors.text.primary }}
            >
              {item.name}
            </Text>
            <Text 
              className="text-xs font-medium"
              style={{ color: AppColors.text.secondary }}
            >
              {item.time}
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text 
              className="flex-1 text-sm"
              style={{ color: AppColors.text.secondary }}
              numberOfLines={1}
            >
              {item.lastMessage}
            </Text>
            {item.unread > 0 && (
              <View 
                style={{
                  backgroundColor: AppColors.button.primaryBg,
                  borderRadius: 12,
                  width: 24,
                  height: 24,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 8,
                }}
              >
                <Text 
                  className="text-xs font-bold"
                  style={{ color: AppColors.button.primaryText }}
                >
                  {item.unread}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1">
      <StatusBar hidden={false} />
      
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

      <SafeAreaView className="flex-1">
        {/* Search Bar */}
        <View 
          style={{
            backgroundColor: AppColors.input.background,
            borderRadius: 25,
            marginHorizontal: 16,
            marginTop: 8,
            marginBottom: 12,
            paddingHorizontal: 16,
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: AppColors.shadow.light,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 3,
            borderWidth: 2,
            borderColor: AppColors.input.border,
          }}
        >
          <Ionicons name="search" size={24} color={AppColors.text.secondary} />
          <TextInput
            className="flex-1 ml-2 text-base"
            style={{ color: AppColors.input.text }}
            placeholder="Search"
            placeholderTextColor={AppColors.input.placeholder}
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
        </View>

        {/* Chat List */}
        <FlatList 
          data={filterdChats} 
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 4 }}
          showsVerticalScrollIndicator={false}
        />

        {/* Floating Action Button */}
        <View 
          style={{
            position: 'absolute',
            bottom: 80,
            right: 20,
            width: 64,
            height: 64,
            borderRadius: 32,
            backgroundColor: AppColors.button.primaryBg,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: AppColors.shadow.colored,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <TouchableOpacity 
            className="items-center justify-center w-full h-full"
            activeOpacity={0.8}
          >
            <Ionicons 
              name="chatbox-ellipses" 
              size={28} 
              color={AppColors.button.primaryText} 
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}