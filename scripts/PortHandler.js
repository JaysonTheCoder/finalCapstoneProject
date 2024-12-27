import { collection, onSnapshot, doc, getDoc } from "firebase/firestore"
class PortHandler {
    constructor(database) {
        this.database = database
    }
    getPort(portname) {
        try {
            const collectionID = []
            const get = async function() {
                const collectionRef = await collection(this.database, 'ports')
                const data = await onSnapshot(collectionRef, (document) => {
                    return docs = document.docs.map( index => {
                        collectionID.push(index.id)
                        return index.data()
                    })
                })

                for(var i = 0; i < collectionID.length; i++) {
                    if(collectionID[i] === portname) {
                        const docRef = doc(this.database, 'ports', collectionID[i])
                        const DOCdata = (await getDoc(docRef)).data()
                        return DOCdata
                    }
                }

            }
            return get()
        } catch(err) {
            throw err
        }
    }
}
const portHandler = new PortHandler()
export { portHandler }