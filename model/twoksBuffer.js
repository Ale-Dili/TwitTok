class TwoksBuffer{
    // twoks=[{"bgcol": "FFFFFF", "fontcol": "000000", "fontsize": 2, "fonttype": 2, "halign": 2, "lat": null, "lon": null, name:"12345678901234567890", "pversion": 0, 
    // "text": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m",
    //  "tid": 18, "uid": 10302, "valign": 2}]
    twoks=[]

    get Twoks(){
        return twok
    }

    addTwok = (twok)=>{
        
        this.twoks.push(twok)
    }
}
export default TwoksBuffer