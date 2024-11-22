import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavLightTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import 'react-native-reanimated'

import { adaptNavigationTheme, PaperProvider } from 'react-native-paper'
import { AppDarkTheme, AppLightTheme, StackHeader } from '@/ui'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationDark: NavDarkTheme,
    reactNavigationLight: NavLightTheme,
    materialDark: AppDarkTheme,
    materialLight: AppLightTheme,
  })

  return (
    <ThemeProvider
      value={
        colorScheme === 'dark'
          ? { ...DarkTheme, fonts: NavDarkTheme.fonts }
          : { ...LightTheme, fonts: NavLightTheme.fonts }
      }
    >
      <PaperProvider
        theme={colorScheme === 'dark' ? AppDarkTheme : AppLightTheme}
      >
        <Stack
          screenOptions={{
            header: (props) => (
              <StackHeader navProps={props} children={undefined} />
            ),
          }}
        >
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="search" options={{ title: 'Search' }} />
          <Stack.Screen name="+not-found" />
        </Stack>

        <StatusBar style="auto" />
      </PaperProvider>
    </ThemeProvider>
  )
}
