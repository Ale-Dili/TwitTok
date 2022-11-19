class CommunicationController {
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



    async generalRequest(param, endpoint) {
        var request = await fetch("https://develop.ewlab.di.unimi.it/mc/twittok/" + endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: param
        })
        //console.log(request)
        request = await request.json()

        return request

    }
}
export default CommunicationController