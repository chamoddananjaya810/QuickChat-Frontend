// colors.ts - App-wide Color Theme
// ඔයාගේ splash screen එකේ colors වලින් හදපු complete theme එකක්

export const AppColors = {
  // ============ PRIMARY COLORS ============
  primary: {
    main: '#3b82f6',        // Blue - buttons, links, active states
    light: '#60a5fa',       // Light Blue - hover states
    dark: '#2563eb',        // Dark Blue - pressed states
    subtle: '#dbeafe',      // Very Light Blue - backgrounds
  },

  // ============ BACKGROUND COLORS ============
  background: {
    // Gradient colors (splash screen වගේ)
    gradient1: '#f0f9ff',   // Sky Blue (lightest)
    gradient2: '#e0f2fe',   // Sky Blue (medium)
    gradient3: '#bae6fd',   // Sky Blue (darker)
    
    // Solid backgrounds
    main: '#ffffff',        // White - main backgrounds
    secondary: '#f8fafc',   // Off-white - secondary backgrounds
    card: '#ffffff',        // White - cards, modals
    overlay: 'rgba(0, 0, 0, 0.5)', // Dark overlay for modals
  },

  // ============ TEXT COLORS ============
  text: {
    primary: '#334155',     // Slate 700 - main text
    secondary: '#64748b',   // Slate 500 - secondary text
    tertiary: '#94a3b8',    // Slate 400 - disabled/placeholder
    inverse: '#ffffff',     // White text on dark backgrounds
    link: '#3b82f6',        // Blue - links
  },

  // ============ INPUT COLORS ============
  input: {
    background: '#ffffff',   // White background
    border: '#e2e8f0',      // Light gray border
    borderFocus: '#3b82f6', // Blue border when focused
    placeholder: '#94a3b8', // Slate 400 - placeholder text
    text: '#334155',        // Slate 700 - input text
    disabled: '#f1f5f9',    // Light gray - disabled background
    error: '#ef4444',       // Red - error state
    errorBorder: '#fca5a5', // Light red - error border
  },

  // ============ BUTTON COLORS ============
  button: {
    // Primary button (filled)
    primaryBg: '#3b82f6',
    primaryText: '#ffffff',
    primaryHover: '#2563eb',
    primaryPressed: '#1d4ed8',
    primaryDisabled: '#93c5fd',
    
    // Secondary button (outlined)
    secondaryBg: 'transparent',
    secondaryBorder: '#3b82f6',
    secondaryText: '#3b82f6',
    secondaryHover: '#eff6ff',
    
    // Danger button
    dangerBg: '#ef4444',
    dangerText: '#ffffff',
    dangerHover: '#dc2626',
    
    // Ghost button
    ghostBg: 'transparent',
    ghostText: '#3b82f6',
    ghostHover: '#f0f9ff',
  },

  // ============ ACCENT COLORS (decorative circles වගේ) ============
  accent: {
    blue: 'rgba(59, 130, 246, 0.15)',      // Blue circle
    purple: 'rgba(139, 92, 246, 0.15)',    // Purple circle
    pink: 'rgba(236, 72, 153, 0.12)',      // Pink circle
    green: 'rgba(34, 197, 94, 0.15)',      // Green circle
    cyan: 'rgba(186, 230, 253, 0.4)',      // Cyan (for glows)
  },

  // ============ STATUS COLORS ============
  status: {
    success: '#22c55e',     // Green
    successBg: '#dcfce7',   // Light green background
    error: '#ef4444',       // Red
    errorBg: '#fee2e2',     // Light red background
    warning: '#f59e0b',     // Orange
    warningBg: '#fef3c7',   // Light orange background
    info: '#3b82f6',        // Blue
    infoBg: '#dbeafe',      // Light blue background
  },

  // ============ SHADOW COLORS ============
  shadow: {
    light: 'rgba(0, 0, 0, 0.05)',
    medium: 'rgba(0, 0, 0, 0.1)',
    dark: 'rgba(0, 0, 0, 0.2)',
    colored: 'rgba(59, 130, 246, 0.3)', // Blue shadow
  },

  // ============ CHAT SPECIFIC COLORS ============
  chat: {
    myMessageBg: '#3b82f6',        // Blue - my messages
    myMessageText: '#ffffff',       // White text
    theirMessageBg: '#f1f5f9',     // Light gray - their messages
    theirMessageText: '#334155',    // Dark text
    timestamp: '#94a3b8',           // Gray timestamp
    divider: '#e2e8f0',            // Divider lines
    online: '#22c55e',             // Green - online status
    offline: '#94a3b8',            // Gray - offline status
    typing: '#3b82f6',             // Blue - typing indicator
  },

  // ============ IMAGE PICKER COLORS ============
  imagePicker: {
    background: '#f8fafc',          // Light background
    border: '#e2e8f0',             // Border
    iconColor: '#64748b',          // Icon color
    placeholderBg: '#f1f5f9',      // Placeholder background
    selectedBorder: '#3b82f6',     // Blue border when selected
    overlay: 'rgba(0, 0, 0, 0.6)', // Dark overlay for preview
  },

  // ============ BORDER & DIVIDER ============
  border: {
    light: '#f1f5f9',      // Very light
    normal: '#e2e8f0',     // Normal
    dark: '#cbd5e1',       // Darker
    focus: '#3b82f6',      // Blue - focused state
  },
};

