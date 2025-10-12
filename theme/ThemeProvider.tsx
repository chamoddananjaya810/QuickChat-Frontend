import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, useColorScheme } from "react-native";

export type ThemeOption = "light" | "dark" | "system";

const THEME_KEY = "@app_color_scheme";

type ThemeContextType = {
  preference: ThemeOption;
  applied: "light" | "dark";
  setPreference: (themeOption: ThemeOption) => Promise<void>;
};

const themeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme(); // "light" | "dark" | null

  const [preferenceState, setPreferenceState] = useState<ThemeOption>("system");
  const [isReady, setReady] = useState(false);

  // Load saved theme from AsyncStorage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);

        if (savedTheme === "light" || savedTheme === "dark") {
          setPreferenceState(savedTheme as ThemeOption);
        } else {
          setPreferenceState("system");
        }
      } catch (error) {
        console.warn("Failed to load theme: " + error);
      } finally {
        setReady(true);
      }
    };

    loadTheme();
  }, []);

  // Save theme preference
  const setPreference = async (themeOption: ThemeOption) => {
    try {
      if (themeOption === "system") {
        await AsyncStorage.removeItem(THEME_KEY);
        setPreferenceState("system");
      } else {
        await AsyncStorage.setItem(THEME_KEY, themeOption);
        setPreferenceState(themeOption);
      }
    } catch (error) {
      console.warn("failed to save theme: " + error);
    }
  };

  if (!isReady) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
    <themeContext.Provider
      value={{
        preference: preferenceState,
        applied: colorScheme ?? "light",
        setPreference,
      }}
    >
      {children}
    </themeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(themeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return ctx;
}
