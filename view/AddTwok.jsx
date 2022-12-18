import { Text, View, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity, Image, SafeAreaView, ActivityIndicator, Button, Switch } from "react-native"
import { useContext, useEffect, useRef, useState } from "react"
import ContextUserInfo from "../ContextUserInfo"
import textColoring from '../assets/TwitTokImg/text-coloring.png'
import post from '../assets/TwitTokImg/post.png'
import colors from "../assets/colors"




export default function AddTwok() {



    const context = useContext(ContextUserInfo)
    let helper = context.helper

    const [text, setText] = useState('');
    const [fonttype, setFonttype] = useState(0); //tutti i pulsanti che appaiono sono numerati da 1 a 3, ma nella codifca vanno da 0 a 2 come da  rihchiesta
    const [fontSize, setFontSize] = useState(0)
    const [textColor, setTextColor] = useState('000000')
    const [backgroundColor, setBackgroundColor] = useState('FFFFFF')

    const [valign, setValign] = useState(0)
    const [halign, setHalign] = useState(0)

    const [isGps, setIsGps] = useState(false)


    const [waiting, setWaiting] = useState(true)
    const [page, setPage] = useState(1)  // 1 -> text / 2-> color / 3->positioning / 3-> post twok
    const styles = StyleSheet.create({
        profileImg: {
            height: 300,
            width: 300,
        },
        preview: {
            height: 300,
            margin: 12,
            borderWidth: 1,
            padding: 5,
            borderRadius: 10,
            backgroundColor: '#' + backgroundColor,
            justifyContent: getAlign(valign),
            alignItems: getAlign(halign)


        },
        textPreview: {
            fontWeight: '700',
            fontSize: renderFontSize(),
            fontFamily: renderFonttype(),
            color: '#' + textColor,
            textAlign: getTextAlign(halign)
        },
        keyboardUp: {
            flex: 1
        },
        twokOption: {
            backgroundColor: colors.coral,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30



        },
        twokOptionButton: {
            color: colors.blue,
            fontWeight: "700",

        },
        textOptionScreen: {
            width: '100%',
            flex: 1,
            position: 'relative',

        },
        colorOptionScreen: {

        },
        positionOptionScreen: {

        },
        inputTextTwok: {
            width: '100%',
            flex: 1,
            position: 'relative',

            borderRadius: 10,
            borderWidth: 3,
            fontWeight: '700',
            fontSize: 23,
            margin: 10,
            borderColor: colors.coral,
            padding: 10,
            color: colors.blue

        },
        colorInputText: {
            width: '100%',
            height: '50%',
            flex: 1,
            position: 'relative',

            borderRadius: 10,
            borderWidth: 3,
            fontWeight: '700',
            fontSize: 23,
            margin: 10,
            borderColor: colors.coral,
            padding: 10,
            color: colors.blue
        },
        screen: {
            flex: 6,
            margin: 10
        },
        label: {
            fontWeight: "700",
            fontSize: 18,
            color: colors.blue
        }

    })

    useEffect(() => {
        async function onMount() {
            if (!context.sid) {
                console.log('Loading...')
                return
            }
            setWaiting(false)

        }
        onMount()
    }, [context])
    //!!!!!!!!!!!!!!!!!!!!!!!Dopo aver mandato il twok, resettare lo stato

    //---------Waiting---------
    if (waiting) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: '20%' }}>
                <ActivityIndicator size="small" color="#0000ff" />
                <Text>{'If this take too long, please check your connectivity'}</Text>
            </SafeAreaView>)
    }
    //-------------------------

    //---------Preview Functions--------
    function renderFonttype() {
        switch (fonttype) {
            case 0:
                return 'System'
                break;
            case 1:
                return 'Futura'
                break;
            case 2:
                return 'Courier New'
                break;
            default:
                return 'System'

        }
    }

    function renderFontSize() {
        return 15 + 10 * fontSize
    }

    function handleSwitchGps() {
        setIsGps(!isGps)
    }

    //----------------------------


    function renderPage() {
        switch (page) {
            case 1:
                return (
                    <View style={styles.textOptionScreen}>
                        <View style={{ flex: 2, flexDirection: 'row', }}>
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={styles.label}>{'Twok'}</Text>
                            </View>
                            <TextInput
                                style={styles.inputTextTwok}
                                onChangeText={(newText) => setText(newText)}
                                value={text}

                                maxLength={100}
                                onBlur={() => console.log('blur')}
                                placeholder={text}
                            />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                            <View style={{ flex: 1, }}>
                                <Text style={styles.label}>{'Size'}</Text>
                            </View>
                            <View style={{ flex: 6, height: '60%', justifyContent: "space-evenly", flexDirection: 'row' }}>
                                <TouchableOpacity style={[styles.twokOption, { width: '15%' }]} onPress={() => setFontSize(0)}>
                                    <Text style={styles.twokOptionButton}>{'1'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.twokOption, { width: '15%' }]} onPress={() => setFontSize(1)}>
                                    <Text style={styles.twokOptionButton}>{'2'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.twokOption, { width: '15%' }]} onPress={() => setFontSize(2)}>
                                    <Text style={styles.twokOptionButton}>{'3'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                            <View style={{ flex: 1, }}>
                                <Text style={styles.label}>{'Font'}</Text>
                            </View>
                            <View style={{ flex: 6, height: '60%', justifyContent: "space-evenly", flexDirection: 'row' }}>
                                <TouchableOpacity style={[styles.twokOption, { width: '15%' }]} onPress={() => setFonttype(0)}>
                                    <Text style={styles.twokOptionButton}>{'1'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.twokOption, { width: '15%' }]} onPress={() => setFonttype(1)}>
                                    <Text style={styles.twokOptionButton}>{'2'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.twokOption, { width: '15%' }]} onPress={() => setFonttype(2)}>
                                    <Text style={styles.twokOptionButton}>{'3'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                )
                break;
            case 2:
                console.log('bg-' + backgroundColor)
                console.log('t-' + textColor)
                return (
                    <View style={styles.textOptionScreen}>
                        <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={styles.label}>{'Background Color   #'}</Text>
                            </View>
                            <TextInput
                                style={styles.colorInputText}
                                onChangeText={(newBackgroundColor) => {
                                    if (checkIfColor(newBackgroundColor)) {
                                        setBackgroundColor(newBackgroundColor)
                                    } else {

                                    }

                                }}
                                defaultValue={backgroundColor}

                                placeholder={backgroundColor}
                                maxLength={6}
                                onBlur={() => console.log('blur')}
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={styles.label}>{'Text Color                    #'}</Text>
                            </View>
                            <TextInput
                                style={styles.colorInputText}
                                onChangeText={(newTextColor) => {
                                    if (checkIfColor(newTextColor)) {
                                        setTextColor(newTextColor)
                                    } else {

                                    }

                                }}
                                defaultValue={textColor}
                                placeholder={textColor}
                                maxLength={6}
                                onBlur={() => console.log('blur')}
                            />
                        </View>

                    </View>
                )
                break;
            case 3:
                return (
                    <View style={{ flex: 1, }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TouchableOpacity style={{ flex: 1, borderWidth: 2, borderColor: colors.coral }} onPress={() => {
                                setValign(0)
                                setHalign(0)
                            }}>

                                <View style={{ flex: 1, backgroundColor: colors.lightBlue }}>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, borderWidth: 2, borderColor: colors.coral }} onPress={() => {
                                setValign(0)
                                setHalign(1)
                            }}>

                                <View style={{ flex: 1, backgroundColor: colors.lightBlue }}>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, borderWidth: 2, borderColor: colors.coral }} onPress={() => {
                                setValign(0)
                                setHalign(2)
                            }}>

                                <View style={{ flex: 1, backgroundColor: colors.lightBlue }}>

                                </View>
                            </TouchableOpacity>

                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TouchableOpacity style={{ flex: 1, borderWidth: 2, borderColor: colors.coral }} onPress={() => {
                                setValign(1)
                                setHalign(0)
                            }}>

                                <View style={{ flex: 1, backgroundColor: colors.lightBlue }}>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, borderWidth: 2, borderColor: colors.coral }} onPress={() => {
                                setValign(1)
                                setHalign(1)
                            }}>

                                <View style={{ flex: 1, backgroundColor: colors.lightBlue }}>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, borderWidth: 2, borderColor: colors.coral }} onPress={() => {
                                setValign(1)
                                setHalign(2)
                            }}>

                                <View style={{ flex: 1, backgroundColor: colors.lightBlue }}>

                                </View>
                            </TouchableOpacity>

                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TouchableOpacity style={{ flex: 1, borderWidth: 2, borderColor: colors.coral }} onPress={() => {
                                setValign(2)
                                setHalign(0)
                            }}>

                                <View style={{ flex: 1, backgroundColor: colors.lightBlue }}>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, borderWidth: 2, borderColor: colors.coral }} onPress={() => {
                                setValign(2)
                                setHalign(1)
                            }}>

                                <View style={{ flex: 1, backgroundColor: colors.lightBlue }}>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, borderWidth: 2, borderColor: colors.coral }} onPress={() => {
                                setValign(2)
                                setHalign(2)
                            }}>

                                <View style={{ flex: 1, backgroundColor: colors.lightBlue }}>

                                </View>
                            </TouchableOpacity>

                        </View>

                    </View>
                )
                break;
            case 4:
                return (
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} onBlur={() => console.log('blur')}>
                        <View style={{ flex: 1 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems:'center' }}>
                                <View style={{flex:2}}>
                                    <Text style={styles.label}>{'Attach current position?'}</Text>
                                </View>
                                <View style={{flex:1, alignItems:'flex-end'}}>
                                    <Switch
                                        trackColor={{ false: colors.blue, true: colors.lightBlue }}
                                        thumbColor={isGps ? '#FFFFFF' : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                        onChange={handleSwitchGps}

                                        value={isGps}
                                    />
                                </View>

                            </View>

                            <View style={{ flex: 1,justifyContent:'center',alignItems:'center' }}>
                                <TouchableOpacity style={{height:'50%',width:'50%' ,backgroundColor:colors.lightBlue,justifyContent:'center',alignItems:'center', borderRadius:30, }}>

                                    <Text style={styles.label}>{'TWOK!'}</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                )

                break;

            default:
                break;
        }

    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} onBlur={() => console.log('blur')}>
            <View style={{ flex: 1 }}>
                <View>
                    <View style={styles.preview} onChangeText={(newText) => setText(newText)}>

                        <Text style={styles.textPreview}> {text}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: "space-evenly", }}>
                    <TouchableOpacity style={[styles.twokOption, { width: '25%' }]} onPress={() => setPage(1)}>
                        <Text style={styles.twokOptionButton}>{'Text Option'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.twokOption, { width: '15%' }]} onPress={() => setPage(2)}>
                        <Text style={styles.twokOptionButton}>{'Color'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.twokOption, { width: '25%' }]} onPress={() => setPage(3)}>
                        <Text style={styles.twokOptionButton}>{'Positioning'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.twokOption, { backgroundColor: colors.lightBlue, width: '15%' }]} onPress={() => setPage(4)}>
                        <Image style={{ width: 40, height: 40, tintColor: colors.blue }} source={post}></Image>
                    </TouchableOpacity>

                </View>
                <View style={styles.screen}>
                    {renderPage()}
                </View>

            </View >
        </TouchableWithoutFeedback>
    )

}

function checkIfColor(hex) {
    var regex = /[0-9A-Fa-f]{6}/g
    if (hex.match(regex)) {
        return true
    } else {
        return false
    }
}

function getAlign(align) {
    switch (align) {
        case 0:
            return 'flex-start'
            break;
        case 1:
            return 'center'
            break;
        case 2:
            return 'flex-end'
            break;
        default:
            return 'flext-start'

    }
}

function getTextAlign(halign) {
    switch (halign) {
        case 0:
            return 'left'
            break;
        case 1:
            return 'center'
            break;
        case 2:
            return 'right'
            break;
        default:
            return 'left'

    }
}