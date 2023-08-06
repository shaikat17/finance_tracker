import { useReducer, useState } from "react"
import { db } from "../firebase/config"
import { async } from "@firebase/util"

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
        case "ERROR":
            return {isPending: false, document: null, success: false, error: action.payload}
        default:
            return state
    }
}

export const useFireStore = (collection) => {
    const [response, dispatch] = useReducer(fireStoreReducer, initialState)

    const [isCanclled, setIsCancelled] = useState(false)

    // collection ref
    const ref = db.collection(collection)

    // add a document
    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            const addedDocument = await ref.add(doc)
            dispatch({ type: 'ADDED_DOCUMENT', payload: })
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.message })
        }
    }

    // delete a document
    const deleteDocument = async (id) => {

    }

    return { addDocument, deleteDocument, response }

}