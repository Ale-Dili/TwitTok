import * as React from 'react';
import { Text, SafeAreaView, StatusBar, Button, View, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Constants from 'expo-constants'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Component } from 'react/cjs/react.production.min';

function FeedScreen() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: '20%' }}>

      <Text>Twok</Text>
      <View style={{ bottom: '5%', position: "absolute" }}>
        <TouchableOpacity
          style={{ borderRadius: 100, paddingVertical: 15, paddingHorizontal: 15, backgroundColor: '#fcba03' }}
          onPress={() => doSomething}>
          <View>
            <Image
              style={{height:50, width:50}}
              source={require('./assets/TwitTokImg/plus-sign.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function doSomething() {

}

function FollowedScreen() {

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Followed user</Text>
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

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <>
      <Tab.Navigator
        initialRouteName="TwikTok"
        screenOptions={{
          tabBarActiveTintColor: '#000000',
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { backgroundColor: '#fcba03' },
        }}
      >

        <Tab.Screen
          name="Followed"
          component={FollowedScreen}
          options={{ tabBarLabel: 'Followed', headerStyle: { backgroundColor: '#fcba03' } }}
        />
        <Tab.Screen
          name="TwikTok"
          component={FeedScreen}
          options={{ tabBarLabel: 'TwikTok', headerStyle: { backgroundColor: '#fcba03' } }}

        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ tabBarLabel: 'Profile', headerStyle: { backgroundColor: '#fcba03' } }}
        />
      </Tab.Navigator>
    </>
  );
}
class App extends Component {
  render(){
    return (
      <NavigationContainer>
  
        <MyTabs />
      </NavigationContainer>
  
  
    );
  }
}

export default App
