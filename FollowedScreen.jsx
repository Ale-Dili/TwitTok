import * as React from 'react';
import { Text, SafeAreaView, Button, View, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Component } from 'react';
import TwokRow from './TwokRow';
import TwoksBuffer from './model/twoksBuffer';
import CommunicationController from './model/CommunicationController';
import Helper from './viewModel/Helper';
import FollowedUserRow from './FollowedUserRow';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from './FeedScreen';
import FollowedUser from './FollowedUser';
import FollowedList from './FollowedList';

const Stack = createNativeStackNavigator();

class FollowedScreen extends Component {

    render() {
      //console.log(this.props.navigation.navigate)
      return (
        <Stack.Navigator initialRouteName="List">
          <Stack.Screen name="List" component={FollowedList} />
          <Stack.Screen name="SingleUser" component={FollowedUser} /> 
        </Stack.Navigator>
      );
    }
  }

  export default FollowedScreen