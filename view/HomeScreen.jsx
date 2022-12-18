import React, { useState, useEffect, useContext } from 'react';
import { Text, SafeAreaView, Button, View, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList, ActivityIndicator, } from 'react-native';
import { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TwokRow from './TwokRow';
import TwoksBuffer from '../model/twoksBuffer';
import Helper from '../viewModel/Helper';
import ContextUserInfo from '../ContextUserInfo';
import FeedScreen from './FeedScreen';
import User from './User';
import Maps from './Maps.jsx'
import AddTwok from './AddTwok';

const Stack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <Stack.Navigator initialRouteName="Feed" screenOptions={{headerTitleStyle :{color:'#4502b0'}}}>
      <Stack.Screen name="Feed" component={FeedScreen} options={{title: 'TwitTok',headerStyle: { backgroundColor: '#fcba03' }}} />
      <Stack.Screen name="SingleUser" component={User} options={{title: 'TwitTwok',headerStyle: { backgroundColor: '#fcba03' }}}/>
      <Stack.Screen name="Maps" component={Maps} options={{title: 'Twokked from...',headerStyle: { backgroundColor: '#fcba03' }}}/>
      <Stack.Screen name="AddTwok" component={AddTwok} options={{title: 'New Twok',headerStyle: { backgroundColor: '#fcba03' }}}/>
    </Stack.Navigator>
  );
}
export default HomeScreen