import { Text, View, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity, Image, SafeAreaView, ActivityIndicator, Button, Switch } from "react-native"
import { useContext, useEffect, useRef, useState } from "react"
import ContextUserInfo from "../ContextUserInfo"
import textColoring from '../assets/TwitTokImg/text-coloring.png'
import post from '../assets/TwitTokImg/post.png'
import colors from "../assets/colors"
import * as Location from 'expo-location';





export default function AddTwok(navigation) {
    console.log(navigation.navigation.navigate)


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

    async function postTwok() {
        //text, bgcol, fontcol, fontsize, fonttype, halign, valign, lat = null, lon = null
        //console.log(text, backgroundColor, textColor, fontSize, fonttype, halign, valign)
        //helper.addTwok(text, backgroundColor, textColor, fontSize, fonttype, halign, valign)
        let lat=null
        let lon = null
        if (isGps) {
            let canUseLocation = false;
            const grantedPermission = await Location.getForegroundPermissionsAsync()
            if (grantedPermission.status === "granted") {
                canUseLocation = true;
            } else {
                const permissionResponse = await Location.requestForegroundPermissionsAsync()
                if (permissionResponse.status === "granted") {
                    canUseLocation = true;
                }
            }
            if (canUseLocation) {
                const location = await Location.getCurrentPositionAsync()
                console.log('lat: ' + location.coords.latitude + '-lon: ' + location.coords.longitude);
                lat = location.coords.latitude
                lon = location.coords.longitude
            }
        }
        helper.addTwok(text, backgroundColor, textColor, fontSize, fonttype, halign, valign,lat,lon)
        navigation.navigation.navigate('Feed')

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
                                <TouchableOpacity style={[styles.twokOption, { width: '15%',backgroundColor:((fontSize==0)?colors.blue:colors.coral) }]} onPress={() => setFontSize(0)}>
                                    <Text style={[styles.twokOptionButton,{color:((fontSize==0)?colors.coral:colors.blue)}]}>{'1'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.twokOption, { width: '15%' ,backgroundColor:((fontSize==1)?colors.blue:colors.coral)}]} onPress={() => setFontSize(1)}>
                                    <Text style={[styles.twokOptionButton,{color:((fontSize==1)?colors.coral:colors.blue)}]}>{'2'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.twokOption, { width: '15%',backgroundColor:((fontSize==2)?colors.blue:colors.coral) }]} onPress={() => setFontSize(2)}>
                                    <Text style={[styles.twokOptionButton,{color:((fontSize==2)?colors.coral:colors.blue)}]}>{'3'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                            <View style={{ flex: 1, }}>
                                <Text style={styles.label}>{'Font'}</Text>
                            </View>
                            <View style={{ flex: 6, height: '60%', justifyContent: "space-evenly", flexDirection: 'row' }}>
                                <TouchableOpacity style={[styles.twokOption, { width: '15%',backgroundColor:((fonttype==0)?colors.blue:colors.coral) }]} onPress={() => setFonttype(0)}>
                                    <Text style={[styles.twokOptionButton,{color:((fonttype==0)?colors.coral:colors.blue)}]}>{'1'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.twokOption, { width: '15%',backgroundColor:((fonttype==1)?colors.blue:colors.coral) }]} onPress={() => setFonttype(1)}>
                                    <Text style={[styles.twokOptionButton,{color:((fonttype==1)?colors.coral:colors.blue)}]}>{'2'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.twokOption, { width: '15%',backgroundColor:((fonttype==2)?colors.blue:colors.coral) }]} onPress={() => setFonttype(2)}>
                                    <Text style={[styles.twokOptionButton,{color:((fonttype==2)?colors.coral:colors.blue)}]}>{'3'}</Text>
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
                            <TouchableOpacity style={{ flex: 1, borderWidth: 2, borderColor: colors.coral}} onPress={() => {
                                setValign(0)
                                setHalign(0)
                            }}>

                                <View style={{ flex: 1, backgroundColor: (((valign==0)&&(halign==0))?colors.blue:colors.lightBlue) }}>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, borderWidth: 2, borderColor: colors.coral }} onPress={() => {
                                setValign(0)
                                setHalign(1)
                            }}>

                                <View style={{ flex: 1, backgroundColor: (((valign==0)&&(halign==1))?colors.blue:colors.lightBlue) }}>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, borderWidth: 2, borderColor: colors.coral }} onPress={() => {
                                setValign(0)
                                setHalign(2)
                            }}>

                                <View style={{ flex: 1, backgroundColor: (((valign==0)&&(halign==2))?colors.blue:colors.lightBlue) }}>

                                </View>
                            </TouchableOpacity>

                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TouchableOpacity style={{ flex: 1, borderWidth: 2, borderColor: colors.coral }} onPress={() => {
                                setValign(1)
                                setHalign(0)
                            }}>

                                <View style={{ flex: 1, backgroundColor: (((valign==1)&&(halign==0))?colors.blue:colors.lightBlue)}}>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, borderWidth: 2, borderColor: colors.coral }} onPress={() => {
                                setValign(1)
                                setHalign(1)
                            }}>

                                <View style={{ flex: 1, backgroundColor: (((valign==1)&&(halign==1))?colors.blue:colors.lightBlue) }}>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, borderWidth: 2, borderColor: colors.coral }} onPress={() => {
                                setValign(1)
                                setHalign(2)
                            }}>

                                <View style={{ flex: 1, backgroundColor:(((valign==1)&&(halign==2))?colors.blue:colors.lightBlue) }}>

                                </View>
                            </TouchableOpacity>

                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TouchableOpacity style={{ flex: 1, borderWidth: 2, borderColor: colors.coral }} onPress={() => {
                                setValign(2)
                                setHalign(0)
                            }}>

                                <View style={{ flex: 1, backgroundColor: (((valign==2)&&(halign==0))?colors.blue:colors.lightBlue) }}>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, borderWidth: 2, borderColor: colors.coral }} onPress={() => {
                                setValign(2)
                                setHalign(1)
                            }}>

                                <View style={{ flex: 1, backgroundColor: (((valign==2)&&(halign==1))?colors.blue:colors.lightBlue) }}>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, borderWidth: 2, borderColor: colors.coral }} onPress={() => {
                                setValign(2)
                                setHalign(2)
                            }}>

                                <View style={{ flex: 1, backgroundColor: (((valign==2)&&(halign==2))?colors.blue:colors.lightBlue) }}>

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

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ flex: 2 }}>
                                    <Text style={styles.label}>{'Attach current position?'}</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Switch
                                        trackColor={{ false: colors.blue, true: colors.lightBlue }}
                                        thumbColor={isGps ? '#FFFFFF' : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                        onChange={handleSwitchGps}

                                        value={isGps}
                                    />
                                </View>

                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={{ height: '50%', width: '50%', backgroundColor: colors.lightBlue, justifyContent: 'center', alignItems: 'center', borderRadius: 30, }}
                                    onPress={() => { postTwok() }}>
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
                    <TouchableOpacity style={[styles.twokOption, { width: '25%' , backgroundColor:((page==1)?colors.blue:colors.coral)}]} onPress={() => setPage(1)}>
                        <Text style={[styles.twokOptionButton,{color:((page==1)?colors.coral:colors.blue)}]}>{'Text Option'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.twokOption, { width: '15%', backgroundColor:((page==2)?colors.blue:colors.coral) }]} onPress={() => setPage(2)}>
                        <Text style={[styles.twokOptionButton,{color:((page==2)?colors.coral:colors.blue)}]}>{'Color'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.twokOption, { width: '25%',backgroundColor:((page==3)?colors.blue:colors.coral) }]} onPress={() => setPage(3)}>
                        <Text style={[styles.twokOptionButton,{color:((page==3)?colors.coral:colors.blue)}]}>{'Positioning'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.twokOption, { backgroundColor:((page==4)?colors.blue:colors.lightBlue), width: '15%' }]} onPress={() => setPage(4)}>
                        <Image style={{ width: 40, height: 40, tintColor:((page==4)?colors.lightBlue:colors.blue) }} source={post}></Image>
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