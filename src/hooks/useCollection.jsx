
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

export const useCollection = (collectionName) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        let ref = collection(db, collectionName)

        const unsbscribe = onSnapshot(ref, (snapshot) => {
            
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id})
              });

              console.log(results)
            // update state
            setDocuments(results)
            setError(null)
        }, (error) => {
            console.log(error)
        })

        // unsubscribe
        return () => unsbscribe()
    }, [collectionName])

    return { documents, error}

}