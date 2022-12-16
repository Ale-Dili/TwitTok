import * as React from 'react';
import { useState, useEffect, useContext, useCallback } from 'react';
import { Text, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import Helper from '../viewModel/Helper';
import FollowedUserRow from './FollowedUserRow';
import ContextUserInfo from '../ContextUserInfo';
import { useFocusEffect } from '@react-navigation/native';




function FollowedList({ navigation }) {
    const context = useContext(ContextUserInfo)
    let helper = context.helper


    const [buffer, setBuffer] = useState([])
    const [waiting, setWaiting] = useState(true)


    useEffect(() => {

        async function onMount() {
            if (!context.sid) {
                console.log('loading')
                return
            }

            var temp = await helper.getFollowed()
            setWaiting(false)
            setBuffer(temp)
        }

        onMount()

        //console.log(state)
    }, [])


    useFocusEffect(
        useCallback(() => {
            async function onFocus() {
                var temp = await helper.getFollowed()
                setBuffer(temp)
            }
            onFocus()
        }, [])
    );


    if (waiting) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: '20%' }}>
                <ActivityIndicator size="small" color="#0000ff" />
                <Text>{'If this take too long, please check your connectivity'}</Text>
            </SafeAreaView>)
    }
    if (buffer.length == 0) {

        return (
            <SafeAreaView  style={{alignItems:'center',justifyContent: 'center', flex:1}}>
                <Text>{'You are not following anyone'}</Text>
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FlatList data={buffer} renderItem={({ item, index }) => {
                return (
                    <FollowedUserRow data={item} index={index} navigation={navigation} ></FollowedUserRow>
                )
            }}></FlatList>
        </SafeAreaView>
    )
}
export default FollowedList