import * as React from 'react';
import { Text, SafeAreaView, ActivityIndicator } from 'react-native';


function ProfileScreen() {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
           <ActivityIndicator size="small" color="#000000" animating={true}/>

      </SafeAreaView>
    );
  }

  export default ProfileScreen