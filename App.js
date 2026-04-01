// App.js - Root Navigation Component
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, Text } from 'react-native';
import { colors } from './src/utils/colors';

// Import Screens
import DashboardScreen from './src/screens/DashboardScreen';
import WeatherScreen from './src/screens/WeatherScreen';
import PricesScreen from './src/screens/PricesScreen';
import CropsScreen from './src/screens/CropsScreen';
import ChatScreen from './src/screens/ChatScreen';

const Tab = createBottomTabNavigator();

/**
 * Root App Component
 * Sets up bottom tab navigation with 5 main screens
 */
export default function App() {
  return (
    <>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={colors.background}
      />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.muted,
            tabBarStyle: {
              backgroundColor: colors.background,
              borderTopColor: colors.border,
              borderTopWidth: 1,
              paddingBottom: 5,
            },
          }}
        >
          <Tab.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
              title: 'Home',
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                // Using emoji as icon (native alternative)
                <Text style={{ fontSize: size, color }}>🏠</Text>
              ),
            }}
          />
          <Tab.Screen
            name="Weather"
            component={WeatherScreen}
            options={{
              title: 'Weather',
              tabBarLabel: 'Weather',
              tabBarIcon: ({ color, size }) => (
                <Text style={{ fontSize: size, color }}>⛅</Text>
              ),
            }}
          />
          <Tab.Screen
            name="Prices"
            component={PricesScreen}
            options={{
              title: 'Prices',
              tabBarLabel: 'Prices',
              tabBarIcon: ({ color, size }) => (
                <Text style={{ fontSize: size, color }}>💹</Text>
              ),
            }}
          />
          <Tab.Screen
            name="Crops"
            component={CropsScreen}
            options={{
              title: 'Crops',
              tabBarLabel: 'Crops',
              tabBarIcon: ({ color, size }) => (
                <Text style={{ fontSize: size, color }}>🌱</Text>
              ),
            }}
          />
          <Tab.Screen
            name="Chat"
            component={ChatScreen}
            options={{
              title: 'Chat',
              tabBarLabel: 'Chat',
              tabBarIcon: ({ color, size }) => (
                <Text style={{ fontSize: size, color }}>💬</Text>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
