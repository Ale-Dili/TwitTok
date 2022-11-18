import * as React from 'react';
import { Text, SafeAreaView, StatusBar, Button, View, TouchableOpacity, Image,StyleSheet, Dimensions, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Component } from 'react/cjs/react.production.min';
import TwokRow from './TwokRow';


function FeedScreen() {
  const twoks = [
    { "tid": 1, "text": "ciao come va?" },
    { "tid": 1, "text": "Male, malissimo" },
    { "tid": 1, "text": "Buongiorno caffè?" },
    { "tid": 1, "text": "Che schifo" },

  ]

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: '20%' }}>

      <SafeAreaView style={styles.container}>
        <FlatList style={styles.listStyle} data={twoks}
          renderItem={(twok) => { return <TwokRow data={twok} /> }}
          keyExtractor={(twok) => twok.id}
          snapToInterval={Dimensions.get('window').height}
          snapToAlignment="start"
          decelerationRate="fast"
          onScrollEndDrag={() => console.log("Ho Scrollato")}
        />
        <StatusBar style="auto" />
      </SafeAreaView>
      <View style={{ bottom: '5%', position: "absolute" }}>
        <TouchableOpacity
          style={{ borderRadius: 100, paddingVertical: 15, paddingHorizontal: 15, backgroundColor: '#fcba03' }}
          onPress={() => doSomething}>
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
  }
});

function doSomething() {

}

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
          options={{ tabBarLabel: 'TwikTok', headerStyle: { backgroundColor: '#fcba03' } }}

        />
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
