import { useReducer, useState } from "react"
import { db } from "../firebase/config"

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const fireStoreReducer = (state, action) => {
    switch(action.type) {

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
    const addDocument = (doc) => {
        
    }

    // delete a document
    const deleteDocument = (id) => {

    }

    return { addDocument, deleteDocument, response }

}