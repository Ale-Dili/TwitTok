import * as React from 'react';
import { Text, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Constants from 'expo-constants'

function FeedScreen() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: '20%' }}>

      <Text>Feed</Text>
    </SafeAreaView>
  );
}

function NotificationsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </SafeAreaView>
  );
}

function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
    </SafeAreaView>
  );
}

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { backgroundColor: 'powderblue',paddingTop: Constants.statusBarHeight },
        }}
      >

        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{ tabBarLabel: 'Home' }}

        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{ tabBarLabel: 'Updates' }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ tabBarLabel: 'Profile' }}
        />
      </Tab.Navigator>
    </>
  );
}
export default function App() {
  return (
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>


  );
}
