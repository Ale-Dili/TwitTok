import * as React from 'react';
import { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import User from './User';
import FollowedList from './FollowedList';

const Stack = createNativeStackNavigator();

function FollowedScreen(){
      return (
        <Stack.Navigator initialRouteName="List">
          <Stack.Screen name="List" component={FollowedList} options={{title: 'Followed Twokker',headerStyle: { backgroundColor: '#fcba03' }}} />
          <Stack.Screen name="SingleUser" component={User} options={{title: 'TwitTwok',headerStyle: { backgroundColor: '#fcba03' }}}/> 
        </Stack.Navigator>
      ); 
  }

  export default FollowedScreen