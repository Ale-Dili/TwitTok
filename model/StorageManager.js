import * as SQLite from 'expo-sqlite';

export default class StorageManager {
    constructor() {
        this.db = SQLite.openDatabase("myDB")
    }

    checkAndRepair() {
        const query = "CREATE TABLE IF NOT EXISTS UserPic (uid TEXT PRIMARY key, pversion TEXT NOT NULL, pic TEXT NOT NULL)";
        this.db.transaction(tx => {
            tx.executeSql(query, [],
                (tx, result) => { },
                (tx, error) => { console.error(error) });
        });
    }

    //result.rows._array[0].pic

    //I PARAMETRI NON VANNO
    // async getPicture(uid, pversion) {
    //     this.db.transaction(tx => {
    //         tx.executeSql('SELECT * FROM UserPic where uid=' + uid + ' and pversion =' + pversion, [],
    //             (tx, result) => {
    //                 if (result.rows.length > 0) {
    //                     // console.log(result.rows._array[0].pic)
    //                     //return  onResult(result.rows._array[0].pic).then((result)=>{return result})
    //                     onResult(result.rows._array[0].pic)

    //                 } else {
    //                     return undefined
    //                 }
    //             },
    //             (tx, error) => { console.error(error) });
    //     });

    //     let onResult = async function (result) {
    //         return new Promise((accept) => accept)
    //     }
    // }

    getPictureIfPresent = async (uid, pversion) => {
        return new Promise((resolve, reject) => {

            this.db.transaction(tx => {
                tx.executeSql('SELECT * FROM UserPic where uid=' + uid + ' and pversion =' + pversion, [],
                    (tx, result) => {
                        let pic
                       // console.log(result)
                        if (result.rows.length > 0) {
                            // console.log(result.rows._array[0].pic)
                            //return  onResult(result.rows._array[0].pic).then((result)=>{return result})
                            pic = result.rows._array[0].pic

                        } else {
                            pic = undefined
                        }

                        resolve(pic);

                    },
                    (tx,error)=>{
                        reject(error)
                    });
            });
        });

    }



}