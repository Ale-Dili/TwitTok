import CommunicationController from "../model/CommunicationController"
class Helper {
    communicationController = new CommunicationController()

    async addTwok(twoksBuffer,sid) {
        var result = await this.communicationController.getTwok(sid)
        twoksBuffer.addTwok(result)
        return twoksBuffer
    }
}

export default Helper