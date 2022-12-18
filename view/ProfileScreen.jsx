import * as React from 'react';
import { Text, SafeAreaView, ActivityIndicator, View, Image, StyleSheet, TouchableOpacity, Button, TextInput, ImageBackground, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import defaultPic from '../assets/TwitTokImg/defaultPic.png'
import ContextUserInfo from '../ContextUserInfo';
import editPic from '../assets/TwitTokImg/edit.png'

const styles = StyleSheet.create({
  profileImg: {
    height: 300,
    width: 300,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  keyboardUp: {
    flex: 1
  }
})


function ProfileScreen() {
  const [img, setImg] = useState()
  const [name, setName] = useState()
  const [isChanged, setIsChanged] = useState(false)
  const [text, setText] = useState(name);

  const context = useContext(ContextUserInfo)
  let helper = context.helper



  useEffect(() => {

    async function onMount() {
      if (!context.sid) {
        return <ActivityIndicator size="small" color="#000000"></ActivityIndicator>
      }

      let result = await helper.getProfile(context.sid)
      setName(result.name)
      setText(result.name)
    }
    onMount()
  }, [context])


  function renderImage() {
    return (
      <ImageBackground style={styles.profileImg} source={defaultPic}>
        {/* <Image source={editPic} style={{position:'absolute', right:0}}></Image> */}
        <Text>{'Modifica'}</Text>

      </ImageBackground>
      // <Image style={styles.profileImg} source={defaultPic}></Image>
    )
  }


  function cancelChanges() {
    console.log('changes cancelled')
    setText(name)
    setIsChanged(false)
  }

  function saveChanges() {
    console.log('changes saved')
    helper.setProfile(text)
    setIsChanged(false)
    setName(text)

  }

  function renderButton() {
    if (isChanged) {
      return (
        <View >
          <Button title='Cancel' onPress={(() => { cancelChanges() })}></Button>
          <Button title='Save' onPress={(() => { saveChanges() })}></Button>
        </View>
      )
    }
  }

  function changeImg() {
    //...
    setIsChanged(true)
  }

  function onChangeText(newText) {
    console.log(name)
    if (newText !== name) {
      setIsChanged(true)
    } else {
      setIsChanged(false)
    }
    setText(newText)
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.keyboardUp} keyboardVerticalOffset={0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>


          <View>
            <TouchableOpacity onPress={() => { changeImg() }}>
              {renderImage()}
            </TouchableOpacity>
          </View>
          <View>
            <TextInput
              style={styles.input}
              onChangeText={(newText) => onChangeText(newText)}
              value={text}
              maxLength={20}
            />
          </View>
          {renderButton()}


        </SafeAreaView>

      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>


  );
}

export default ProfileScreen