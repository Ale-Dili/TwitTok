import React, { useState, useEffect, useContext } from 'react';
import { Text, SafeAreaView, Button, View, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList, } from 'react-native';
import { Component } from 'react';
import TwokRow from './TwokRow';
import TwoksBuffer from './model/twoksBuffer';
import Helper from './viewModel/Helper';
import ContextUserInfo from './ContextUserInfo';


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
    backgroundColor: '#fcba03'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

//const sid = "KQW81h8HDaswwBIvBjG8"
//const helper = new Helper(sid)

function FeedScreen() {
  const [state, setState] = useState({ twoksBuffer: new TwoksBuffer(),})

  
  const context = useContext(ContextUserInfo)
  let helper = context.helper

  //console.log()

  useEffect(() => {
    async function onMount() {
      console.log("mount feed")
      for (var i = 0; i < 5; i++) {
        state.twoksBuffer = await helper.addTwok(state.twoksBuffer)
      }
      setState(state)
    }
    onMount()
  },[])



  async function loadData() {
    state.twoksBuffer = await helper.addTwok(state.twoksBuffer)
    setState(state)
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: '20%' }}>
      <SafeAreaView style={styles.container}>
        <FlatList data={state.twoksBuffer.twoks}
          renderItem={(twok) => { return <TwokRow data={twok} helper={helper} /> }}
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
          onPress={() => setState(state)}>
          <View>
            <Image
              style={{ height: 50, width: 50 }}
              source={require('./assets/TwitTokImg/plus-sign.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}


export default FeedScreen