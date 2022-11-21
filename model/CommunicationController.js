class CommunicationController {
    async generalRequest(param, endpoint) {
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
                console.error(endpoint+" Bad parameters")
                console.error(param)
                break;
            case 401:
                console.error(endpoint+" Invalid sid")
                break;
            case 413:
                console.error(endpoint+" Request Entity Too Large")
                break;
            default:
                console.error(endpoint+" dunno what to do :(")
                return
                break;
        }
        //console.log(request)
        request = await request.json()

        return request

    }


    //tid è opzionale
    getTwok = async (sid, tid) => {
        var param
        if (tid) {
            param = JSON.stringify({ sid: sid, tid: tid })
        } else {
            param = JSON.stringify({ sid: sid })
        }
        var endpoint = "getTwok"
        var result = await this.generalRequest(param, endpoint)
        return result
    }

    getPic = async(sid, uid)=> {
        var param = JSON.stringify({ sid: sid, uid: uid })
        var endpoint = "getPicture"
        var result = await this.generalRequest(param, endpoint)
        //console.log(result)
        return result.picture
    }


    async follow(sid, uid){
        var param = JSON.stringify({ sid: sid, uid: uid })
        var endpoint = "follow"
        this.generalRequest(param, endpoint)
    }

    async unfollow(sid, uid){
        var param = JSON.stringify({ sid: sid, uid: uid })
        var endpoint = "unfollow"
        this.generalRequest(param, endpoint)
    }

    async isFollowed(sid,uid){
        var param = JSON.stringify({ sid: sid, uid: uid })
        var endpoint = "isFollowed"
        return await this.generalRequest(param, endpoint) 
    }
    async getFollowed(sid){
        var param = JSON.stringify({ sid: sid})
        var endpoint = "getFollowed"
        return await this.generalRequest(param, endpoint) 
    }
}
export default CommunicationController