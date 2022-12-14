class CommunicationController {
    async generalRequest(param, endpoint) {
        //console.log (endpoint + ' '+ param)
       // console.log(param, endpoint)
        var request = await fetch("https://develop.ewlab.di.unimi.it/mc/twittok/" + endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: param
        })
        switch (request.status) {
            case 200:
                //console.log(endpoint+" Successful")
                break;
            case 400:
                console.error(endpoint + " Bad parameters")
                console.error(param)
                break;
            case 401:
                console.error(endpoint + " Invalid sid")
                break;
            case 413:
                console.error(endpoint + " Request Entity Too Large")
                break;
            default:
                console.error(endpoint + " dunno what to do :(")
                return
                break;
        }
        //console.log(request)
        request = await request.json()

        return request

    }



    //uid è opzionale
    getTwok = async (sid, uid = null, tid = null) => {
        var param = JSON.stringify({ sid: sid, uid: uid, tid: tid })

        var endpoint = "getTwok"
        var result = await this.generalRequest(param, endpoint)
        return result
    }

    async follow(sid, uid) {
        var param = JSON.stringify({ sid: sid, uid: uid })
        var endpoint = "follow"
        this.generalRequest(param, endpoint)
    }

    async unfollow(sid, uid) {
        var param = JSON.stringify({ sid: sid, uid: uid })
        var endpoint = "unfollow"
        this.generalRequest(param, endpoint)
    }

    async isFollowed(sid, uid) {
        var param = JSON.stringify({ sid: sid, uid: uid })
        var endpoint = "isFollowed"
        return await this.generalRequest(param, endpoint)
    }
    async getFollowed(sid) {
        var param = JSON.stringify({ sid: sid })
        var endpoint = "getFollowed"
        return await this.generalRequest(param, endpoint)
    }

    async register() {
        var param = JSON.stringify({})
        var endpoint = "register"
        return await this.generalRequest(param, endpoint)
    }

    async getPicture(sid, uid) {
        
        var param = JSON.stringify({ sid: sid, uid: uid })
        var endpoint = "getPicture"

        return await this.generalRequest(param, endpoint)
    }

    async getProfile(sid) {
        var param =  JSON.stringify({ sid: sid })
        var endpoint = "getProfile"
        return await this.generalRequest(param, endpoint)
    }

    async setProfile(sid, name, pic) {
        var param = JSON.stringify({ sid: sid, name: name, picture: pic })
        var endpoint = "setProfile"
        return await this.generalRequest(param, endpoint)
    }

    async addTwok(sid, text, bgcol, fontcol, fontsize, fonttype, halign, valign, lat = null, lon = null) {
        var param = JSON.stringify({ sid: sid, text: text, bgcol: bgcol, fontcol: fontcol, fontsize: fontsize, fonttype: fonttype, halign: halign, valign: valign, lat: lat, lon: lon })
        var endpoint = "addTwok"
        return await this.generalRequest(param, endpoint)

    }
}
export default CommunicationController