import AsyncStorage from '@react-native-async-storage/async-storage';

export default class KeyValueStorage {
    //se prima run torna true
    //se second 
    static async  isFirstRun() {
        sid = await AsyncStorage.getItem('sid')
        if(sid){
            return false
        }else{
            return true
        }
    }

    static async getSid(){
        return await AsyncStorage.getItem('sid')
    }

    static async setSid(sid){
        await AsyncStorage.setItem('sid',sid)
    }

}