import * as React from 'react';
import { useState, useEffect, useContext,useCallback } from 'react';
import { Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import Helper from '../viewModel/Helper';
import FollowedUserRow from './FollowedUserRow';
import ContextUserInfo from '../ContextUserInfo';
import { useFocusEffect } from '@react-navigation/native';




function FollowedList({ navigation }) {
    const context = useContext(ContextUserInfo)
    let helper = context.helper


    const [buffer, setBuffer] = useState([])


    useEffect(() => {

        async function onMount() {
            if (!context.sid) {
                return <ActivityIndicator size="small" color="#000000"></ActivityIndicator>
            }
            var temp = await helper.getFollowed()
            setBuffer(temp)
        }

        onMount()

        //console.log(state)
    }, [])


    useFocusEffect(
        useCallback(() => {
            async function onFocus(){
                var temp = await helper.getFollowed()
                setBuffer(temp)
            }
            onFocus()
        }, [])
      );

    console.log(buffer)
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