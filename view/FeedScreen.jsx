import React, { useState, useEffect, useContext } from 'react';
import { Text, SafeAreaView, Button, View, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList, ActivityIndicator, } from 'react-native';
import { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TwokRow from './TwokRow';
import TwoksBuffer from '../model/twoksBuffer';
import Helper from '../viewModel/Helper';
import ContextUserInfo from '../ContextUserInfo';
import AddTwok from './AddTwok';
import colors from '../assets/colors';



const styles = StyleSheet.create({
  twokStyle: {
    width: "100%",
    height: Dimensions.get('window').height,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 40,
    fontWeight: "700"
  },
  buttonStyle: {
    borderRadius: 100,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: colors.blue
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
//-----------------------TIDSEQUENCE--------------------
const tidSequence = -1

//------------------------------------------------------


//const sid = "KQW81h8HDaswwBIvBjG8"
//const helper = new Helper(sid)

function FeedScreen({ props, navigation }) {

  const [state, setState] = useState(new TwoksBuffer())
  const [waiting, setWaiting] = useState(true)


  const context = useContext(ContextUserInfo)
  let helper = context.helper



  useEffect(() => {
    async function onMount() {
      if (!context.sid) {
        console.log('Loading')
        return
      }

      let stateTemp = new TwoksBuffer
      for (var i = 0; i < 5; i++) {
        stateTemp = await helper.getTwok(stateTemp,null,tidSequence)
      }
      setWaiting(false)
      setState(stateTemp)
    }
    
    onMount()
  }, [context])



  async function loadData() {
    let stateTemp = state
    stateTemp = await helper.getTwok(stateTemp,null,tidSequence)
    setState(stateTemp)
  }


  if (waiting) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: '20%' }}>
        <ActivityIndicator size="small" color={colors.coral}/>
        <Text>{'If this take too long, please check your connectivity'}</Text>
      </SafeAreaView>)
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: '20%' }}>
      <SafeAreaView style={styles.container}>
        <FlatList data={state.twoks}
          renderItem={(twok) => { return <TwokRow data={twok} helper={helper} navigation={navigation} touchDisabled={false} /> }}
          keyExtractor={(twok, index) => index}
          snapToInterval={Dimensions.get('window').height}
          snapToAlignment="start"
          decelerationRate="fast"
          onScrollEndDrag={() => loadData()}
        />

      </SafeAreaView>
      <View style={{ bottom: '2%', position: "absolute" }}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('AddTwok')}>
          <View>
            <Image
              style={{ height: 50, width: 50 , tintColor:'#FFFFFF'}}
              source={require('../assets/TwitTokImg/plus-sign.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}


export default FeedScreen