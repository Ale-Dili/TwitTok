class Pics{
    state=[]     //codificati in {uid: ... , pic: ..., pVersion: ...}
    
    get State(){
        return state
    }

    //controllare pversion
    getPicFromUID(uid){
        this.state.forEach(item=>{
            if (item.uid==uid){
                return item.pic
            }
        })
        return undefined
    }

    getPicFromServer
}

export default Pics