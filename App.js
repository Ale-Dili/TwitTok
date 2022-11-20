import * as React from 'react';
import { Text, SafeAreaView, Button, View, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Component } from 'react/cjs/react.production.min';
import TwokRow from './TwokRow';
import TwoksBuffer from './model/twoksBuffer';
import CommunicationController from './model/CommunicationController';
import Helper from './viewModel/helper';




const sid = "KQW81h8HDaswwBIvBjG8"
const helper = new Helper()

class FeedScreen extends Component {

  state = {
    twoksBuffer: new TwoksBuffer(),
  }

  async loadData() {


    this.state.twoksBuffer=await helper.addTwok(this.state.twoksBuffer,sid)

    //console.log(this.state.twoksBuffer.twoks)
    this.setState(this.state)
  }
  componentDidMount() {
    this.loadData()
  }

  render() {

    console.log("render called")
    //console.log(this.state.twoksBuffer.twoks)
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: '20%' }}>
        
        <SafeAreaView style={styles.container}>
          <FlatList data={this.state.twoksBuffer.twoks}
            renderItem={(twok) => { return <TwokRow data={twok} /> }}
            keyExtractor={(twok, index) => index}
            snapToInterval={Dimensions.get('window').height}
            snapToAlignment="start"
            decelerationRate="fast"
            onScrollEndDrag={() => this.loadData()}
          />

        </SafeAreaView>
        <View style={{ bottom: '2%', position: "absolute" }}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.loadData()}>
            <View>
              <Image
                style={{ height: 50, width: 50 }}
                source={require('./assets/TwitTokImg/plus-sign.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}


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
  }
});


function FollowedScreen() {

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Followed user</Text>
    </SafeAreaView>
  );
}

function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {

  return (
    <>
      <Tab.Navigator
        initialRouteName="TwikTok"
        screenOptions={{
          tabBarActiveTintColor: '#000000',
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { backgroundColor: '#fcba03' },
        }}
      >

        <Tab.Screen
          name="Followed"
          component={FollowedScreen}
          options={{ tabBarLabel: 'Followed', headerStyle: { backgroundColor: '#fcba03' } }}
        />
        <Tab.Screen
          name="TwikTok"
          component={FeedScreen}
          options={{ tabBarLabel: 'TwikTok', headerStyle: { backgroundColor: '#fcba03' } }}>

        </Tab.Screen>
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ tabBarLabel: 'Profile', headerStyle: { backgroundColor: '#fcba03' } }}
        />
      </Tab.Navigator>
    </>
  );
}

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    );
  }
}

export default App
