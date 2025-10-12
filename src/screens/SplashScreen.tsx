import { useEffect } from "react";
import { StatusBar, Text, View, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import CircleShape from "../components/CircleShape";
import "../../global.css";
import { RootStack } from "../../App";

type props = NativeStackNavigationProp<RootStack, "SplashScreen">;

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const navigation = useNavigation<props>();
  
  // Logo animations
  const logoScale = useSharedValue(0);
  const logoRotate = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  
  // Glow effect
  const glowScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0);
  
  // Text animations
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(30);
  const textScale = useSharedValue(0.8);
  
  // Subtitle animation
  const subtitleOpacity = useSharedValue(0);
  const subtitleTranslateY = useSharedValue(20);

  useEffect(() => {
    // Logo entrance animation
    logoScale.value = withDelay(
      300,
      withSpring(1, {
        damping: 10,
        stiffness: 80,
        mass: 0.5,
      })
    );
    
    logoRotate.value = withDelay(
      300,
      withSpring(360, {
        damping: 15,
        stiffness: 50,
      })
    );
    
    logoOpacity.value = withDelay(
      300,
      withTiming(1, { duration: 600 })
    );

    // Glow pulsing effect
    glowScale.value = withDelay(
      800,
      withRepeat(
        withSequence(
          withTiming(1.2, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      )
    );
    
    glowOpacity.value = withDelay(
      800,
      withRepeat(
        withSequence(
          withTiming(0.4, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.2, { duration: 1500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      )
    );

    // Text animations
    textOpacity.value = withDelay(
      1200,
      withTiming(1, { duration: 800 })
    );
    
    textTranslateY.value = withDelay(
      1200,
      withSpring(0, { damping: 12, stiffness: 100 })
    );
    
    textScale.value = withDelay(
      1200,
      withSpring(1, { damping: 10, stiffness: 100 })
    );

    // Subtitle animation
    subtitleOpacity.value = withDelay(
      1600,
      withTiming(1, { duration: 600 })
    );
    
    subtitleTranslateY.value = withDelay(
      1600,
      withSpring(0, { damping: 12, stiffness: 100 })
    );

    // Navigate after animation
    const timer = setTimeout(() => {
      navigation.replace("SingUpScreen");
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [
      { scale: logoScale.value },
      { rotate: `${logoRotate.value}deg` },
    ],
  }));

  const glowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: glowScale.value }],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [
      { translateY: textTranslateY.value },
      { scale: textScale.value },
    ],
  }));

  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: subtitleTranslateY.value }],
  }));

  return (
    <View className="flex-1">
      <StatusBar hidden={true} />
      
      {/* Lighter Gradient Background */}
      <LinearGradient
        colors={['#e0f2fe', '#f0f9ff', '#dbeafe']}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Animated Background Particles - Soft colors */}
      <CircleShape
        width={300}
        height={300}
        borderRadius={150}
        fillColor="rgba(186, 230, 253, 0.4)"
        topValue={-100}
        leftValue={-100}
        animate={true}
        delay={0}
      />
      
      <CircleShape
        width={200}
        height={200}
        borderRadius={100}
        fillColor="rgba(199, 210, 254, 0.35)"
        topValue={100}
        rightValue={-50}
        animate={true}
        delay={200}
      />
      
      <CircleShape
        width={250}
        height={250}
        borderRadius={125}
        fillColor="rgba(186, 230, 253, 0.3)"
        bottomValue={-80}
        leftValue={width / 2 - 125}
        animate={true}
        delay={400}
      />
      
      <CircleShape
        width={150}
        height={150}
        borderRadius={75}
        fillColor="rgba(167, 243, 208, 0.3)"
        bottomValue={150}
        rightValue={-40}
        animate={true}
        delay={600}
      />

      <SafeAreaView className="items-center justify-center flex-1">
        {/* Logo Container */}
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          {/* Glow effect behind logo */}
          <Animated.View
            style={[
              {
                width: 280,
                height: 280,
                borderRadius: 140,
                backgroundColor: 'rgba(186, 230, 253, 0.4)',
                position: 'absolute',
                shadowColor: '#3b82f6',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 40,
                elevation: 10,
              },
              glowAnimatedStyle,
            ]}
          />

          {/* Main Logo */}
          <Animated.Image
            source={require("../../assets/quick.png")}
            style={[
              {
                width: 220,
                height: 200,
              },
              logoAnimatedStyle,
            ]}
            resizeMode="contain"
          />
        </View>

        {/* Text Section */}
        <Animated.View
          className="absolute items-center w-full"
          style={[{ bottom: 120 }, textAnimatedStyle]}
        >
          <Text className="text-5xl font-extrabold text-center text-slate-700">
            chat
          </Text>
          
          {/* Decorative underline */}
          <View
            style={{
              width: 60,
              height: 4,
              backgroundColor: '#3b82f6',
              borderRadius: 2,
              marginTop: 12,
            }}
          />
        </Animated.View>

        {/* Subtitle */}
        <Animated.View
          className="absolute items-center w-full"
          style={[{ bottom: 80 }, subtitleAnimatedStyle]}
        >
          <Text className="text-base font-medium text-center text-slate-600">
            Connect instantly, chat
          </Text>
        </Animated.View>

        {/* Loading Indicator */}
        <Animated.View
          className="absolute items-center"
          style={[{ bottom: 40 }, subtitleAnimatedStyle]}
        >
          <View className="flex-row gap-2">
            {[0, 1, 2].map((index) => (
              <LoadingDot key={index} delay={index * 200} />
            ))}
          </View>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

// Loading Dot Component
function LoadingDot({ delay }: { delay: number }) {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    translateY.value = withDelay(
      1800 + delay,
      withRepeat(
        withSequence(
          withTiming(-8, { duration: 400, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 400, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      )
    );
    
    opacity.value = withDelay(
      1800 + delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0.3, { duration: 400 })
        ),
        -1,
        false
      )
    );
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: '#3b82f6',
        },
        animatedStyle,
      ]}
    />
  );
}