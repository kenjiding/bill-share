import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../styles/global.css';
import { useColorScheme } from '@/hooks/useColorScheme';
import GlobalLoading from '@/components/GlobalLoading';
// import { useRouter } from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const router = useRouter();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    // router.replace('/login');
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GlobalLoading></GlobalLoading>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name='(tabs)' options={{ headerShown: false, title: 'Tabs' }} />
        <Stack.Screen name='(auth)/login/index'
          options={{ headerShown: false, title: 'Login' }} />
        <Stack.Screen name='(auth)/register/index' options={{
          headerShown: false,
          // headerTitle: props => <Text {...props}></Text>, 
          // headerLeft: () => <AntDesign name="arrowleft" size={24} color="black" />,
        }} />
        <Stack.Screen name='+not-found' options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
