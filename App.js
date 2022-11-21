import * as React from 'react';
import { Text, SafeAreaView, Button, View, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Component } from 'react/cjs/react.production.min';
import TwokRow from './TwokRow';
import TwoksBuffer from './model/twoksBuffer';
import CommunicationController from './model/CommunicationController';
import Helper from './viewModel/helper';
import FollowedUserRow from './followedUserRow';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




const sid = "KQW81h8HDaswwBIvBjG8"
const helper = new Helper(sid)
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


class FeedScreen extends Component {

  state = {
    twoksBuffer: new TwoksBuffer(),
  }


  async loadData() {

    this.state.twoksBuffer = await helper.addTwok(this.state.twoksBuffer, sid)
    this.setState(this.state)
  }

  async componentDidMount() {
    for (var i = 0; i < 5; i++) {
      this.state.twoksBuffer = await helper.addTwok(this.state.twoksBuffer, sid)
    }
    this.setState(this.state)
  }

  render() {

    //console.log("render called")
    //console.log(this.state.twoksBuffer.twoks)
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: '20%' }}>
        <SafeAreaView style={styles.container}>
          <FlatList data={this.state.twoksBuffer.twoks}
            renderItem={(twok) => { return <TwokRow data={twok} helper={helper} /> }}
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
            onPress={() => this.setState(this.state)}>
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

class FollowedScreen extends Component {


  render() {
    //console.log(this.props.navigation.navigate)
    return (
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="List" component={FollowedList} />
       <Stack.Screen name="SingleUser" component={FeedScreen} /> 
      </Stack.Navigator>
    );
  }
}

class FollowedList extends Component {
  state = {
    followed: []
  }

  async componentDidMount() {

    this.state.followed = await helper.getFollowed(sid)
    //console.log(this.state.followed)
    this.setState(this.state)
  }
  render(){
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

function ProfileScreen() {
  var text = "ciao"
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={styles.input}

        value={text}
      />
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
