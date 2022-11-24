import React, { useState, useEffect, useContext } from 'react';
import { Text, SafeAreaView, Button, View, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList, ActivityIndicator, } from 'react-native';
import { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TwokRow from './TwokRow';
import TwoksBuffer from '../model/twoksBuffer';
import Helper from '../viewModel/Helper';
import ContextUserInfo from '../ContextUserInfo';
import FeedScreen from './FeedScreen';
import FollowedUser from './FollowedUser';


const Stack = createNativeStackNavigator();

function HomeScreen(){
    return (
        <Stack.Navigator initialRouteName="Feed">
          <Stack.Screen name="Feed" component={FeedScreen} options={{headerShown: false}}/>
          <Stack.Screen name="SingleUser" component={FollowedUser} /> 
        </Stack.Navigator>
      ); 
}
export default HomeScreen