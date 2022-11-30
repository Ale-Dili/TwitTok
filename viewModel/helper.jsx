import { SafeAreaViewBase } from "react-native";
import CommunicationController from "../model/CommunicationController"
import KeyValueStorage from "../model/KeyValueStorage";
import StorageManager from "../model/StorageManager";

class Helper {
    communicationController = new CommunicationController()
    storageManager = new StorageManager()

    sid;
    constructor(sid) {
        this.sid = sid
    }

    async addTwok(twoksBuffer, uid) {
        //console.log(uid)
        if (uid) {

            var result = await this.communicationController.getTwok(this.sid, uid)
        } else {
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
    async getSid() {
        if (await KeyValueStorage.isFirstRun()) {
            result = await this.communicationController.register()
            KeyValueStorage.setSid(result.sid)

        }
        return await KeyValueStorage.getSid()

    }

    checkAndRepairStorage() {
        this.storageManager.checkAndRepair()
    }

    //ritorna immagine di profilo associata a quel uid, e pversion
    //se la immagine salvata in locale è obsoleta o è assente, si occupa di risolvere


    async getPicture(uid, pversion) {
        
        //console.log('uid: '+uid+' '+pversion)
        try {
            let pic = await this.storageManager.getPictureIfPresent(uid, pversion)
            if (pic) {
                return pic
            } else {
                let result = await this.communicationController.getPicture(this.sid, uid)
                pic = result.picture
                //se utente non ha foto profilo
                if (pic) {
                    //controllo se encoding è corretto
                    var base64regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;

                    if (base64regex.test(pic)) {
                        pic = 'data:image/png;base64,' + pic

                         this.storageManager.addProfilePicture(uid,pversion,pic)

                        return pic

                    } else {
                        console.log('bad b64 img encoding, using default')
                        return undefined
                    }
                } else {
                    return undefined
                }

            }
        } catch (error) {
            console.log(error)
            return undefined
        }
    }


    async getProfile() {
        return await this.communicationController.getProfile(this.sid)
    }

    async setProfile(name=null, picture=null){
        await this.communicationController.setProfile(this.sid, name, picture)
        console.log('Info user changed')
    }


}

export default Helper