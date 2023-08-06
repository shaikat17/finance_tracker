import { useReducer, useState } from "react"
import { db } from "../firebase/config"
import { async } from "@firebase/util"
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore"

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const fireStoreReducer = (state, action) => {
    switch(action.type) {
        case 'IS_PENDING':
            return {isPending: true, document: null, success: false, error: null}
        case "ADDED_DOCUMENT":
            return {isPending: false, document: action.payload, success: true, error: null}
        case "DELETED_DOCUMENT":
            return {isPending: false, document: action.payload, success: true, error: null}
        case "ERROR":
            return {isPending: false, document: null, success: false, error: action.payload}
        default:
            return state
    }
}

export const useFireStore = (collectionName) => {
    const [response, dispatch] = useReducer(fireStoreReducer, initialState)

    const [isCanclled, setIsCancelled] = useState(false)

    // collection ref
    const ref = doc(collection(db, collectionName))

    // add a document
    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            const addedDocument = await setDoc(ref, doc)
            dispatch({ type: 'ADDED_DOCUMENT', payload: addedDocument })
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.message })
            console.log(error)
        }
    }

    // delete a document
    const deleteDocument = async (id) => {
        dispatch({ type: "IS_PENDING"})
        try {
            const deletedDocument = await deleteDoc(doc(db, collectionName, id))
            dispatch({ type: "DELETED_DOCUMENT", payload: deletedDocument })
        } catch (error) {
            dispatch({ type: "ERROR", payload: error.message })
            console.log(error)
        }
    }

    return { addDocument, deleteDocument, response }

}