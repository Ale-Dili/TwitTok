import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Component } from 'react';
import HomeScreen from './view/HomeScreen.jsx';
import ProfileScreen from './view/ProfileScreen';
import FollowedScreen from './view/FollowedScreen';
import ContextUserInfo from './ContextUserInfo';
import Helper from './viewModel/Helper';
import AsyncStorage from '@react-native-async-storage/async-storage';





//const sid = "KQW81h8HDaswwBIvBjG8"
const Tab = createBottomTabNavigator();




function MyTabs() {
  //console.log(React.useContext(ContextUserInfo))

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
            component={HomeScreen}
            options={{ tabBarLabel: 'TwikTok', headerStyle: { backgroundColor: '#fcba03' } }}
          >
            {/* initialParams={{helper:helper}} . this.props.route.params */}

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

function App() {
  let helper
  const[sid, setSid]=React.useState()

  React.useEffect(()=>{
    async function f(){
      helper = new Helper()
      result = await helper.getSid()
      helper.checkAndRepairStorage()
       //helper.isPresent(1,1, result=>{console.log(result)})
      //await helper.checkStorage()
      //console.log('sid: '+result)
      setSid(result)
    }
    f()
  },[])

  //console.log(sid)

  return (
    <NavigationContainer>

      <ContextUserInfo.Provider value={{sid: sid, helper: new Helper(sid) }}>
        <MyTabs />
      </ContextUserInfo.Provider>

    </NavigationContainer>
  );

}



export default App
