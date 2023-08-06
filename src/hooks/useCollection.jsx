
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

export const useCollection = (collectionName, queryName) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        // let ref = collection(db, collectionName)
        const q = query(collection(db, collectionName), where(...queryName));
        const unsbscribe = onSnapshot(q, (snapshot) => {
            
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id})
              });

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