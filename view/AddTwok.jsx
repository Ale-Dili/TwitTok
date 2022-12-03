import { Text, View, TextInput, StyleSheet,TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from "react-native"
import { useContext, useEffect, useState } from "react"
import ContextUserInfo from "../ContextUserInfo"


const styles = StyleSheet.create({
    profileImg: {
        height: 300,
        width: 300,
    },
    input: {
        height: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,


    },
    keyboardUp: {
        flex: 1
    }
})

export default function AddTwok() {

    const context = useContext(ContextUserInfo)
    let helper = context.helper

    const [text, setText] = useState();

    useEffect(() => {
        async function onMount() {
            if (!context.sid) {
                return <ActivityIndicator size="small" color="#000000"></ActivityIndicator>
            }

        }
        onMount()
    }, [context])
    //!!!!!!!!!!!!!!!!!!!!!!!Dopo aver mandato il twok, resettare lo stato
  
    return (
        // <KeyboardAvoidingView behavior='padding' style={styles.keyboardUp} keyboardVerticalOffset={0}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex:1}}>
                <TextInput
                    style={styles.input}
                    onChangeText={(newText) => setText(newText)}
                    value={text}
                />
            </View >
            
        </TouchableWithoutFeedback>
    // </KeyboardAvoidingView >
    )
}