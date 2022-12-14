import * as React from 'react';
import { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import User from './User';
import FollowedList from './FollowedList';
import colors from '../assets/colors';

const Stack = createNativeStackNavigator();

function FollowedScreen(){
      return (
        <Stack.Navigator initialRouteName="List" screenOptions={{headerTitleStyle :{color:colors.lightBlue}}}>
          <Stack.Screen name="List" component={FollowedList} options={{title: 'Followed Twokker',headerStyle: { backgroundColor: colors.blue }}} />
          <Stack.Screen name="SingleUser" component={User} options={{title: 'TwitTwok',headerStyle: { backgroundColor: colors.blue }}}/> 
        </Stack.Navigator>
      ); 
  }

  export default FollowedScreen