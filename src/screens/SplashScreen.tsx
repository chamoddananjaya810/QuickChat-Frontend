import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getColors } from '../theme/colors'; // 
import { useTheme } from '../theme/ThemeContext';
import { RootStack } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type props = NativeStackNavigationProp<RootStack, "SplashScreen">;
export default function SplashScreen() {
  const navigation = useNavigation<props>();
  const { applied } = useTheme(); // ThemeProvider එකෙන් `applied` theme එක ලබාගන්නවා.
  const colors = getColors(applied); // `applied` theme එක අනුව colors ලබාගන්නවා.

  useEffect(() => {
    const timer = setTimeout(() => {
 navigation.replace('SingUpScreen'); 
    }, 2500); 

    return () => clearTimeout(timer); 
  }, [navigation]);

  return (
 
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
 
      <StatusBar barStyle={colors.statusBar} backgroundColor={colors.background} />

      <Text style={[styles.appTitle, { color: colors.primary }]}>
        Quick Chat
      </Text>
      <Text style={[styles.slogan, { color: colors.text }]}>
        Connect. Share. Explore.
      </Text>

     
      <ActivityIndicator size="large" color={colors.primary} style={styles.activityIndicator} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  slogan: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 40,
  },
  activityIndicator: {
    marginTop: 50,
  },
});