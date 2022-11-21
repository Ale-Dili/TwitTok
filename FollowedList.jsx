import * as React from 'react';
import { Text, SafeAreaView, Button, View, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Component } from 'react';
import TwoksBuffer from './model/twoksBuffer';
import CommunicationController from './model/CommunicationController';
import Helper from './viewModel/Helper';
import FollowedUserRow from './FollowedUserRow';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from './FeedScreen';
import ProfileScreen from './ProfileScreen';
import FollowedScreen from './FollowedScreen';

const sid = "KQW81h8HDaswwBIvBjG8"

class FollowedList extends Component {
    state = {
        followed: []
    }
    helper
    async componentDidMount() {
        this.helper = new Helper(sid)
        this.state.followed = await this.helper.getFollowed(sid)
        //console.log(this.state.followed)
        this.setState(this.state)
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <FlatList data={this.state.followed} renderItem={({ item, index }) => (

                    <TouchableOpacity onPress={() => (this.props.navigation.navigate('SingleUser'))}>
                        <FollowedUserRow data={item} index={index}></FollowedUserRow>
                    </TouchableOpacity>

                )
                }></FlatList>
            </SafeAreaView>
        )
    }
}
export default FollowedList