// src/theme/colors.ts

// මේවා ඔබේ app එකට ගැලපෙන්න වෙනස් කරන්න පුළුවන්.
export const AppLightColors = {
  background: '#F8F8F8', // Light background
  text: '#1A1A1A',       // Dark text
  primary: '#007AFF',    // Blue accent
  secondary: '#6C757D',  // Grey for secondary elements
  border: '#E0E0E0',
  statusBar: 'dark-content' as const, // Status bar text color for light theme
};

export const AppDarkColors = {
  background: '#1A1A1A', // Dark background
  text: '#F8F8F8',       // Light text
  primary: '#0A84FF',    // Lighter blue accent for dark mode
  secondary: '#ADB5BD',  // Lighter grey
  border: '#3A3A3A',
  statusBar: 'light-content' as const, // Status bar text color for dark theme
};

// මේ function එක `applied` theme එක අනුව නිවැරදි color set එක return කරයි.
export const getColors = (appliedTheme: "light" | "dark") => {
  return appliedTheme === "dark" ? AppDarkColors : AppLightColors;
};

// Colors object එකේ type එක define කරන්න.
export type ColorsType = typeof AppLightColors;