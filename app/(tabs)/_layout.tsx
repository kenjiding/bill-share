import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View, Text } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bill"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, focused }) => (
            <View className='absolute -top-10 h-20 w-20 rounded-full border-1 border-white
            bg-blue-400 justify-center items-center shadow-gray-300 shadow-sm'>
              <Text className='font-serif text-white text-2xl'>Bill</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="person"
        options={{
          title: 'Me',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