// ============ USAGE EXAMPLES ============

// Example 1: TextInput Component
/*
<TextInput
  style={{
    backgroundColor: AppColors.input.background,
    borderColor: AppColors.input.border,
    borderWidth: 1,
    color: AppColors.text.primary,
    borderRadius: 12,
    padding: 16,
  }}
  placeholderTextColor={AppColors.input.placeholder}
/>

// Focused state:
<TextInput
  style={{
    borderColor: AppColors.input.borderFocus,
    // ... other styles
  }}
/>
*/

// Example 2: Primary Button
/*
<TouchableOpacity
  style={{
    backgroundColor: AppColors.button.primaryBg,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  }}
>
  <Text style={{ color: AppColors.button.primaryText, fontWeight: 'bold' }}>
    Sign Up
  </Text>
</TouchableOpacity>
*/

// Example 3: Secondary Button (Outlined)
/*
<TouchableOpacity
  style={{
    backgroundColor: AppColors.button.secondaryBg,
    borderWidth: 2,
    borderColor: AppColors.button.secondaryBorder,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  }}
>
  <Text style={{ color: AppColors.button.secondaryText, fontWeight: 'bold' }}>
    Cancel
  </Text>
</TouchableOpacity>
*/

// Example 4: Image Picker
/*
<TouchableOpacity
  style={{
    width: 100,
    height: 100,
    backgroundColor: AppColors.imagePicker.placeholderBg,
    borderWidth: 2,
    borderColor: AppColors.imagePicker.border,
    borderRadius: 12,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <Icon name="camera" color={AppColors.imagePicker.iconColor} size={32} />
</TouchableOpacity>
*/

// Example 5: Chat Message (My Message)
/*
<View
  style={{
    backgroundColor: AppColors.chat.myMessageBg,
    padding: 12,
    borderRadius: 16,
    maxWidth: '80%',
    alignSelf: 'flex-end',
  }}
>
  <Text style={{ color: AppColors.chat.myMessageText }}>
    Hello! How are you?
  </Text>
  <Text style={{ 
    color: AppColors.chat.myMessageText,
    opacity: 0.7,
    fontSize: 11,
    marginTop: 4,
  }}>
    10:30 AM
  </Text>
</View>
*/

// Example 6: Chat Message (Their Message)
/*
<View
  style={{
    backgroundColor: AppColors.chat.theirMessageBg,
    padding: 12,
    borderRadius: 16,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  }}
>
  <Text style={{ color: AppColors.chat.theirMessageText }}>
    I'm good, thanks!
  </Text>
  <Text style={{ 
    color: AppColors.chat.timestamp,
    fontSize: 11,
    marginTop: 4,
  }}>
    10:31 AM
  </Text>
</View>
*/

// Example 7: Card with Shadow
/*
<View
  style={{
    backgroundColor: AppColors.background.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: AppColors.shadow.medium,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  }}
>
  <Text style={{ color: AppColors.text.primary }}>Card Content</Text>
</View>
*/

// Example 8: Success Alert
/*
<View
  style={{
    backgroundColor: AppColors.status.successBg,
    borderLeftWidth: 4,
    borderLeftColor: AppColors.status.success,
    padding: 16,
    borderRadius: 8,
  }}
>
  <Text style={{ color: AppColors.status.success, fontWeight: 'bold' }}>
    Success! Message sent.
  </Text>
</View>
*/

// Example 9: Loading Indicator (Splash වගේ)
/*
<View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: AppColors.primary.main }} />
*/

// Example 10: Gradient Background
/*
import { LinearGradient } from 'expo-linear-gradient';

<LinearGradient
  colors={[
    AppColors.background.gradient1,
    AppColors.background.gradient2,
    AppColors.background.gradient3,
  ]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={{ flex: 1 }}
>
  Your content here
</LinearGradient>
*/

export default AppColors;