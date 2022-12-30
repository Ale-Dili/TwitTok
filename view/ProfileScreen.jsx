import * as React from 'react';
import { Text, SafeAreaView, ActivityIndicator, View, Image, StyleSheet, TouchableOpacity, Button, TextInput, ImageBackground, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Pressable } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import defaultPic from '../assets/TwitTokImg/defaultPic.png'
import defaultPic2 from '../assets/TwitTokImg/defaultPic2.png'
import ContextUserInfo from '../ContextUserInfo';
import editPic from '../assets/TwitTokImg/edit.png'
import colors from '../assets/colors';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from "expo-file-system"

const styles = StyleSheet.create({
  profileImg: {
    height: 300,
    width: 300,

  },
  viewInput: {
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    height: 70,
    margin: 12,
    borderWidth: 6,
    padding: 10,
    borderRadius: 25,
    color: colors.blue,
    borderColor: colors.coral,
    fontSize: 30,
    fontWeight: '700',
  },
  viewImg: {
    flex: 5,
    justifyContent: 'center'
  },
  keyboardUp: {
    flex: 1
  },
  viewButton: {
    flex: 2,

    flexDirection: 'row'
  },
  button: {
    fontWeight: '700',
  },
  editImgButton: {
    color: colors.blue,
    fontSize: 25,
    fontWeight: '800',
    borderColor: colors.lightBlue,
    borderWidth: 3,
    width: '45%',
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    padding: 5
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
      if (result.picture) {
        setImg(result.picture)
      } else {
        setImg(defaultPic)
      }
      setName(result.name)
      setText(result.name)
    }
    onMount()
  }, [context])


  function renderImage() {
    //.log('foto:'+img)
    if (img === defaultPic){
      return (
        <ImageBackground style={styles.profileImg} source={img}>
          <TouchableOpacity style={{ borderRadius: 15 }} onPress={() => { changeImg() }}>
            <Text style={styles.editImgButton}>{'Modifica'}</Text>
          </TouchableOpacity>
        </ImageBackground>
      )
    }else{
      return (
        <ImageBackground style={styles.profileImg} source={{uri:img}}>
          <TouchableOpacity style={{ borderRadius: 15 }} onPress={() => { changeImg() }}>
            <Text style={styles.editImgButton}>{'Modifica'}</Text>
          </TouchableOpacity>
        </ImageBackground>
      )
    }

  }

  async function changeImg() {
    const img = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true
    })

    const base64Img = await FileSystem.readAsStringAsync(img.assets[0].uri, { encoding: "base64" })

    setImg('data:image/png;base64,' + base64Img)
    //setImg(defaultPic2)
    setIsChanged(true)
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
        <>
          <Button style={styles.button} title='Cancel' onPress={(() => { cancelChanges() })}></Button>
          <Button style={styles.button} title='Save' onPress={(() => { saveChanges() })}></Button>
        </>
      )
    }
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

        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>


          <View style={styles.viewImg}>

            {renderImage()}

          </View>
          <View style={styles.viewInput}>
            <TextInput
              style={styles.input}
              onChangeText={(newText) => onChangeText(newText)}
              value={text}
              maxLength={20}
            />
          </View>
          <View style={styles.viewButton}>
            {renderButton()}
          </View>


        </SafeAreaView>


      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>



  );
}

export default ProfileScreen