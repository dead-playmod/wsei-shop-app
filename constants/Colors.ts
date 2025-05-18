/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#7c09ff';
const tintColorDark = '#7429c8';

export const Colors = {
  light: {
    text: '#11181C',
    textMuted: '#1b2429',
    background: '#ffffff',
    backgroundMuted: '#ebebeb',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    border: '#b6b6b6',
    destructive: '#ff3059',
  },
  dark: {
    text: '#ECEDEE',
    textMuted: '#9BA1A6',
    background: '#0d0a12',
    backgroundMuted: '#14161d',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    border: '#242930',
    destructive: '#dc2757',
  },
};
