import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Component } from 'react';
import FeedScreen from './FeedScreen';
import ProfileScreen from './ProfileScreen';
import FollowedScreen from './FollowedScreen';




const sid = "KQW81h8HDaswwBIvBjG8"
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
          >
            {/* initialParams={{helper:helper}} . this.props.route.params */}

        </Tab.Screen>
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
  render() {
    return (
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    );
  }
}

export default App
