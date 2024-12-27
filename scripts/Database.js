const Database = function() {
    this.isEmpty = function() {
      return (collection.length === 0)
    }
    this.getDocumentsID = async function(collectionName) {
      if(db) {
        const colRef = collection(db, collectionName)
        const data = await onSnapshot(colRef, (docs) => {
          const id = docs.docs.map( data => {
            return { id: data.id }
          })
          return id
        })
        return data
      }
    }
    this.collectionRef = function(collectionPath) {
      return collection(db, collectionPath)
    }
    this.documentRef = function(collectionPath) {
      return doc(db, collectionPath)
    }
    this.getCollection = async function(collectionPath) {
      const _db = new Database()
      const collectionRef = _db.collectionRef(collectionPath)
      const data = onSnapshot(collectionRef, (snapData) => {
        return snapData.docs.map( data => (
          {
            data: data.data()
          }
        ))
      })
      return data
    }
    this.getDocument = async function(collectionPath) {
      const _db = new Database()
      const documentRef = await _db.documentRef(collectionPath)
      if(db) {
        const doc = await getDoc(documentRef)
        const response = doc.data()
        console.log("response: ", response);
        return response
      }
    }
  }