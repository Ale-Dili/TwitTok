import CommunicationController from "../model/CommunicationController"
class Helper {
    communicationController = new CommunicationController()
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
        //console.log(result)
        return result
    }
}

export default Helper