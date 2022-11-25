import { SafeAreaViewBase } from "react-native";
import CommunicationController from "../model/CommunicationController"
import KeyValueStorage from "../model/KeyValueStorage";
import StorageManager
 from "../model/StorageManager";
class Helper {
    communicationController = new CommunicationController()
    storageManager = new StorageManager()
 
    sid;
    constructor(sid) {
        this.sid = sid
    }

    async addTwok(twoksBuffer,uid) {
        //console.log(uid)
        if(uid){
    
            var result = await this.communicationController.getTwok(this.sid,uid)
        }else{
            var result = await this.communicationController.getTwok(this.sid)
        }
        
        twoksBuffer.addTwok(result)
        return twoksBuffer
    }

    async follow(uid) {
        await this.communicationController.follow(this.sid, uid)
        console.log(this.sid + " starts following " + uid)

    }

    async unfollow(uid) {
        await this.communicationController.unfollow(this.sid, uid)
        console.log(this.sid + "  unfollowed " + uid)
    }

    async isFollowed(uid) {
        var result = await this.communicationController.isFollowed(this.sid, uid)
        //console.log(result.followed)
        return result.followed
    }

    async getFollowed() {
        var result = await this.communicationController.getFollowed(this.sid)
        return result
    }

    //check se prima run -> registra e torna sid
    // se seconda run -> prende sid da async storage
    async getSid(){
        if(await KeyValueStorage.isFirstRun()){
            result = await this.communicationController.register()
            KeyValueStorage.setSid(result.sid)
            

        }
            return await KeyValueStorage.getSid()
        
    }

    checkAndRepairStorage(){
        this.storageManager.checkAndRepair()
    }

    //ritorna immagine di profilo associata a quel uid, e pversion
    //se la immagine salvata in locale è obsoleta o è assente, si occupa di risolvere
    async getPicture(uid,pVersion){
        console.log(this.sid)
        var result = await this.communicationController.getPicture(this.sid,uid)
        return result
    }

     isPresent(uid, pversion, onResult){
        
         this.storageManager.isPresent(uid, pversion,result=>onResult(result))

    }

    
    

    
}

export default Helper