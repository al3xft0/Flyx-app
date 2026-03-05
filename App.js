import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { colors } from './src/theme/colors';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import IPTVScreen from './src/screens/IPTVScreen';
import LibraryScreen from './src/screens/LibraryScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import DetailScreen from './src/screens/DetailScreen';
import PlayerScreen from './src/screens/PlayerScreen';
import IPTVPlayerScreen from './src/screens/IPTVPlayerScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Bottom Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 64,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          )
        }} 
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          )
        }} 
      />
      <Tab.Screen 
        name="IPTV" 
        component={IPTVScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="tv" size={size} color={color} />
          )
        }} 
      />
      <Tab.Screen 
        name="Library" 
        component={LibraryScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" size={size} color={color} />
          )
        }} 
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          )
        }} 
      />
    </Tab.Navigator>
  );
}

// Root Stack Navigator
export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <StatusBar barStyle="light-content" backgroundColor={colors.background} />
        <ActivityIndicator color={colors.accent} size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          contentStyle: { backgroundColor: colors.background }
        }}
      >
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen 
          name="Detail" 
          component={DetailScreen} 
          options={{ 
            animation: 'slide_from_bottom',
            presentation: 'modal'
          }} 
        />
        <Stack.Screen 
          name="Player" 
          component={PlayerScreen} 
          options={{ 
            animation: 'fade',
            orientation: 'landscape'
          }} 
        />
        <Stack.Screen 
          name="IPTVPlayer" 
          component={IPTVPlayerScreen} 
          options={{ 
            animation: 'fade',
            orientation: 'landscape'
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
